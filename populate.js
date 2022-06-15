require('dotenv').config()

const connectDb = require('./database/connection')
const Product = require('./models/Products')
const jsonProducts = require('./products.json')

const start = async () => {
  try {
    connectDb()

    await Product.deleteMany({}) //delete all the products
    await Product.create(jsonProducts) //create the products that is in json file
    console.log('Products successfully added')
  } catch (error) {
    console.log(error)
  } finally {
    process.abort(0) //kill the process
  }
}

start()
