app.service("Product", ['ProductFactory', '$rootScope', '$q', function (ProductFactory, $rootScope, $q) {
    var Product = function (data) {
        this._id = null;
        this.Name = null;
        this.Price = null;
        this.Description = null;
        this.CategoryId = null;
        this.ImageURL = null;
        this.FileId = null;
        this.VAT = null;
        this.CreatedOn = new Date();
        if (angular.isDefined(data) == true) {
            angular.extend(this, data);
        }
    };


    Product.prototype.GetAllProducts = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.getAllProducts();
        factoryPromise.then(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i] = new Product(data[i]);
                data[i].CreatedOn = new Date(data[i].CreatedOn);
            }
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    Product.prototype.GetProductByID = function (id) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.getProductByID(id);
        factoryPromise.then(function (product) {
            var tmpProduct = new Product(product.data);
            tmpProduct.CreatedOn = new Date(tmpProduct.CreatedOn);
            deferred.resolve(tmpProduct);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    Product.prototype.CreateProduct = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.createProduct(this);
        factoryPromise.then(function (product) {
            var tmpProduct = new Product(product);
            deferred.resolve(tmpProduct);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    Product.prototype.UpdateProduct = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.updateProduct(this);
        factoryPromise.then(function (product) {
            var tmpProduct = new Product(product);
            deferred.resolve(tmpProduct);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    Product.prototype.DeleteProduct = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.deleteProduct(this._id);
        factoryPromise.then(function (data) {
            $rootScope.showActionToast(data.data.Name +' has been deleted!');
            deferred.resolve(data.data);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    return Product;


}])
;