module.exports = function Restify () {
    var restify = require('restify');
    var CookieParser = require('restify-cookies');
    var jwt = require('restify-jwt');
    var jwthelper = require('jsonwebtoken');
    var path = require('path');
    var fs = require('fs');



    var OStore = global.OStore;

    var server = this.Server = restify.createServer();
    var jwtSecret = jwt({secret: OStore.Config.tokenSecret});

    var publicServices = [];

    var appDir = path.dirname(require.main.filename);
    appDir = appDir.replace(new RegExp('\\\\', 'g'), '/');
    OStore.AppDir = appDir;
    //server.use(jwtSecret.unless({path: publicServices}));

    function SetHeaders() {
        restify.CORS.ALLOW_HEADERS.push('authorization');

        server.use(CookieParser.parse);
        server.use(restify.CORS());
        server.use(restify.fullResponse());
        server.use(restify.acceptParser(server.acceptable));
        server.use(restify.jsonp());
        server.use(restify.bodyParser({mapParams: false}));
        server.use(restify.queryParser());

        restify.CORS.credentials = true;

        server.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Max-Age', '1000');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.setHeader('Content-Type', "application/json");
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-Requested-With, X-PINGOTHER, X-CSRF-Token,Authorization');

            next();
        });

    };

    SetHeaders();

    this.ResponseObject = function () {
        this.Success = false;
        this.Error = null;
        this.Data = null;

        this.GetJSON = function () {
            return JSON.stringify(this);
        }.bind(this);

        this.SetResponse = function (response) {
            response.end(this.GetJSON());
        }.bind(this);
    };

    this.ExtGetServices = {};
    this.ExtPostServices = {};
    this.ExtPutServices = {};

    var ServiceInfos = [];

    this.AddGetService = function (srvInfo, callBack, auth) {

        if(typeof(auth) == 'function' && typeof(callBack) == 'boolean'){
            var tmp = auth;
            auth = callBack;
            callBack = tmp;
        }

        var serviceInfo = srvInfo;
        if (typeof(srvInfo) == "string") {
            serviceInfo = {path: srvInfo, description: "Rest Service", title: srvInfo, group: "other"};
        }

        serviceInfo.method = "GET";
        serviceInfo.secure = true;

        if (auth != undefined && auth == false) {
            serviceInfo.secure = false;
            publicServices.push(serviceInfo.path);
        }

        this.ExtGetServices[serviceInfo.path] = callBack;
        ServiceInfos.push(serviceInfo);
    };

    this.AddPostService = function (srvInfo, callBack, auth) {
        if(typeof(auth) == 'function' && typeof(callBack) == 'boolean'){
            var tmp = auth;
            auth = callBack;
            callBack = tmp;
        }

        var serviceInfo = srvInfo;
        if (typeof(srvInfo) == "string") {
            serviceInfo = {path: srvInfo, description: "Rest Service", title: srvInfo, group: "other"};
        }

        serviceInfo.method = "POST";
        serviceInfo.secure = true;

        if (auth != undefined && auth == false) {
            serviceInfo.secure = false;
            publicServices.push(serviceInfo.path);
        }

        this.ExtPostServices[serviceInfo.path] = callBack;
        ServiceInfos.push(serviceInfo);
    };

    this.AddPutService = function (srvInfo, callBack, auth) {
        if(typeof(auth) == 'function' && typeof(callBack) == 'boolean'){
            var tmp = auth;
            auth = callBack;
            callBack = tmp;
        }

        var serviceInfo = srvInfo;
        if (typeof(srvInfo) == "string") {
            serviceInfo = {path: srvInfo, description: "Rest Service", title: srvInfo, group: "other"};
        }

        serviceInfo.method = "PUT";
        serviceInfo.secure = true;

        if (auth != undefined && auth == false) {
            serviceInfo.secure = false;
            publicServices.push(serviceInfo.path);
        }

        this.ExtPutServices[serviceInfo.path] = callBack;
        ServiceInfos.push(serviceInfo);
    };

    this.GetServiceList = function () {
        return ServiceInfos;
    };

    this.Init = function () {
        var services = Object.keys(this.ExtGetServices);
        for (var i = 0; i < services.length; i++) {
            if (publicServices.indexOf(services[i]) > -1) {
                this.Server.get(services[i], function (req, res, next) {
                    this.ExtGetServices[req.route.path](req, res, next);
                }.bind(this));
            }
            else {
                this.Server.get(services[i], jwtSecret, function (req, res, next) {
                    this.ExtGetServices[req.route.path](req, res, next);
                }.bind(this));
            }
        }

        services = Object.keys(this.ExtPostServices);

        for (var i = 0; i < services.length; i++) {
            if (publicServices.indexOf(services[i]) > -1) {
                this.Server.post(services[i], function (req, res, next) {
                    this.ExtPostServices[req.route.path](req, res, next);
                }.bind(this));
            }
            else {
                this.Server.post(services[i], jwtSecret, function (req, res, next) {
                    this.ExtPostServices[req.route.path](req, res, next);
                }.bind(this));
            }
        }

        services = Object.keys(this.ExtPutServices);

        for (var i = 0; i < services.length; i++) {
            if (publicServices.indexOf(services[i]) > -1) {
                this.Server.put(services[i], function (req, res, next) {
                    this.ExtPutServices[req.route.path](req, res, next);
                }.bind(this));
            }
            else {
                this.Server.put(services[i], jwtSecret, function (req, res, next) {
                    this.ExtPutServices[req.route.path](req, res, next);
                }.bind(this));
            }
        }


        this.Server.listen(OStore.Config.serverport, function () {
            console.log('%s listening at %s', this.Server.name, this.Server.url);
        }.bind(this));
    }.bind(this);

    this.CreateToken = function (data) {
        return jwthelper.sign(data, OStore.Config.tokenSecret);
    };

    this.RespondSuccess = function (res, data) {
        res.statusCode = 200;
        res.end(JSON.stringify(data));
    };

    this.RespondError = function (res, statusCode, statusMsg) {
        res.statusCode = statusCode;
        res.statusMessage = statusMsg;
        res.setHeader('Content-Type', "plain/text");
        res.end(res.statusMessage);
    }
};



