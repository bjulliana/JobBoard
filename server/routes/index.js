let express            = require('express');
let router             = express.Router();
let jobController      = require('../controllers/jobController');
let categoryController = require('../controllers/CategoryController');

/* GET home page. */
router.get('/', function (req, res) {
    return res.json(200);
});

//Jobs Routes
router.get('/jobs', jobController.getJobs);
router.get('/job/:id', jobController.getJob);
router.post('/job/new', jobController.addJob);
//router.put('/post', postController.updatePost);
//router.delete('/post/:id', postController.deletePost);

//Categories Routes
router.get('/categories', categoryController.getCategories);
router.get('/category/:id', categoryController.getCategory);
router.post('/category/new', categoryController.addCategories);
router.put('/category', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;
