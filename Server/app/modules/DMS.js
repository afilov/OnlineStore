"use strict";
module.exports = function DMS() {
    var mongoose = require('mongoose');
    var config = global.OStore.Config;
    var uuid = require('node-uuid');
    var fs = require('fs');
    var RefModules = global.OStore.RefModules;
    var extend = require('util')._extend;


    this.SaveFile = function (File, callBack) {
        var folderPath = config.dmsConfig.folderpath;
        var fileExtension = "";

        var tmpSeg = File.name.split(".");
        if (tmpSeg.length > 1) {
            fileExtension = tmpSeg[tmpSeg.length - 1];
        }
        var orgName = File.name;
        if (fs.existsSync(folderPath)) {
            GenerateFileName(File, folderPath, fileExtension, function (name) {
                var fileName = name;
                fs.readFile(File.path, function (err, data) {
                    if (err) {
                        callBack(err, null);
                        return;
                    }

                    fs.writeFile(folderPath + '/' + fileName, data, function (err) {
                        if (err) {
                            callBack(err, null);
                            return;
                        }
                        else {
                            var FileModel = mongoose.model('File');
                            var File = new FileModel();
                            var uploadedFile = new RefModules.File({
                                Name: orgName,
                                RefName: fileName,
                                PhysicalPath: folderPath + "/" + fileName,
                                Extension: fileExtension,
                                DateUploaded: new Date()
                            });
                            delete uploadedFile._id;
                            extend(File._doc, uploadedFile);
                            File.save(function (err, result) {
                                callBack(err, result);
                            })
                        }
                    });
                });
            });

        }
    };

    this.DeleteFile = function (FileID, callBack) {
        if (!FileID) {
            callBack("No data recieved", null);
        }
        else {
            var FileModel = mongoose.model('File');
            FileModel.findByIdAndRemove(FileID, function (err, file) {
                if (err) {
                    callBack(err, null);
                }
                else {
                    var filePath = file.PhysicalPath;
                    fs.unlink(filePath, function (err) {
                        callBack(err, null);
                    });
                }
            })
        }
    };

    this.DownloadFile = function (FileID, callBack) {
        var FileModel = mongoose.model('File');
        FileModel.findById(FileID, function (err, file) {
            if (err) {
                callBack(err);
                return;
            }
            else if (file == null){
                callBack(null, null);
            }
            else {
                fs.readFile(file.PhysicalPath, function (err, data) {
                    file.dataStream = data;
                    callBack(null, file);
                });
            }


        });
    };


    var GenerateFileName = function (File, folderPath, fileExtension, callBack) {
        var fileName = File.name.substring(0, (File.name.length - fileExtension.length));
        fileName = uuid.v1();
        fileName = fileName.replace(new RegExp('-', 'g'), '');
        fileName = fileName + "." + fileExtension;
        if (fs.existsSync(folderPath + '/' + fileName) == false) {
            callBack(fileName);
        }
        else {
            GenerateFileName(File, folderPath, fileExtension, callBack);
        }

    }


};