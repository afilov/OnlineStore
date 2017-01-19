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
            .state('Register', {
                url: '/register',
                views: {
                    '@': {
                        templateUrl: '../Templates/register.html',
                        controller: 'RegisterCtrl'
                    }
                }
            })
            .state('Categories', {
                url: '/categories',
                views: {
                    '@': {
                        templateUrl: '../Templates/categories.html',
                        controller: 'CategoriesCtrl'
                    }
                }
            })

            .state('Login', {
                url: '/login',
                views: {
                    '@': {
                        templateUrl: '../Templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('Shopping_Cart', {
                url: '/shopcart',
                views: {
                    '@': {
                        templateUrl: '../Templates/shopping_cart.html',
                        controller: 'ShopCartCtrl'
                    }
                }
            })
            


    }]);