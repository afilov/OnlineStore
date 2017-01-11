var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('util')._extend;

var ProductSchema = new Schema({
    Name: String,
    Price: Number,
    CurrencyID: Number,
    Description: String,
    ImageURL: String,
    CreatedOn: Date,
    Enabled: Boolean
});

var ProductModel = mongoose.model('Product', ProductSchema);
var Restify = global.OStore.Restify;
var RefModules = global.OStore.RefModules;


function Product(data) {
    this.Name = null;
    this.Price = 0;
    this.CurrencyID = 0;
    this.Description = null;
    this.ImageURL = null;
    this.CreatedOn = null;
    this.Enabled = false;
    if (data) {
        extend(this, data);
    }
};

//
var Method = Product.prototype;


Method.GetAll = function (req, res, next) {
    ProductModel.find(function (err, products) {
        if (err) {
            Restify.RespondError(res, 500, "DB Error")
        }
        else {
            Restify.RespondSuccess(res, products);
        }
    })
};

Method.Create = function (req, res, next) {
    var tmpProduct = new RefModules.Product({
        Name: "Test",
        Price: 500,
        CurrencyID: 3,
        Description: "test",
        ImageURL: "http://",
        CreatedOn: new Date(),
        Enabled: true
    });
    ProductModel.create(tmpProduct, function (err, product) {
        if (err) {

        }
        else {

        }
    })
};

Method.Update = function () {

};


module.exports = Product;