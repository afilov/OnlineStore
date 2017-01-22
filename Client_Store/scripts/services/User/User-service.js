app.service("User", ['UserFactory', '$rootScope', '$q', function (UserFactory, $rootScope, $q) {
    var User = function (data) {
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
        if (angular.isDefined(data) == true) {
            angular.extend(this, data);
        }
    };


    User.prototype.Authenticate = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = UserFactory.Authenticate(this);
        factoryPromise.then(function (data) {
            var error = false;
            if (data.status == 200) {
                deferred.resolve(data);
            }
            else {
                deferred.reject(error);
            }
        },function (err,status) {
            deferred.reject({err:err,status:status});
        });
        return promise;
    };

    User.prototype.FBAuthenticate = function (FBresult) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = UserFactory.FBAuthenticate(FBresult);
        factoryPromise.then(function (data) {
            var error = false;
            if (data.status == 200) {
                deferred.resolve(data);
            }
            else {
                deferred.reject(error);
            }
        },function (err,status) {
            deferred.reject({err:err,status:status});
        });
        return promise;
    };

    User.prototype.Register = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = UserFactory.Register(this);
        factoryPromise.then(function (data) {
            var error = false;
            if (data.status == 200) {
                deferred.resolve(data);
            }
            else {
                deferred.reject(error);
            }
        },function (err,status) {
            deferred.reject({err:err,status:status});
        });
        return promise;
    };

    User.prototype.Update = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = UserFactory.Update(this);
        factoryPromise.then(function (data) {
            var error = false;
            if (data.status == 200) {
                deferred.resolve(data);
            }
            else {
                deferred.reject(error);
            }
        },function (err,status) {
            deferred.reject({err:err,status:status});
        });
        return promise;
    };

    return User;

}]);