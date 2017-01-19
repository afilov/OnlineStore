"use strict";

app.directive('navigationMenu', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "../views/navigation-menu.html",
        controller: 'MainCtrl'
    }
});
