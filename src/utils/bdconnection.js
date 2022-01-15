import { connect, connection } from "mongoose";

const conn = {
    isConnected: false,
};

export async function dbConnect() {
    if (conn.isConnected) return;

    const db = await connect(process.env.DB_URL);
    conn.isConnected = db.connections[0].readyState;

    console.log(`DB connected is ${db.connection.db.databaseName}`);
}

connection.on("connected", () => {
    console.log("mongo is connected");
});

connection.on("error", (error) => {
    console.log(`Errror ${error}`);
});
