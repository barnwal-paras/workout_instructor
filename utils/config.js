const dotenv = require('dotenv').config()

const port = process.env.PORT 
const mongo_url = process.env.MONGODB_URL

module.exports = {
	port,
	mongo_url
}