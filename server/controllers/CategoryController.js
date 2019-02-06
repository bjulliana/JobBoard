let Category = require('../models/Category');

module.exports.getCategories = function (req, res) {
    Category.find(function (err, categories) {
        if (err) {
            return res.json(err);
        }
        return res.json(categories);
    });
};

module.exports.addCategories = function (req, res) {
    let data        = req.body;
    let newCategory = new Category({
        title: data.title
    });
    newCategory.save(function (err, category) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(category);
    });
};

module.exports.getCategory = function (req, res) {
    var data = req.params.id;
    Category.findOne({_id: data}, function (err, category) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!category) {
            return res.status(404).send(err);
        }
        return res.json(category);
    });
};
