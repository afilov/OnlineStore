"use strict";
var mime = require('mime');
module.exports = function Services() {
    var Restify = global.OStore.Restify;
    var mongoose = require('mongoose');
    var Modules = global.OStore.Modules;

    //products

    Restify.AddGetService('/get/products', false, Modules.Product.GetAll);

    Restify.AddPostService('/buy/product', true, Modules.Product.Buy);

    Restify.AddGetService('/get/category/products/:_id', false, function (req, res, next) {
        Modules.Product.GetByFilter({CategoryId: req.params._id}, function (err, products) {
            if (err) {
                Restify.RespondError("DB Error");
            }
            else {
                var productList = products;
                if (products == null){
                    productList = [];
                }
                else if (products.constructor !== Array){
                    productList = [];
                    productList[0] = products;
                }
                Restify.RespondSuccess(res, productList);
            }
        })
    });

    Restify.AddGetService('/get/product/:_id', false, Modules.Product.GetById);

    Restify.AddPostService('/create/product', true, Modules.Product.Create);

    Restify.AddPutService('/update/product', true, Modules.Product.Update);

    Restify.AddPostService('/delete/product', true, Modules.Product.Delete);

    Restify.AddPostService('/product/attachment', true, function (req, res, next) {
        if (!req.files.file) {
            Restify.RespondError(res, 401, "No file recieved");
            next();
        }
        else {
            Modules.DMS.SaveFile(req.files.file, function (err, file) {
                Restify.RespondSuccess(res, file);
            });
        }
    });

    Restify.AddGetService('/product/attachment/download/:id', false, function (req, res, next) {
        if (!req.params.id) {
            Restify.RespondError(res, 401, "No file recieved");
            next();
        }
        else {
            Modules.DMS.DownloadFile(req.params.id, function (err, data) {
                if (err) {
                    Restify.RespondError(res, 404, "Error on getting Files info");
                    return;
                }
                else if (data == null) {
                    Restify.RespondError(res, 404, "Invalid file.");
                    return;
                }
                else {
                    res.setHeader('Content-Type', mime.lookup(data.Extension));
                    res.setHeader('Content-Disposition', 'attachment; filename=' + data.Name);
                    res.writeHead(200);
                    res.end(data.dataStream);
                    return next();
                }
            });

        }
    });


    //categories

    Restify.AddGetService('/get/categories', false, Modules.Category.GetAll);

    Restify.AddGetService('/get/category/:_id', false, Modules.Category.GetById);

    Restify.AddPostService('/create/category', true, Modules.Category.Create);

    Restify.AddPutService('/update/category', true, Modules.Category.Update);

    Restify.AddPostService('/delete/category', true, Modules.Category.Delete);


    //users

    Restify.AddPostService('/user/authenticate', false, Modules.User.Authenticate);

    //Todo: Check income values;
    Restify.AddPostService('/user/fb/authenticate', false, Modules.User.FBAuthenticate);

    Restify.AddPutService('/user/update', true, Modules.User.Update);

    Restify.AddPostService('/user/register', false, Modules.User.Register);

    Restify.AddGetService('/users/all',true,Modules.User.GetAll);

    Restify.AddGetService('/user/:_id',true,Modules.User.GetByID);


    //shopping cart


    Restify.AddGetService('/user/cart/products', true, Modules.CartProduct.GetAll);

    Restify.AddGetService('/user/checkout/cart/products', true, Modules.CartProduct.Checkout);

    Restify.AddGetService('/user/cart/product/:_id', true, Modules.CartProduct.GetById);

    Restify.AddPostService('/user/create/cart/product', true, Modules.CartProduct.Create);

    Restify.AddPostService('/user/delete/cart/product', true, Modules.CartProduct.Delete);

    Restify.AddPutService('/user/cart/product', true, Modules.CartProduct.Update);


    //orders

    Restify.AddGetService('/execute/order/:orderId/:payerId', true, function (req,res,next) {
        if (!req.params.orderId || !req.params.payerId){
            Restify.RespondError(res,400,"missing params");
        }
        else {
            var OrderModel = mongoose.model('Order');
            OrderModel.findOne({PayPalId:req.params.orderId},function (err,order) {
                if (err){
                    Restify.RespondError(res,400,"DB Error");
                }
                else {
                    var total = order.Total;
                    Modules.PayPal_API.ExecuteOrder(req.params.orderId, req.params.payerId, total, function (err, result) {
                        if (err){
                            Restify.RespondError(res,400,"Order was not confirmed");
                        }
                        else {
                            order.Completed = true;
                            order.DateCompleted = new Date();
                            order.save();
                            Restify.RespondSuccess(res,true);
                        }
                    })
                }
            });

        }
    });



    //admin users

    Restify.AddPostService('/admin/user/authenticate', false, Modules.AdminUser.Authenticate);

    Restify.AddPutService('/admin/user/update', false, Modules.AdminUser.Update);


};

