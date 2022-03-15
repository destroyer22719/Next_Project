import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Form.module.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "config";
import { parseCookies } from "@/util/index";

export default function AddEventsPage({token}) {
    const [values, setValues] = useState({
        name: "",
        performers: "",
        venue: "",
        address: "",
        date: "",
        time: "",
        description: "",
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasEmptyFields = Object.values(values).some((x) => x === "");

        if (hasEmptyFields) {
            toast.error("Please fill in all fields", {
                hideProgressBar: true,
            });
            return;
        }

        const res = await fetch(`${API_URL}/api/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ data: values }),
        });

        if (!res.ok) {
            if (res.status === 403 || !token) toast.error("User unauthorized");
            else toast.error("Something went wrong");
        } else {
            const data = await res.json();
            router.push(`/events/${data.data.attributes.slug}`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <Layout>
            <Link href="/events">
                <a>{"<"} Go Back</a>
            </Link>
            <h1>Add Events</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="performers">Performers</label>
                        <input
                            type="text"
                            id="performers"
                            name="performers"
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="venue">Venue</label>
                        <input
                            type="text"
                            id="venue"
                            name="venue"
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={values.date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="text">Time</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <input type="submit" className="btn" value="Add Event" />
            </form>
        </Layout>
    );
}

export async function getServerSideProps({ req }) {
    const {token} = parseCookies(req);
    console.log(token);
    return {
        props: {
            token,
        },
    };
}
