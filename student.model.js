const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Student = new Schema({
    name: {
        type: String
    },
    city: {
        type: String
    },
    createdAt: { 
        type: Date, default: new Date()
    }
});


module.exports = mongoose.model('Student', Student);