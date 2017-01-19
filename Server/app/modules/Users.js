"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('md5');
var extend = require('util')._extend;
var FB = require('fb');

var UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Password: String,
    Country: String,
    City: String,
    ZipCode: String,
    Street: String,
    FacebookID: Number,
    DateCreated: Date
});

var UserModel = mongoose.model('User', UserSchema);
var Restify = global.OStore.Restify;
var RefModules = global.OStore.RefModules;


function User(data) {
    this._id = null;
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

Method.Authenticate = function (req, res, next) {
    if (!req.body.Email || !req.body.Password) {
        Restify.RespondError(res, 400, "No data recieved");
    }
    else {
        var password = md5(req.body.Password);
        var regex = new RegExp(["^", req.body.Email, "$"].join(""), "i");
        UserModel.findOne({Email: regex, Password: password}, function (err, user) {
            if (err) {
                Restify.RespondError(res, 401, "DB Error");
            }
            else if (user == null) {
                Restify.RespondError(res, 401, "Wrong email or password");
            }
            else {
                user._doc.Token = Restify.CreateToken(user._doc);
                Restify.RespondSuccess(res, user);
            }
            next();
        })
    }
};

Method.FBAuthenticate = function (req, res, next) {
    var updateInfo = req.body;
    if (updateInfo.accessToken == undefined) {
        Restify.RespondError(res, 409, "Facebook login failed");
    } else {
        FB.api('me', {fields: ['id'], access_token: updateInfo.accessToken}, function (result) {
            if (result.error) {
                Restify.RespondError(res, 409, "Facebook login failed");
            }
            else {
                UserModel.findOne({FacebookID: result.id}, function (err, user) {
                    if (err) {
                        Restify.RespondError(res, 409, 'DB Error.');
                    }
                    else if (user == null) {

                    }

                });

            }
        });
    }
};

Method.Register = function (req, res, next) {
    if (!req.body) {
        Restify.RespondError(res, 401, "No data recieved");
        next();
    }
    else {
        var tmpUser = new RefModules.User(req.body);
        UserModel.findOne({Email: tmpUser.Email}, function (err, user) {
            if (err) {
                Restify.RespondError(res, 500, "DB Error");
            }
            else if (user != null) {
                Restify.RespondError(res, 401, "Email already exists");
            }
            else {
                tmpUser.Password = md5(tmpUser.Password);
                UserModel.create(tmpUser, function (err, user) {
                    if (err) {
                        Restify.RespondError(res, 401, "DB Error");
                    }
                    else {
                        global.OStore.Modules.Mailer.SendWelcomeEmail(user);
                        user._doc.Token = Restify.CreateToken(user._doc);
                        Restify.RespondSuccess(res, user);
                    }
                })
            }
        });
    }
};

Method.Update = function (req, res, next) {
    if (!req.body) {
        Restify.RespondError(res, 401, "No data recieved");
        next();
    }
    else {
        var tmpUser = req.body;
        if (tmpUser.TempPassword != null) {
            tmpUser.Password = md5(tmpUser.TempPassword);
        }
        var User = new RefModules.User(tmpUser);
        UserModel.find({Email: User.Email}, function (err, user) {
            if (err) {
                Restify.RespondError(res, 401, "DB error");
            }
            else if (user.length == 0) {
                UserModel.findOneAndUpdate({_id: User._id}, {$set: User}, function (err, user) {
                    if (err) {
                        Restify.RespondError(res, 401, "DB Error");
                    }
                    else {
                        user._doc.Token = Restify.CreateToken(user._doc);
                        Restify.RespondSuccess(res, user);
                    }
                    next();
                });
            }
            else {
                if (user[0]._id == User._id) {
                    UserModel.findOneAndUpdate({_id: User._id}, {$set: User}, function (err, user) {
                        if (err) {
                            Restify.RespondError(res, 401, "DB Error");
                        }
                        else {
                            user._doc.Token = Restify.CreateToken(user._doc);
                            Restify.RespondSuccess(res, user);
                        }
                        next();
                    });
                }
                else {
                    Restify.RespondError(res, 401, "Email already exists");
                }
            }

        });

    }
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