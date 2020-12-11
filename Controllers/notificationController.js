const Post = require('../Models/postModel');
const User = require('../Models/userModel');

exports.PostNotification = (request, response, next) => {
  const user = request.body.userId;
  User.findOne({ _id: user, Role: 'Developer' }).then(
    res => {
        const title = request.body.title;
        const content = request.body.content;
        const url = request.body.url;
        const notification = new Post({
          title: title,
          content: content,
          url: url
        });
        return notification.save()
        
    }).catch(err=>{
      err.statusCode=500;
      throw  err;
    }).then(result=>{
      response.status(201).json({
        message: 'Post created successfully!',
         post: result
    })
    }).catch(err=>{
      response.statusCode(500);
    });
    };

      exports.fetchAll = (request, response, next) => {
        const currentPage = request.query.page || 1;
        const perPage = 3;
        let totalItems;
        Post.find()
          .countDocuments()
          .then(count => {
            totalItems = count;
            return Post.find()
              .skip((currentPage - 1) * perPage)
              .limit(perPage);
          })
          .then(posts => {
            response.status(200).json({
              message: 'Fetched posts successfully.',
              posts: posts,
              totalItems: totalItems
            });
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });


      };

      exports.getPost = (request, response, next) => {
        const postId = request.params.postId;
        
        Post.findOne({ _id: postId })
          .then(post => {
            if (!post) {
              const error = new Error('Could not find post.');
              error.statusCode = 404;
              throw error;
            }
            response.status(200).json({ message: 'Post fetched.', post: post });
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      };

      exports.updatePost = (request, response, next) => {
        const postId = request.params.postId;
        const title = request.body.title;
        const content = request.body.content;
        const url = request.body.url;
        Post.findOne({ _id: postId })
          .then(post => {
            if (!post) {
              const error = new Error('Could not find post.');
              error.statusCode = 404;
              throw error;
            }

            post.title = title;
            post.content = content;
            post.url= url;
            return post.save();
          })
          .then(result => {
            response.status(200).json({ message: 'Post updated!', post: result });
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          })
          .catch(err => {
            err.statusCode = 500;
            throw err;
          });


      };


      exports.deletePost = (request, response, next) => {

        const postId = request.params.postId;
        const user = request.body.userId;
        User.findOne({ _id: user, Role: 'Developer' }).then(
          res => {
            
              Post.findOneAndRemove({ _id: postId })
                .then(result => {
                  response.status(200).json({ message: 'Deleted post.' });
                })
                .catch(err => {
                  if (!err.statusCode) {
                    err.statusCode = 500;
                  }
                });
            }
            
        ).catch(
          err => {
            err.statusCode = 500;
            throw err;
          }
        )
      };

      exports.markRead = (request, response, next) => {
        const postId = request.params.postId;
        Post.findOne({_id:postId})
          .then(post => {
            if (!post) {
              const error = new Error('Could not find post.');
              error.statusCode = 404;
              throw error;
            }

            post.read = 'Read';
            return post.save();
          })
          .then(result => {
            response.status(200).json({ message: 'Post updated!', post: result });
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      };

    
    