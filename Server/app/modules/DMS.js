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
                        callBack(err,null);
                        return;
                    }

                    fs.writeFile(folderPath + '/' + fileName, data, function (err) {
                        if (err) {
                            callBack(err,null);
                            return;
                        }
                        else {
                            var FileModel = mongoose.model('File');
                            var File = new FileModel();
                            var uploadedFile = new RefModules.File({Name:orgName,RefName:fileName,PhysicalPath:folderPath+"/"+fileName,Extension:fileExtension,DateUploaded:new Date()});
                            extend(File._doc, uploadedFile);
                            File.save(function (err,result) {
                                callBack(err,result);
                            })
                        }
                    });
                });
            });

        }
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