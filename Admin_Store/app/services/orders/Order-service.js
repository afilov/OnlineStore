app.service("Order", ['OrderFactory', '$rootScope', '$q', function (OrderFactory, $rootScope, $q) {
    var Order = function (data) {
        this._id = null;
        this.Name = null;
        this.UserId = null;
        this.Completed = null;
        this.ProductId = null;
        this.CartProducts = [];
        this.Product = {};
        this.PayPalId = {};
        this.Total = null;
        this.Quantity = null;
        this.PaymentLinks = [];
        this.DateCreated = new Date();
        this.DateCompleted = null;
        this.DateConfirmed = new Date();
        this.Confirmed = false;
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
                data[i].DateCreated = new Date(data[i].DateCreated);
                if (data[i].DateCompleted == null) {
                    data[i].DateCompleted = new Date(data[i].DateCompleted);
                }
                if (data[i].DateConfirmed == null) {
                    data[i].DateConfirmed = new Date(data[i].DateConfirmed);
                }
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
            tmpOrder.DateCreated = new Date(tmpOrder.DateCreated);
            if (tmpOrder.DateCompleted == null) {
                tmpOrder.DateCompleted = new Date(tmpOrder.DateCompleted);
            }
            if (tmpOrder.DateConfirmed == null) {
                tmpOrder.DateConfirmed = new Date(tmpOrder.DateConfirmed);
            }
            deferred.resolve(tmpOrder);
        }, function (err) {
            deferred.reject(err);
        });
        return promise;
    };


    return Order;


}])
;