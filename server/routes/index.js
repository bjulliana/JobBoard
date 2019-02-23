let express            = require('express');
let router             = express.Router();
let jobController      = require('../controllers/jobController');
let categoryController = require('../controllers/CategoryController');
let userController     = require('../controllers/UserController');
let passport           = require('passport');

const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated');
    } else {
        return next();
    }
};

/* GET home page. */
router.get('/', function (req, res) {
    return res.json(200);
});

//User Routes
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.get('/user', authMiddleware, userController.getCurrentUser);
router.get('/user/:id', userController.getUser);
router.post('/register', userController.addUser);

//Jobs Routes
router.get('/jobs', jobController.getJobs);
router.get('/jobs/category/:id', jobController.getJobsbyCategory);
router.get('/job/:id', jobController.getJob);
router.post('/job/new', authMiddleware, jobController.addJob);
router.get('/search/:search', jobController.searchJob);
//router.put('/job', jobController.updateJob);
//router.delete('/job/:id', jobController.deleteJob);

//Categories Routes
router.get('/categories', categoryController.getCategories);
router.get('/category/:id', categoryController.getCategory);
router.post('/category/new', authMiddleware, categoryController.addCategories);
router.put('/category', authMiddleware, categoryController.updateCategory);
router.delete('/category/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;
