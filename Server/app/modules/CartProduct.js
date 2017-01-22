"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('util')._extend;

var CartProductSchema = new Schema({
    UserId: String,
    ProductId: String,
    Product: Object,
    Wish: Boolean,
    Quantity: Number,
    Total: Number
});

var CartProductModel = mongoose.model('CartProduct', CartProductSchema);
var Modules = global.OStore.Modules;
function CartProduct(data) {
    this._id = null;
    this.UserId = null;
    this.ProductId = null;
    this.Product = {};
    this.Wish = false;
    this.Quantity = null;
    this.Total = null;
    if (data) {
        extend(this, data);
    }
};


var Method = CartProduct.prototype;
var Restify = global.OStore.Restify;
var RefModules = global.OStore.RefModules;

Method.GetAll = function (req, res, next) {
    var userId = null;
    if (req.user.Username == undefined && req.user._id) {
        userId = req.user._id;
    }
    else {
        userId = req.params.id;
    }
    CartProductModel.find({UserId: userId}, function (err, cartproducts) {
        if (err) {
            Restify.RespondError(res, 401, "DB Error")
        }
        else {
            Restify.RespondSuccess(res, cartproducts);
        }
    })
};

Method.GetById = function (req, res, next) {
    if (!req.params._id) {
        Restify.RespondError(res, 400, "No data recieved");
        next();
    }
    else {
        CartProductModel.findById(req.params._id, function (err, cartproduct) {
            if (err) {
                Restify.RespondError(res, 400, "DB Error");
            }
            else {
                Restify.RespondSuccess(res, cartproduct);
            }
            next();
        })
    }
};

Method.Delete = function (req, res, next) {
    if (!req.body._id) {
        Restify.RespondError(res, 401, "No data recieved");
        next();
    }
    else {
        CartProductModel.findByIdAndRemove(req.body._id, function (err, stat) {
            if (err) {
                Restify.RespondError(res, 401, "DB Error");
            }
            else {
                Restify.RespondSuccess(res, stat);
            }
            next();
        })
    }
};


Method.Create = function (req, res, next) {
    if (!req.body) {
        Restify.RespondError(res, 400, "No data recieved");
        next();
    }
    else if (req.body.Quantity == 0) {
        Restify.RespondError(res, 400, "Quantity error");
        next();
    }
    else {
        Modules.Product.GetByFilter({_id: req.body.ProductId}, function (err, product) {
            req.body.UserId = req.user._id;
            req.body.Product = product;
            req.body.Total = req.body.Quantity * product.Price;
            var tmpCartProduct = new RefModules.CartProduct(req.body);
            CartProductModel.create(tmpCartProduct, function (err, cartProduct) {
                if (err) {
                    Restify.RespondError(res, 400,"DB Error");
                }
                else {
                    Restify.RespondSuccess(res, cartProduct);
                }
                next();
            })
        })
    }
};

Method.Update = function (req, res, next) {
    if (!req.body) {
        Restify.RespondError(res, 400,"No data recieved");
        next();
    }
    else {
        var tmpCartProduct = new RefModules.CartProduct(req.body);
        CartProductModel.findOneAndUpdate({_id: tmpCartProduct._id}, {$set: tmpCartProduct}, function (err, cartProduct) {
            if (err) {
                Restify.RespondError(res,400, "DB Error");
            }
            else {
                Restify.RespondSuccess(res, cartProduct);
            }
            next();
        });
    }
};


module.exports = CartProduct;