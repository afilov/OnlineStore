"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('util')._extend;

var OrderSchema = new Schema({
    Name: String,
    UserId: String,
    Completed: Boolean,
    ProductId: String,
    CartProducts: Array,
    Product: Object,
    Total: Number,
    Quantity: Number,
    PayPalId: String,
    PaymentLinks: Array,
    DateCompleted: Date,
    DateCreated: Date,
    DateConfirmed: Date,
    Confirmed: Boolean
});

var OrderModel = mongoose.model('Order', OrderSchema);
var Restify = global.OStore.Restify;
var Modules = global.OStore.Modules;

function Order(data) {
    this.Name = null;
    this.UserId = null;
    this.Completed = null;
    this.ProductId = null;
    this.CartProducts = [];
    this.Product = {};
    this.PayPalId = {};
    this.Total = null;
    this.Quantity = null;
    this.PaymentLinks = [];
    this.DateCreated = new Date();
    this.DateCompleted = null;
    this.DateConfirmed = null;
    this.Confirmed = false;
    if (data) {
        extend(this, data);
    }
};

var Method = Order.prototype;


Method.GetAll = function (req, res, next) {
    OrderModel.find(function (err, users) {
        if (err) {
            Restify.RespondError(res, 404, "DB Error");
        }
        else {
            Restify.RespondSuccess(res, users);
        }
    }).sort({DateCompleted: 1})
};


Method.GetById = function (req, res, next) {
    OrderModel.findById(req.params._id, function (err, order) {
        if (err) {
            Restify.RespondError(res, 404, "DB Error");
        }
        else {
            Restify.RespondSuccess(res, order);
        }
    })
};

module.exports = Order;