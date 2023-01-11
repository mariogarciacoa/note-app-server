const handleErrors = (error, request, response, next) => {
	console.error(error)

	if (error.name === "CastError") {
		response.status(404).send({ error: "Id is not found" })
	} else {
		response.status(500).end()
	}
}

module.exports = handleErrors
