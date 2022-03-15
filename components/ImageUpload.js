import { useState } from "react";
import styles from "@/styles/Form.module.css";
import { API_URL } from "../config";

export const ImageUpload = ({ evtId, imageUploaded, token }) => {
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("files", image);
        formData.append("ref", "events");
        formData.append("refId", evtId);
        formData.append("field", "image");
        console.log(token);
        const res = await fetch(`${API_URL}/api/upload`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "POST",
            body: formData,
        });

        if(res.ok) {
            imageUploaded();
        }
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    }

    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleFileChange}/>
                </div>
                <input className="btn" value="Upload" type="submit"/>
            </form>
        </div>
    );
};
