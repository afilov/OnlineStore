var externalModules = [
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'ngMaterial',
    'ngAria',
    'md.data.table',
    'angular-carousel',
    'facebook'
];

var app = angular.module("clientApp", externalModules);

app.config(['FacebookProvider',
    function (FacebookProvider) {
        FacebookProvider.init("388433148171010");

    }]);


app.run(['$rootScope', '$localStorage', '$q', '$location', '$mdToast', '$state',
    function ($rootScope, $localStorage, $q, $location, $mdToast, $state) {
        $rootScope.PageTitle = "Start";
        $rootScope.currentState = null;
        $rootScope.activeStates = [];

        $rootScope.User = null;
        $rootScope.serverUrl = "http://192.168.0.101:3003";


        $rootScope.isAuthenticated = function () {
            if ($localStorage.UserData && $localStorage.UserData && $localStorage.UserData != $rootScope.User) {
                $rootScope.User = $localStorage.UserData;
            }

            return $rootScope.User != null;
        };

        $rootScope.getParameterByName = function (name) {
            url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        };

        $rootScope.Logout = function () {
            $localStorage.UserData = null;
            $rootScope.User = null;
            $state.go("Login");
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

