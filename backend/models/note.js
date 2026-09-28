const mongoose = require('mongoose')

// Define the MongoDB schema for each note.
const noteSchema = new mongoose.Schema({
  content: { type: String, minLength: 5, required: true },
  important: { type: Boolean, default: false },
})

// Convert MongoDB objects to a cleaner JSON shape for the frontend.
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
