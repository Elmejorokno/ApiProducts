const Product = require('../models/Products')
const {
  handlerSort,
  handlerSelect,
  handlerBasicFields,
  handlerNumericFilters
} = require('../utils/filtersApi')

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, select, limit, page, numericFilters } =
    req.query

  let queryObj = handlerBasicFields({ featured, company, name })

  queryObj = handlerNumericFilters({ numericFilters, queryObj })

  const sortQuery = handlerSort({ sort, fieldDefault: 'createdAt' })
  const selectQuery = handlerSelect({ select })

  const limitQuery = parseInt(limit) || 10
  const pageQuery = parseInt(page) || 1
  const skipQuery = (pageQuery - 1) * limitQuery

  const products = await Product.find(queryObj)
    .sort(sortQuery)
    .select(selectQuery)
    .skip(skipQuery)
    .limit(limitQuery)

  return res.status(200).json({ results: products.length, products })
}

const getSingleProduct = async (req, res) => {
  const { idProduct } = req.params

  const { select } = req.query

  const selectQuery = handlerSelect({ select })

  const product = await Product.findById(idProduct).select(selectQuery)

  if (!product) {
    const error = new Error(`The product doesn't exists.`)
    error.statusCode = 404

    throw error
  }

  return res.status(200).json({ product })
}

module.exports = {
  getAllProducts,
  getSingleProduct
}
