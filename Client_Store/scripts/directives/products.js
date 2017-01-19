"use strict";

app.directive('products', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "../views/products.html",
        link: function (scope, element, attrs) {

        }
    }
});
