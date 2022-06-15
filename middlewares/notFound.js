const notFound = (req, res) => {
  res.status(404).send(`Route ${req.originalUrl} doesn't exists.`)
}

module.exports = notFound
