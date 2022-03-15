import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@/styles/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";
import Showcase from "./Showcase";

export default function Layout({ title, keywords, desc, children }) {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
                <meta name="keywords" content={keywords} />
            </Head>
            {router.pathname === "/" && <Showcase/>}
            <Header />
            <div className={styles.container}>{children}</div>
            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    title: "DJ Events | Find the hottest parties",
    desc: "Find the latest DJ and other musical events",
    keywords: "music, dj, edm, events",
};
