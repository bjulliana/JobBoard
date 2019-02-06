var express            = require('express');
var router             = express.Router();
var jobController      = require('../controllers/jobController');
var categoryController = require('../controllers/CategoryController');

/* GET home page. */
router.get('/', function (req, res) {
    return res.json(200);
});

//Jobs Routes
router.get('/jobs', jobController.getJobs);
router.get('/job/:id', jobController.getJob);
router.post('/newjob', jobController.addJob);
//router.put('/post', postController.updatePost);
//router.delete('/post/:id', postController.deletePost);

//Categories Routes
router.get('/categories', categoryController.getCategories);
router.get('/category/:id', categoryController.getCategory);
router.post('/newcategory', categoryController.addCategories);

module.exports = router;
