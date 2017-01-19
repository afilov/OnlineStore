"use strict";
var mime = require('mime');
module.exports = function Services() {
    var Restify = global.OStore.Restify;
    var Modules = global.OStore.Modules;

    //products

    Restify.AddGetService('/get/products', false, Modules.Product.GetAll);

    Restify.AddGetService('/get/category/producs/:_id', false, function (req, res, next) {
        Modules.Product.GetByFilter({CategoryId: req.params._id}, function (err, products) {
            if (err) {
                Restify.RespondError("DB Error");
            }
            else {
                Restify.RespondSuccess(res, products);
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
        else if (req.body.fileId) {
            Modules.DMS.DeleteFile(req.body.fileId, function (err, result) {
                if (err) {
                    Restify.RespondError(res, 401, "Error on deleting previous file");
                    next();
                }
                else {
                    Modules.DMS.SaveFile(req.files.file, function (err, file) {
                        Restify.RespondSuccess(res, file);
                    });
                }
            })
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

    Restify.AddPostService('/user/register', false, Modules.User.Create);


    //shopping cart

    //Todo: create class shopping cart

    Restify.AddGetService('/user/cartproducts', true, Modules.AdminUser.Authenticate);

    Restify.AddGetService('/user/cartproduct/:id', true, Modules.AdminUser.Authenticate);

    Restify.AddPostService('/user/cartproduct', true, Modules.AdminUser.Authenticate);

    Restify.AddPutService('/user/cartproduct', true, Modules.AdminUser.Authenticate);


    //admin users

    Restify.AddPostService('/admin/user/authenticate', false, Modules.AdminUser.Authenticate);


    Restify.AddPutService('/admin/user/update', false, Modules.AdminUser.Update);


};

