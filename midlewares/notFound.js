const notFound = (request, response, next) => {
response.status(404).send({ error: "unknown endpoint" })
}

module.exports = notFound
