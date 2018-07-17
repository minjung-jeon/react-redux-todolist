var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    id: String,
    content: String,
    completed: { type: Boolean, default: false },
    isEdit: { type: Boolean, default: false },
});

module.exports = mongoose.model('todo', todoSchema);