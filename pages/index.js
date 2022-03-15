import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "config";
import EventItem from "@/components/EventItem";

export default function Home({ events }) {
    return (
        <Layout>
            <h1>Home</h1>
            <Link href="/about">About</Link>
            {events.map((event) => (
                <EventItem key={event.id} event={event} />
            ))}

            {events.length > 0 && (
                <Link href={"/events"}>
                    <a className="btn-secondary">View All Events</a>
                </Link>
            )}
        </Layout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=*`);
    const { data: events } = await res.json();
    return {
        props: { events: events || [] },
    };
}
