const { events } = require("./events.json");

export default function handler(req, res) {
    const slug = req.query.slug;
    const event = events.filter((ev) => ev.slug === slug);
    if (req.method === "GET") {
        res.send(event);
    } else {
        res.setHeader("Allow", ["Get"]);
        res.status(405).json({
            message: `Method ${req.method} is not allowed`,
        });
    }
}
