var mongoose = require('mongoose');


var WallSchema = new mongoose.Schema({
    author: String,
    collaborators: [String],
    wall: Object,
});

var Wall = mongoose.model('Wall', WallSchema);
module.exports = Wall;
