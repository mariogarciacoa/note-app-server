const express = require("express")
const app = express()
const logger = require("./loggerMidleware")

app.use(express.json())

app.use(logger)

let notes = [
	{
		id: 1,
		content: "HTML is easy",
		date: "2019-05-30T17:30:31.098Z",
		important: true,
	},
	{
		id: 2,
		content: "Browser can execute only Javascript",
		date: "2019-05-30T18:39:34.091Z",
		important: false,
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		date: "2019-05-30T19:20:14.298Z",
		important: true,
	},
]

app.get("/", (req, res) => {
	res.send("</h1>API DE NOTAS</h1>")
})

app.get("/api/notes", (req, res) => {
	res.json(notes)
})

app.get("/api/notes/:id", (req, res) => {
	const id = Number(req.params.id)
	const note = notes.find((note) => note.id === id)

	if (note) {
		res.json(note)
	} else {
		res.status(404).end("<h1>Not Found Note</h1>")
	}
})

app.post("/api/notes/", (req, res) => {
	const note = req.body

	if (!note || !note.content) {
		return res.status(400).json({
			error: "note.content is required",
		})
	}

	const ids = notes.map((note) => note.id)
	const maxId = Math.max(...ids)

	const newNote = {
		id: maxId + 1,
		content: note.content,
		date: new Date().toISOString(),
		important: typeof note.important !== "undefined" ? note.important : false,
	}

	notes = [...notes, newNote]

	res.json(newNote)
})

app.delete("/api/notes/:id", (req, res) => {
	const id = Number(req.params.id)
	notes = notes.filter((note) => note.id !== id)

	res.status(204).end()
})

app.use((req, res) => {
	res.status(404).json({
		error: 'Not Found'
	})
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
