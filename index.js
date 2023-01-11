require("dotenv").config()
require("./mongoose.js")
const express = require("express")
const cors = require("cors")
const app = express()
const logger = require("./midlewares/loggerMidleware")
const notFound = require("./midlewares/notFound")
const handleErrors = require("./midlewares/handleErrors")
const Note = require("./models/Note")

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(logger)

let notes = []

app.get("/", (req, res) => {
	res.send("<h1>API DE NOTAS</h1>")
})

app.get("/api/notes", (req, res, next) => {
	Note.find({}).then((notes) => {
		res.json(notes)
	}).catch(next)
})

app.get("/api/notes/:id", (req, res, next) => {
	const { id } = req.params

	Note.findById(id).then((note) => {
		if (note) {
			res.json(note)
		} else {
			res.status(404).end("<h1>Not Found Note</h1>")
		}
	}).catch(err => {
		next(err)
	})
})

app.post("/api/notes/", (req, res, next) => {
	const note = req.body

	if (!note || !note.content) {
		return res.status(400).json({
			error: "content missing",
		})
	}

	const newNote = new Note({
		content: note.content,
		date: new Date(),
		important: typeof note.important !== "undefined" ? note.important : false,
	})

	newNote
		.save()
		.then((savedNote) => res.json(savedNote))
		.catch(next)
})

app.put("/api/notes/:id", (req, res, next) => {
	const { id } = req.params
	const note = req.body

	if (!note || !note.content) {
		return res.status(400).json({
			error: "content missing",
		})
	}

	const newNoteInfo = {
		content: note.content,
		important: note.important
	}
		
	Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
		.then((result) => {
			res.json(result)
		})
		.catch(next)
})
	

app.delete("/api/notes/:id", (req, res, next) => {
	const {id} = req.params
	
	Note.findByIdAndDelete(id).then(() => {
	res.status(204).end()
	}).catch(next)
	
})

app.use(notFound)

app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
