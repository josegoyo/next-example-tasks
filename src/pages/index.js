import { Button, Card, Container, Grid, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function HomePage({ tasks }) {
    const router = useRouter();

    if (tasks.length === 0)
        return (
            <Grid centered verticalAlign="middle" columns={1} style={{ height: "80vh" }}>
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <h1>No hay tareas</h1>
                        <img
                            src="https://simg.nicepng.com/png/small/16-164399_empty-calendar-png-10-calendar-icon.png"
                            alt="empty file"
                        />
                        <div>
                            <Button primary>Create Task</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );

    return (
        <Container style={{ padding: "20px" }}>
            <Card.Group itemsPerRow={4}>
                {tasks.map((task) => (
                    <Card key={task._id}>
                        <Card.Content>
                            <Card.Header>{task.title}</Card.Header>
                            <Card.Meta>
                                <span className="date">Innversa solutions</span>
                            </Card.Meta>
                            <Card.Description>{task.description}.</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button color="blue" onClick={() => router.push(`tasks/${task._id}`)}>
                                View
                            </Button>
                            <Button color="green" onClick={() => router.push(`tasks/${task._id}/edit`)}>
                                Edit
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Container>
    );
}

export async function getServerSideProps(context) {
    const res = await fetch("http://localhost:3000/api/tasks");
    const tasks = await res.json();

    return {
        props: { tasks }, // will be passed to the page component as props
    };
}
