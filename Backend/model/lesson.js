const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
    grade:String,
    subject:String,
    date:Date,
    topic:String,
    lesson:String,
    foucus:String,
    material:String,
    objective:String,
    structure:String,
    assesment:String,
})

const lesson = mongoose.model('lesson',lessonSchema)

module.exports = lesson