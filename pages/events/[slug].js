import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "config/";
import styles from "@/styles/Event.module.css";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventPaged({ evt }) {
    const { attributes: attr } = evt;


    return (
        <Layout>
            <div className={styles.event}>
                <ToastContainer />
                <span>
                    {new Date(attr.date).toDateString()} at {attr.time}
                </span>
                <h1>{attr.name}</h1>
                <div className={styles.image}>
                    <Image
                        src={
                            attr.image.data
                                ? attr.image.data.attributes.formats.large.url
                                : "/images/event-default.png"
                        }
                        width={960}
                        height={600}
                    />
                </div>
                <h3>Performers:</h3>
                <p>{attr.performers}</p>
                <h3>Description:</h3>
                <div>{attr.description}</div>
                <h3>Venue: {attr.venue}</h3>
                <p>{attr.address}</p>
                <Link href="/events">
                    <a className={styles.back}>{"<"} Go Back</a>
                </Link>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(`${API_URL}/api/events/?slug=${slug}&populate=*`);
    const events = await res.json();
    return {
        props: {
            evt: events.data.filter((e) => e.attributes.slug === slug)[0],
        },
    };
}
