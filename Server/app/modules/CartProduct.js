"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('util')._extend;

var CartProductSchema = new Schema({
    UserId: String,
    ProductId: String,
    Wish: Boolean,
    Quantity: Number,
    Price: Number
});

var CartProductModel = mongoose.model('CartProduct', CartProductSchema);

function CartProduct(data) {
    this._id = null;
    this.UserId = null;
    this.ProductId = null;
    this.Wish = false;
    this.Quantity = null;
    this.Price = null;
    if (data) {
        extend(this, data);
    }
};


var Method = CartProduct.prototype;


Method.GetAll = function (req, res, next) {
    var userId = null;
    if (req.user.Username == undefined && req.user._id) {
        userId = req.user._id;
    }
    else {
        userId = req.params.id;
    }
    CartProductModel.findById(userId, function (err, cartproducts) {
        if (err) {
            Restify.RespondError(res, 401, "DB Error")
        }
        else {
            Restify.RespondSuccess(res, cartproducts);
        }
    })
};

Method.Create = function (req, res, next) {
    if (!req.body) {
        Restify.RespondError(res, "No data recieved");
        next();
    }
    else {
        var tmpCartProduct = new RefModules.CartProduct(req.body);
        CartProductModel.create(tmpCartProduct, function (err, cartProduct) {
            if (err) {
                Restify.RespondError(res, "DB Error");
            }
            else {
                Restify.RespondSuccess(res, cartProduct);
            }
            next();
        })
    }
};

Method.Update = function (req, res, next) {
    if (!req.body) {
        Restify.RespondError(res, "No data recieved");
        next();
    }
    else {
        var tmpCartProduct = new RefModules.CartProduct(req.body);
        CartProductModel.findOneAndUpdate({_id: tmpCartProduct._id}, {$set: tmpCartProduct}, function (err, category) {
            if (err) {
                Restify.RespondError(res, "DB Error");
            }
            else {
                Restify.RespondSuccess(res, category);
            }
            next();
        });
    }
};


module.exports = CartProduct;