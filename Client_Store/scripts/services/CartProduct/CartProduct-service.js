app.service("CartProduct", ['CartProductFactory', '$rootScope', '$q',
    function (CartProductFactory, $rootScope, $q) {

        var CartProduct = function (data) {
            this._id = null;
            this.UserId = null;
            this.ProductId = null;
            this.Product = {};
            this.Wish = false;
            this.Quantity = null;
            this.Price = null;
            if (angular.isDefined(data) == true) {
                angular.extend(this, data);
            }
        };
        

        CartProduct.prototype.GetAll = function () {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var factoryPromise = CartProductFactory.GetAll();
            factoryPromise.then(function (data) {
                var error = false;
                if (data.status == 200) {
                    deferred.resolve(data);
                }
                else {
                    deferred.reject(error);
                }
            }, function (err, status) {
                deferred.reject({err: err, status: status});
            });
            return promise;
        };

        CartProduct.prototype.GetByID = function (id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var factoryPromise = CartProductFactory.GetByID(id);
            factoryPromise.then(function (data) {
                var error = false;
                if (data.status == 200) {
                    deferred.resolve(data);
                }
                else {
                    deferred.reject(error);
                }
            }, function (err, status) {
                deferred.reject({err: err, status: status});
            });
            return promise;
        };

        CartProduct.prototype.Create = function () {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var factoryPromise = CartProductFactory.Create(this);
            factoryPromise.then(function (data) {
                var error = false;
                if (data.status == 200) {
                    deferred.resolve(data);
                }
                else {
                    deferred.reject(error);
                }
            }, function (err, status) {
                deferred.reject({err: err, status: status});
            });
            return promise;
        };

        CartProduct.prototype.Update = function () {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var factoryPromise = CartProductFactory.Update(this);
            factoryPromise.then(function (data) {
                var error = false;
                if (data.status == 200) {
                    deferred.resolve(data);
                }
                else {
                    deferred.reject(error);
                }
            }, function (err, status) {
                deferred.reject({err: err, status: status});
            });
            return promise;
        };
        
        return CartProduct;

    }]);