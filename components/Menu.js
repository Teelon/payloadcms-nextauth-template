// app/components/Menu.js
import { Navbar, Nav, Button } from "react-bootstrap";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Menu() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const redirectToSignIn = () => {
        router.push("/auth/signin");
    };

    const redirectToSignOut = () => {
        signOut();
        router.push("/auth/signin");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-5">
            <Navbar.Brand href="/">Next Auth With Payload</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className=" justify-content-end ">

                <Nav >
                    {session ? (
                        <Button onClick={redirectToSignOut}>Log Out</Button>
                    ) : (
                        <Button onClick={redirectToSignIn}>Log In</Button>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Menu;
