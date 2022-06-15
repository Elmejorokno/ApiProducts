const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name must be provided.']
    },
    price: {
      type: Number,
      required: [true, 'Product price must be provided.']
    },
    featured: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 0
    },
    company: {
      type: String,
      enum: {
        values: ['ikea', 'liddy', 'caressa', 'marcos'],
        message: 'The company name {VALUE} is not supported'
      }
      // enum: ['ikea', 'liddy', 'caressa', 'marcos']
    }
  },
  { timestamps: true, versionKey: false }
)

module.exports = mongoose.model('products', productSchema)
