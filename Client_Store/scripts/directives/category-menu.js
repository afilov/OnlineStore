"use strict";

app.directive('categoryMenu', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "../views/category-menu.html"
    }
});
