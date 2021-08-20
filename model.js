var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    NAME: { type: String, required: true },
    POSITION : { type: String, required: true },
    AGE: { type: Number, required: true }
});

module.exports = mongoose.model("meeting", userSchema);