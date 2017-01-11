var externalModules = [
    'ui.router',
    'ngToast',
    'ui.bootstrap',
    'ngStorage',
    'ngMaterial',
    'ngAria',
    'md.data.table',
    'mdPickers'
];

var app = angular.module("MainApp", externalModules);


app.run(['$rootScope', 'ngToast', '$localStorage', '$q', '$location', '$mdToast',
    function ($rootScope, ngToast, $localStorage, $q, $location, $mdToast) {
        $rootScope.PageTitle = "Start";
        $rootScope.currentState = null;
        $rootScope.activeStates = [];

        $rootScope.User = null;

        $rootScope.serverPath = window.location.hostname + ":3000";
        $rootScope.serverUrl = "http://192.168.0.102:3003";


        $rootScope.isAuthenticated = function () {
            if ($localStorage.Data && $localStorage.Data.User && $localStorage.Data.User != $rootScope.User) {
                $rootScope.User = $localStorage.Data.User;
            }
            return $rootScope.User != null;
        };

        //ngToast.showSuccess = function (msg) {
        //    this.create({
        //        content: msg,
        //        className: 'success',
        //        dismissButton: true,
        //        animation: 'fade',
        //        verticalPosition: 'bottom',
        //        horizontalPosition: 'left'
        //    });
        //};
        //
        //ngToast.showError = function (msg) {
        //    this.create({
        //        content: msg,
        //        className: 'danger',
        //        dismissButton: true,
        //        animation: 'fade',
        //        verticalPosition: 'bottom',
        //        horizontalPosition: 'left'
        //    });
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

