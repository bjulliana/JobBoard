var mongoose        = require('mongoose');
var CatergorySchema = new mongoose.Schema({
    title: {type: String, required: ['Category Title is Required']}
}, {
    collection: 'categories',
    timestamps: true
});

module.exports = mongoose.model('Category', CatergorySchema);
