"use strict";

var mongoose = require('mongoose');

module.exports = function DBModelsCreator () {
    var mongoDBConnection = OStore.Config.mongoDB;
    mongoose.connect(mongoDBConnection, function (err) {
        if (err) {
            console.error("Error connection to DB");
        }
        else {
            console.info("Connection to DB established");
        }
    });
};