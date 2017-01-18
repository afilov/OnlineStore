"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('util')._extend;

var OrderSchema = new Schema({
    Name: String,
    Completed: Boolean,
    ProductID: Number,
    Price: Number,
    VAT: Number,
    Total: Number,
    DateCreated: Date
});

var OrderModel = mongoose.model('Order', OrderSchema);
var Restify = global.OStore.Restify;
var RefModules = global.OStore.RefModules;


function Order(data) {
    this.FirstName = null;
    this.LastName = null;
    this.Email = null;
    this.Password = null;
    this.Country = null;
    this.City = null;
    this.ZipCode = null;
    this.Street = null;
    this.DateCreated = new Date();
    if (data) {
        extend(this, data);
    }
};

var Method = Order.prototype;

Method.Create = function () {

};

module.exports = Order;