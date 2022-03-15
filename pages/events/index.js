import Layout from "@/components/Layout";
import { API_URL } from "config";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

const PER_PAGE = 2;

export default function EventsPage({ events, page, total }) {
    const lastPage = Math.ceil(total / PER_PAGE);

    return (
        <Layout>
            <h1>Home</h1>
            {events.map((event) => (
                <EventItem key={event.id} event={event} />
            ))}

            <Pagination page={page} total={total} PER_PAGE={PER_PAGE}/>
        </Layout>
    );
}

export async function getServerSideProps({ query: { page = 1 } }) {
    const start = +page === 1 ? 0 : (+page - 1) & PER_PAGE;

    const totalRes = await fetch(`${API_URL}/api/events/`);
    const total = await totalRes.json();

    //fetch events
    const evtRes = await fetch(
        `${API_URL}/api/events?&populate=*&_sort=date:ASC&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
    );
    const events = await evtRes.json();

    return {
        props: { events: events.data, page: +page, total: total.data.length },
    };
}
