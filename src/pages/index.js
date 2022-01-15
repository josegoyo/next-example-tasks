import { Button, Card, Container, Grid, Icon } from "semantic-ui-react";

export default function HomePage({ tasks }) {
    console.log(tasks);

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
        <Container>
            <Card.Group itemsPerRow={4}>
                {tasks.map((task) => (
                    <Card key={task._id}>
                        <Card.Content>
                            <Card.Header>Matthew</Card.Header>
                            <Card.Meta>
                                <span className="date">Joined in 2015</span>
                            </Card.Meta>
                            <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button color="blue">View</Button>
                            <Button color="green">Edit</Button>
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
