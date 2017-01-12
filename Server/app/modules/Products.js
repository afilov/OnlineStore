var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('util')._extend;

var ProductSchema = new Schema({
    Name: String,
    Price: Number,
    CategoryId: Object,
    VAT: Number,
    Description: String,
    ImageURL: String,
    FileId: Object,
    CreatedOn: Date
});

var ProductModel = mongoose.model('Product', ProductSchema);
var Restify = global.OStore.Restify;
var RefModules = global.OStore.RefModules;


function Product(data) {
    this._id = null;
    this.Name = null;
    this.Price = 0;
    this.Description = null;
    this.ImageURL = null;
    this.FileId = null;
    this.CreatedOn = null;
    this.CategoryId = null;
    this.VAT = null;
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

Method.GetByFilter = function (filter, callBack) {
    ProductModel.find(filter, function (err, products) {
        if (err) {
            callBack(err, null);
        }
        else {
            if (products.length == 0) {
                callBack(err, null);
            }
            else if (products.length == 1) {
                callBack(err, products[0]);
            }
            else {
                callBack(err, products);
            }
        }
    })
};

Method.GetById = function (req, res, next) {
    if (!req.params._id) {
        Restify.RespondError(res, 401, "No data recieved");
        next();
    }
    else {
        ProductModel.findById(req.params._id, function (err, product) {
            if (err) {
                Restify.RespondError(res, "DB Error");
            }
            else {
                Restify.RespondSuccess(res, product);
            }
            next();
        })
    }
};

Method.Create = function (req, res, next) {
    if (!req.body) {
        Restify.RespondError(res, 401, "No data recieved");
        next();
    }
    else {
        var tmpProduct = new RefModules.Product(req.body);
        ProductModel.create(tmpProduct, function (err, product) {
            if (err) {
                Restify.RespondError(res, "DB Error");
            }
            else {
                Restify.RespondSuccess(res, product);
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
        ProductModel.findByIdAndRemove(req.body._id, function (err, stat) {
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

Method.Update = function (req, res, next) {
    if (!req.body) {
        Restify.RespondError(res, 401, "No data recieved");
        next();
    }
    else {
        var tmpProduct = new RefModules.Product(req.body);
        ProductModel.findOneAndUpdate({_id: tmpProduct._id}, {$set: tmpProduct}, function (err, product) {
            if (err) {
                Restify.RespondError(res, 401, "DB Error");
            }
            else {
                Restify.RespondSuccess(res, product);
            }
            next();
        });
    }
};


module.exports = Product;