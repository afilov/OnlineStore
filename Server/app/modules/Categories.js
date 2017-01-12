var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('util')._extend;

var CategorySchema = new Schema({
    Name: String,
    CreatedOn: Date
});

var CategoryModel = mongoose.model('Category', CategorySchema);
var Restify = global.OStore.Restify;
var RefModules = global.OStore.RefModules;


function Category(data) {
    this._id = null;
    this.Name = null;
    this.CreatedOn = null;
    if (data) {
        extend(this, data);
    }
};

//
var Method = Category.prototype;


Method.GetAll = function (req, res, next) {
    CategoryModel.find(function (err, products) {
        if (err) {
            Restify.RespondError(res, 500, "DB Error")
        }
        else {
            Restify.RespondSuccess(res, products);
        }
    })
};

Method.GetById = function (req,res,next) {
    if (!req.params._id) {
        Restify.RespondError(res, "No data recieved");
        next();
    }
    else {
        CategoryModel.findById(req.params._id, function (err, category) {
            if (err) {
                Restify.RespondError(res, "DB Error");
            }
            else {
                Restify.RespondSuccess(res, category);
            }
            next();
        })
    }
};

Method.Create = function (req, res, next) {
    if (!req.body) {
        Restify.RespondError(res, "No data recieved");
        next();
    }
    else {
        var tmpCategory = new RefModules.Category(req.body);
        CategoryModel.create(tmpCategory, function (err, product) {
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
        Restify.RespondError(res, "No data recieved");
        next();
    }
    else {
        CategoryModel.findByIdAndRemove(req.body._id, function (err, stat) {
            if (err) {
                Restify.RespondError(res, "DB Error");
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
        Restify.RespondError(res, "No data recieved");
        next();
    }
    else {
        var tmpCategory = new RefModules.Category(req.body);
        CategoryModel.findOneAndUpdate({_id: tmpCategory._id}, {$set: tmpCategory}, function (err, category) {
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

module.exports = Category;