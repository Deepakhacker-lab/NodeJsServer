const cartModel = require('../Models/cartModel');
const User = require('../Models/userModel');
const Post = require('../Models/postModel');

exports.count = (req,res,next)=>{
    const userId= req.userId;
    User.findOne({_id: userId}).then(
        res=>{
            const cartcount= async ()=>{
                await cartModel.countDocuments({user_id: res.id});
            }
            if(!cartcount){
            return res.status(200).json({
                Message: "successfully fetch cart details",
                count: cartcount
            });
            }
            else{
                return res.status(200).json({
                    Message: "successfully fetch Empty cart ",
                    count: "0"
            })
        }
    }
    ).catch(err=>{
        if(!err.status)
        err.status=500;
        next(err);
    })
    ;
};

exports.AddCart = (req, res,next)=>{
    const id = req.body.id;
    const quantity = req.body.quantity;

    Post.findOne({_id: id}).then(
        res=>{
            const cart = new cartModel({
                user_id: res.id,
                title: title,
                content: content,
                quantity: quantity
              });
             return cart.save();
        }
    ).catch(err=>{
        err.statusCode=500;
        throw  err;
      }).then(result=>{
        response.status(201).json({
          message: 'Added to the cart List successfully!',
           post: result
      })
      }).catch(err=>{
        response.statusCode(500);
      });
      };

      exports.cartItems= (req, res, next)=>{
        cartModel.find().then(
            res=>{
                return res.status(201).json({
                    ...res
                })
            }
        ).catch(
            err=>{
                return res.status(404).json({
                    ...err
                })
            }
        );
      }