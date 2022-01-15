/* eslint-disable import/no-anonymous-default-export */
// Get by parameters

import { dbConnect } from "utils/bdconnection";
import Task from "models/Task";

dbConnect();
export default async (req, res) => {
    const {
        method,
        body,
        query: { id },
    } = req;

    switch (method) {
        case "GET":
            try {
                const task = await Task.findById(id);
                if (!task) return res.status(404).json({ msg: "Task not found" });

                return res.status(200).json(task);
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }

        case "PUT":
            try {
                const task = await Task.findByIdAndUpdate(id, body, { new: true });
                if (!task) return res.status(404).json({ msg: "Task not found" });

                return res.status(200).json({ msg: "task updated", deleted: task });
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }

        case "DELETE":
            try {
                const deletedTask = await Task.findByIdAndDelete(id);
                if (!deletedTask) return res.status(404).json({ msg: "Task not found" });

                return res.status(200).json({ msg: "task deleted", deleted: deletedTask });
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }

        default:
            return res.status(400).json({ mgs: "this method is not supported" });
    }
};
