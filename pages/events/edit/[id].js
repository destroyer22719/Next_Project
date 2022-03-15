import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Form.module.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "config";
import moment from "moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Modal from "@/components/Modal";
import { ImageUpload } from "@/components/ImageUpload";
import { parseCookies } from "@/util/index";

export default function EditEventsPage({ evt, token }) {
    const { attributes: attr } = evt.data;

    const [values, setValues] = useState({
        name: attr.name,
        performers: attr.performers,
        venue: attr.venue,
        address: attr.address,
        date: attr.date,
        time: attr.time,
        description: attr.description,
    });

    const [image, setImage] = useState(
        attr.image.data ? attr.image.data.attributes.formats.large.url : null
    );

    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasEmptyFields = Object.values(values).some((x) => x === "");

        if (hasEmptyFields) {
            toast.error("Please fill in all fields", {
                hideProgressBar: true,
            });
        }

        const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ data: values }),
        });

        if (!res.ok) {
            toast.error("Something went wrong");
        } else {
            const data = await res.json();
            router.push(`/events/${data.data.attributes.slug}`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const imageUploaded = async () => {
        const res = await fetch(
            `${API_URL}/api/events/${evt.data.id}?populate=*`
        );
        const data = await res.json();
        console.log(data);
        // setImage(data.data.attributes.image.data.attributes.formats.large.url);
        setShowModal(false);
    };

    return (
        <Layout>
            <Link href="/events">
                <a>{"<"} Go Back</a>
            </Link>
            <ToastContainer />
            <h1>Edit Events</h1>
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
                            value={moment(values.date).format("yyyy-MM-DD")}
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
                <input type="submit" className="btn" value="Update Event" />
            </form>
            <h2>Event Image</h2>
            {image ? (
                <Image src={image} height={100} width={170} />
            ) : (
                <div>
                    <p>No Image Uploaded</p>
                </div>
            )}
            <div>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn-secondary"
                >
                    <FaImage /> Set Image
                </button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} token={token}/>
            </Modal>
        </Layout>
    );
}

export async function getServerSideProps({ params: { id }, req }) {
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
    const evt = await res.json();
    const {token} = parseCookies(req);

    return {
        props: { evt, token },
    };
}
