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

    Product.prototype.GetImageByID = function (id) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.getImageByID(id);
        factoryPromise.then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
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

    Product.prototype.GetProductByCategoryID = function (id) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.getProductsByCategoryID(id);
        factoryPromise.then(function (allProducts) {
            var products = [];
            for (var i = 0; i < allProducts.data.length; i++) {
                var product = allProducts.data[i];
                products.push(new Product(product));
            }
            deferred.resolve(products);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };


    Product.prototype.ExecuteOrder = function (data) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.executeOrder(data);
        factoryPromise.then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };


    Product.prototype.Buy = function (quantity) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = ProductFactory.buyProduct({product:this,quantity:quantity});
        factoryPromise.then(function (paypalLink) {

            deferred.resolve(paypalLink);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    return Product;


}])
;