import { Menu, Container, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter();
    return (
        <Menu attached>
            <Container>
                <Menu.Item>
                    <Link href="/">
                        <img src="/vercel.svg" alt="logo" />
                    </Link>
                </Menu.Item>
                <Menu.Menu>
                    <Menu.Item>
                        <Button
                            primary
                            size="mino"
                            onClick={() => {
                                router.push("/tasks/new");
                            }}>
                            New Tasks
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    );
}
