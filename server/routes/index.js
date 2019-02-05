var express       = require('express');
var router        = express.Router();
var jobController = require('../controllers/jobController');

/* GET home page. */
router.get('/', function (req, res) {
    return res.json(200);
});

router.get('/jobs', jobController.getJobs);
router.post('/newjob', jobController.addJob);
//router.put('/post', postController.updatePost);
//router.delete('/post/:id', postController.deletePost);

module.exports = router;
