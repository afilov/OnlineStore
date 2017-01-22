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
    DateCompleted:Date,
    DateCreated: Date
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
    if (data) {
        extend(this, data);
    }
};

var Method = Order.prototype;

Method.CreateOrder = function (req, res, next) {

};

module.exports = Order;