import Link from "next/link";
import styles from "@/styles/EventItem.module.css";
import Image from "next/image";

export default function EventItem({ event }) {
    const {attributes: attr} = event;
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image
                    src={!attr.image.data ? "/images/event-default.png" : attr.image.data.attributes.formats.thumbnail.url }
                    width={170}
                    height={100}
                />
            </div>
            <div className={styles.info}>
                <span>
                    {new Date(attr.date).toDateString()} at {attr.time} 
                </span>
                <h3>{attr.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/events/${attr.slug}`}>
                    <a className="btn">Details</a>
                </Link>
            </div>
        </div>
    );
}
