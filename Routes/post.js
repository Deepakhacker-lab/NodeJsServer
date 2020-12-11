const express = require('express');

const isAuth = require('../middleware/midAuth')

const notificationController = require('../Controllers/notificationController');


const router = express.Router();

router.get('/',isAuth, notificationController.fetchAll);

router.post('/post',isAuth, notificationController.PostNotification);

router.get('/post/:postId',isAuth, notificationController.getPost);

router.put('/post/:postId',isAuth, notificationController.updatePost);

router.put('/markRead/:postId',isAuth, notificationController.markRead);

router.delete('/post/:postId',isAuth, notificationController.deletePost);



module.exports = router;