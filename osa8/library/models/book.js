const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, 'Must be atleast 2, got {VALUE}']
  },
  published: {
    type: Number,
    min: [0, 'Must be 0-2022, got {VALUE}'],
    max: [2022, 'Must be 0-2022, got {VALUE}']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

module.exports = mongoose.model('Book', schema)