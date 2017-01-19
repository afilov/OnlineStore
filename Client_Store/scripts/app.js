var externalModules = [
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'ngMaterial',
    'ngAria',
    'md.data.table',
    'angular-carousel'
];

var app = angular.module("clientApp", externalModules);


app.run(['$rootScope', '$localStorage', '$q', '$location', '$mdToast',
    function ($rootScope, ngToast, $localStorage, $q, $location, $mdToast) {
        $rootScope.PageTitle = "Start";
        $rootScope.currentState = null;
        $rootScope.activeStates = [];

        $rootScope.User = null;
        $rootScope.serverUrl = "http://192.168.0.104:3003";


        $rootScope.isAuthenticated = function () {
           if ($localStorage.UserData && $localStorage.UserData && $localStorage.UserData != $rootScope.User) {
               $rootScope.User = $localStorage.UserData;
           }
           return $rootScope.User != null;
        };

        $rootScope.showActionToast = function (Text) {
            var toast = $mdToast.simple()
                .textContent(Text)
                .position("top right");
            $mdToast.show(toast);
        };
        $rootScope.Refresh = function () {
            location.reload();
        };
    }]);

