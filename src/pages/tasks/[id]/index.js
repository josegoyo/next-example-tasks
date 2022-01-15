import Error from "next/error";
import { useRouter } from "next/router";
import { useState } from "react";
import { Grid, Button } from "semantic-ui-react";

export default function TaskDetails({ task, error }) {
    const { query, push } = useRouter();

    const [isDeleting, setIsDeleting] = useState(false);

    if (error && error.statusCode) {
        return <Error statusCode={error.statusCode} title={error.statusText} />;
    }

    const handleDelete = async () => {
        const { id } = query;
        setIsDeleting(true);
        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`, { method: "DELETE" });
            push("/");
        } catch (error) {
            console.log("error al eliminar", error);
        }
    };

    return (
        <Grid centered verticalAlign="middle" columns="1" style={{ height: "80vh" }}>
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                </Grid.Column>
                <div>
                    <Button color="red" onClick={handleDelete} loading={isDeleting}>
                        Delete
                    </Button>
                </div>
            </Grid.Row>
        </Grid>
    );
}

export async function getServerSideProps({ query: { id } }) {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

    if (res.status === 200) {
        const task = await res.json();
        return {
            props: { task },
        };
    }

    return {
        props: {
            error: {
                statusCode: res.status,
                statusText: "Invalid id",
            },
        },
    };
}
