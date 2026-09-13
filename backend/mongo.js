require('dotenv').config()

const mongoose = require('mongoose')

if (!process.env.MONGODB_URI) {
    console.log('MONGODB_URI is not set in backend/.env')
    process.exit(1)
}

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI, { family: 4 })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })

    mongoose.connection.close()
})