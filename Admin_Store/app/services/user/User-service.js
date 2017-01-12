app.service("User", ['UserFactory', '$rootScope', '$q', function (UserFactory, $rootScope, $q) {
    var User = function (data) {
        this.ID = null;
        this.Name = null;
        this.CategoryID = null;
        this.Price = null;
        this.VAT = null;
        this.CreatedOn = null;
        this.Enabled = false;
        if (angular.isDefined(data) == true) {
            angular.extend(this, data);
        }
    };


    User.prototype.GetAllProducts = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.getAllProducts();
        factoryPromise.then(function (data) {
            var error = false;

            if (data.status == 200) {
                deferred.resolve(data);
            }
            else {
                deferred.reject(error);
            }
        })
        return promise;
    }

    User.prototype.GetProductByID = function (id) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.getProductByID(id);
        factoryPromise.then(function (product) {
            var tmpProduct = new Product(product);
            deferred.resolve(tmpProduct);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    User.prototype.Create = function (user) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.createProduct(user);
        factoryPromise.then(function (product) {
            //var tmpProduct = new Product(product);
            deferred.resolve(tmpProduct);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    return Product;

}]);