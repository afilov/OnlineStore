"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var extend = require('util')._extend;

var FileSchema = new Schema({
    Name: String,
    RefName: String,
    PhysicalPath: String,
    Extension: String,
    DateUploaded: Date
});

var FileModel = mongoose.model('File', FileSchema);

function File(data) {
    this._id = null;
    this.Name = null;
    this.RefName = null;
    this.PhysicalPath = null;
    this.Extension = null;
    this.DateUploaded = null;
    if (data) {
        extend(this, data);
    }
};
module.exports = File;