const { events } = require("./events.json");

export default function handler(req, res) {
  if(req.method === "GET") {
    res.send(events);
  } else {
    res.setHeader("Allow", ["Get"]);
    res.status(405).json({message: `Method ${req.method} is not allowed`});
  }
}
