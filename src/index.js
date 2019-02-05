var express       = require('express');
var router        = express.Router();
var jobController = require('../server/controllers/jobController');

router.get('/posts', jobController.getJobs);
//router.post('/posts', postController.addPost);
//router.put('/post', postController.updatePost);
//router.delete('/post/:id', postController.deletePost);

module.exports = router;
