// app/_app.js

import { SessionProvider } from "next-auth/react"
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from "../components/Menu";


function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Menu />
            <Component {...pageProps} />
        </SessionProvider >
    );
}

export default MyApp;
