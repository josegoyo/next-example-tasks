import { Form, Grid, Button } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function TaskFormPage() {
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
    });
    const [errors, setErrors] = useState({
        title: "",
        description: "",
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let _errors = validate();

        if (Object.keys(_errors).length) {
            setErrors(_errors);
        } else {
            await createTask();
            await router.push("/");
        }
    };

    const createTask = async () => {
        try {
            fetch("http://localhost:3000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });
        } catch (error) {
            console.log("Error al guardar", error);
        }
    };

    const validate = () => {
        let errors = {};

        if (!newTask.title) errors.title = "Title is required";
        if (!newTask.description) errors.description = "Description is required";

        return errors;
    };

    const handleChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Grid centered verticalAlign="middle" columns="3" style={{ height: "80vh" }}>
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>Create task</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            label="Title"
                            placehoder="Title"
                            name="title"
                            onChange={handleChange}
                            error={errors.title ? { content: errors.title, pointing: "below" } : null}
                        />
                        <Form.TextArea
                            label="Description"
                            placehoder="Description"
                            name="description"
                            onChange={handleChange}
                            error={
                                errors.description ? { content: errors.description, pointing: "below" } : null
                            }
                        />

                        <Button primary>Save</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
