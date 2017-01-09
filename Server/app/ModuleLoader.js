"use strict";

var fs = require('fs');
var util = require('util');

module.exports = function ModuleLoader () {
    this.AddModule = function (modulePath) {
        var tmpModule = require(modulePath);
        var initModule = new tmpModule();
        this.RefModuleDic[initModule.constructor.name] = tmpModule;
        this.ModuleDic[initModule.constructor.name] = initModule;
        this.Modules.push(initModule);

        return initModule;
    };
    global.OStore = {};
    global.OStore.BasePath = process.cwd();
    global.OStore.Config = require('config');
    var modulesFolder = 'modules';
    global.OStore.Modules = this.ModuleDic = {};
    global.OStore.RefModules = this.RefModuleDic = {};
    this.Modules = [];
    global.OStore.Restify = this.AddModule("./Restify.js");

    /* Load Dynamic Modules */
    var physicalFolder = __dirname + "\\" + modulesFolder;

    var files = fs.readdirSync(physicalFolder);

    console.info("Start All Modules");
    for (var i = 0; i < files.length; i++) {
        console.info("Loading module " + files[i]);

        try {
            var initModule = this.AddModule(physicalFolder + "\\" + files[i]);
        }
        catch (ex) {
            console.error("Error loading " + files[i] + ", error:" + ex);
        }
    }
    console.info("Modules Loaded");
    /* Initialize Modules */

    var loadedModulesCounter = 0;
    var tmpModule;


    global.OStore.DBModelsCreator = this.AddModule("./DBModelsCreator.js");
    global.OStore.Services = this.AddModule("./Services.js");
    var initModules = function (err) {
        if (err) {
            console.error("----ERROR ON MODULE INIT----");
            console.error("Module: " + tmpModule.ModuleName);
            console.error("Error: " + err);
            console.error("----STOP----");
            process.exit();
            return;
        }

        if (loadedModulesCounter < this.Modules.length) {
            tmpModule = this.Modules[loadedModulesCounter];
            loadedModulesCounter++;
            console.info(util.format("Init module %s/%s,  %s", loadedModulesCounter, this.Modules.length, tmpModule.constructor.name));

            if (tmpModule.Init) {
                var promise = tmpModule.Init();
                if (promise instanceof Promise) {
                    promise.then(initModules, initModules);
                }
                else {
                    initModules();
                }
            }
            else {
                initModules();
            }
        }
        else {
            console.log("----- Server Started -----");
        }
    }.bind(this);

   initModules();

};