var externalModules = [
    'ui.router',
    'ngToast',
    'ui.bootstrap',
    'ngStorage',
    'ngMaterial',
    'ngAria',
    'md.data.table',
    'mdPickers',
    'ngFileUpload'
];

var app = angular.module("MainApp", externalModules);


app.run(['$rootScope', 'ngToast', '$localStorage', '$q', '$location', '$mdToast',
    function ($rootScope, ngToast, $localStorage, $q, $location, $mdToast) {
        $rootScope.PageTitle = "Start";
        $rootScope.currentState = null;
        $rootScope.activeStates = [];

        $rootScope.User = null;
        $rootScope.serverUrl = "http://192.168.0.101:3003";


        $rootScope.isAuthenticated = function () {
            if ($localStorage.Data && $localStorage.Data && $localStorage.Data != $rootScope.User) {
                $rootScope.User = $localStorage.Data;
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

