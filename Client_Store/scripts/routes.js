app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {



        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('Home', {
                url: '/home',
                views: {
                    '@': {
                        templateUrl: '../Templates/home.html',
                        controller: 'MainCtrl'
                    }
                }
            })



    }]);