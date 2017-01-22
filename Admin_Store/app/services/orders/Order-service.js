app.service("Order", ['OrderFactory', '$rootScope', '$q', function (OrderFactory, $rootScope, $q) {
    var Order = function (data) {
        this._id = null;
        this.Name = null;
        this.CreatedOn = new Date();
        if (angular.isDefined(data) == true) {
            angular.extend(this, data);
        }
    };


    Order.prototype.GetAll = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = OrderFactory.getAll();
        factoryPromise.then(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i] = new Order(data[i]);
                data[i].CreatedOn = new Date(data[i].CreatedOn);
            }
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };

    Order.prototype.GetOrderByID = function (id) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var factoryPromise = OrderFactory.getOrderByID(id);
        factoryPromise.then(function (order) {
            var tmpOrder = new Order(order.data);
            tmpOrder.CreatedOn = new Date(tmpOrder.CreatedOn);
            deferred.resolve(tmpOrder);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };



    return Order;


}])
;