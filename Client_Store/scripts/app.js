var externalModules = [
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'ngMaterial',
    'ngAria',
    'md.data.table'
];

var app = angular.module("clientApp", externalModules);


app.run(['$rootScope', '$localStorage', '$q', '$location', '$mdToast',
    function ($rootScope, ngToast, $localStorage, $q, $location, $mdToast) {
        $rootScope.PageTitle = "Start";
        $rootScope.currentState = null;
        $rootScope.activeStates = [];

        $rootScope.User = null;

        $rootScope.serverPath = window.location.hostname + ":3000";
        $rootScope.serverUrl = "http://192.168.0.102:3003";


        //$rootScope.isAuthenticated = function () {
        //    if ($localStorage.Data && $localStorage.Data.User && $localStorage.Data.User != $rootScope.User) {
        //        $rootScope.User = $localStorage.Data.User;
        //    }
        //    return $rootScope.User != null;
        //};

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

