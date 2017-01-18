"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('util')._extend;

var UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Password: String,
    Country: String,
    City: String,
    ZipCode: String,
    Street: String,
    DateCreated: Date
});

var UserModel = mongoose.model('User', UserSchema);
var Restify = global.OStore.Restify;
var RefModules = global.OStore.RefModules;


function User(data) {
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

var Method = User.prototype;

Method.Authenticate = function () {

};

Method.Create = function (req,res,next) {
    var tmpUser = new RefModules.User();
    UserModel.findOne({Email:tmpUser.Email}, function (err, user) {
        if (err){
            Restify.RespondError(res,500,"DB Error");
        }
        else if (user != null){
            Restify.RespondError(res,401,"Email already exists");
        }
        else {
            UserModel.create(tmpUser, function (err, user) {
                if (err) {

                }
                else {

                }
            })
        }
    });
};


Method.Update = function () {

};

Method.FindByID = function (req, res, next) {
    UserModel.findById(req.params.id, function (err, user) {
        if (err) {
            Restify.RespondError(res, 404, "User does not exist");
        }
        else {
            Restify.RespondSuccess(res, user);
        }
    })
};

module.exports = User;