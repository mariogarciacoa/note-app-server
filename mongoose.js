const mongoose = require("mongoose")

const connectionString = process.env.MONGO_DB_URI

mongoose.set("strictQuery", true)

// conexion a mongodb

mongoose
	.connect(connectionString)
	.then(() => {
		console.log("Database connected")
	})
	.catch((err) => console.error(err))
	


// const note = new Note({
//   content: 'mongodb es increible',
//   date: new Date(),
//   important: true
// })

// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(err => console.error(err))

// Note.find({}).then(result => {
//   console.log(result)
//   mongoose.connection.close()
// }).catch(err => console.error(err))