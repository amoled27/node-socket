const mongoose = require('mongoose');

const linkedListSchema = mongoose.Schema({
    value: String,
});
module.exports = mongoose.model('LinkedListNode', linkedListSchema);