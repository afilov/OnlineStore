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
var Restify = global.OStore.Restify;
var RefModules = global.OStore.RefModules;

// var tmpFileModel = mongoose.model('File');
//
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
//
// var Method = File.prototype;
//
// Method.CreateFile = function (callBack) {
//     FileModel.create(this,function (err,file) {
//         if (err){
//             console.error(err);
//             callBack(err,null);
//         }
//         else {
//             callBack(err,file)
//         }
//     })
// };
//
module.exports = File;