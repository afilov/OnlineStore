"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('util')._extend;
var md5 = require('md5');
var UserSchema = new Schema({
    Name: String,
    Username:String,
    Password: String
});

var AdminUserModel = mongoose.model('AdminUser', UserSchema);
var Restify = global.OStore.Restify;
var RefModules = global.OStore.RefModules;


AdminUserModel.find(function (err,adminUsers) {
    if (err){
        console.error("DB Error");
    }
    else if (adminUsers.length == 0){
        var superAdmin = new AdminUserModel();
        superAdmin.Username = "superadmin";
        superAdmin.Password = md5("superadmin");
        superAdmin.save(function (err) {
            if (err){
                console.error("Error on creating default superadmin");
            }
        })
    }
});

function AdminUser(data) {
    this.Name = null;
    this.Username = null;
    this.Password = null;
    if (data) {
        extend(this, data);
    }
};

var Method = AdminUser.prototype;

Method.Authenticate = function (req,res,next) {
    if (!req.body.Username || !req.body.Password){
        Restify.RespondError(res,400,"No data recieved");
    }
    else {
        var password = md5(req.body.Password);
        AdminUserModel.findOne({Username:req.body.Username,Password:password},function (err,adminUser) {
            if (err){
                Restify.RespondError(res,401,"DB Error");
            }
            else if (adminUser == null){
                Restify.RespondError(res,401,"Wrong username or password");
            }
            else {
                adminUser._doc.Token = Restify.CreateToken(adminUser._doc);
                Restify.RespondSuccess(res,adminUser);
            }
            next();
        })
    }
};


Method.Update = function (req,res,next) {
    if (!req.body) {
        Restify.RespondError(res, 401, "No data recieved");
        next();
    }
    else {
        var tmpUser = req.body;
        if (tmpUser.TempPassword != null){
            tmpUser.Password = md5(tmpUser.TempPassword);
        }
        var AdminUser = new RefModules.AdminUser(tmpUser);
        AdminUserModel.findOneAndUpdate({_id: AdminUser._id}, {$set: AdminUser}, function (err, admin) {
            if (err) {
                Restify.RespondError(res, 401, "DB Error");
            }
            else {
                admin._doc.Token = Restify.CreateToken(admin._doc);
                Restify.RespondSuccess(res, admin);
            }
            next();
        });
    }
};

module.exports = AdminUser;