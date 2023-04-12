// app/index.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

function HomePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const redirectToSignIn = () => {
        router.push("/auth/signin");
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return (
            <div>
                <br />
                <div>Please sign in.</div>

            </div>
        );
    }

    return (
        <Container>
            <h1>Welcome to the next auth with Payload</h1>
            <p>
                WIth this app you can just add your payload url to the env file and you're golden.
            </p>
            {/* Add more content, components, and layout for your cricket report site */}
        </Container>
    );
}

export default HomePage;
