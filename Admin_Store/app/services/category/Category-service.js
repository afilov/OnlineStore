app.service("Category", ['CategoryFactory', '$rootScope', '$q', function (CategoryFactory, $rootScope, $q) {
    var Category = function (data) {
        this._id = null;
        this.Name = null;
        this.CreatedOn = new Date();
        if (angular.isDefined(data) == true) {
            angular.extend(this, data);
        }
    };


    Category.prototype.GetAllCategories = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = CategoryFactory.getAllCategories();
        factoryPromise.then(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i] = new Category(data[i]);
                data[i].CreatedOn = new Date(data[i].CreatedOn);
            }
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    Category.prototype.GetCategoryByID = function (id) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = CategoryFactory.getCategoryByID(id);
        factoryPromise.then(function (category) {
            var tmpCategory = new Category(category.data);
            tmpCategory.CreatedOn = new Date(tmpCategory.CreatedOn);
            deferred.resolve(tmpCategory);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    Category.prototype.CreateCategory = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = CategoryFactory.createCategory(this);
        factoryPromise.then(function (category) {
            var tmpCategory = new Category(category);
            deferred.resolve(tmpCategory);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    Category.prototype.UpdateCategory = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = CategoryFactory.updateCategory(this);
        factoryPromise.then(function (category) {
            var tmpCategory = new Category(category);
            deferred.resolve(tmpCategory);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    Category.prototype.DeleteCategory = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = CategoryFactory.deleteCategory(this._id);
        factoryPromise.then(function (data) {
            $rootScope.showActionToast(data.data.Name + ' has been deleted!');
            deferred.resolve(data.data);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    return Category;


}])
;