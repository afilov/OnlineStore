app.service("User", ['UserFactory', '$rootScope', '$q', function (UserFactory, $rootScope, $q) {
    var User = function (data) {
        this._id = null;
        this.Name = null;
        this.Password = null;
        this.Username = null;
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

    User.prototype.Update = function (Password) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        this.Password = Password;
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