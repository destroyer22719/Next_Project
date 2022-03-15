import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/Layout";
import { API_URL } from "config";
import EventItem from "@/components/EventItem";
import qs from "qs";
import { useRouter } from "next/router";

export default function SearchPage({ events }) {
    const router = useRouter();

    return (
        <Layout title="Search Results">
            <h1>Search Results for {router.query.term}</h1>
            <Link href="/events"><a>{"<"} Go Back</a></Link>
            {events.map((event) => (
                <EventItem key={event.id} event={event} />
            ))}
        </Layout>
    );
}

export async function getServerSideProps({ query: { term } }) {
    const query = qs.stringify({
        _where: {
            _or: [
                { name_contains: term },
                { performers_contains: term },
                { description_contains: term },
                ,
                { venue_contains: term },
            ],
        },
    });
    const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
    const events = await res.json();

    return {
        props: { events: events.data },
    };
}
