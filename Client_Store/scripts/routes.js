app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {


        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('Home', {
                url: '/home',
                views: {
                    '@': {
                        templateUrl: '../views/home.html',
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
            .state('Products', {
                url: '/products',
                views: {
                    '@': {
                        templateUrl: '../views/products.html',
                        controller: 'ProductManagementCtrl'
                    }
                }
            })
            .state('Product_Details', {
                url: '/product/:id',
                views: {
                    '@': {
                        templateUrl: '../views/product-details.html',
                        controller: 'ProductDetailsCtrl'
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
            //.state('Shopping_Cart', {
            //    url: '/shopcart',
            //    views: {
            //        '@': {
            //            templateUrl: '../Templates/shopping_cart.html',
            //            controller: 'ShopCartCtrl'
            //        }
            //    }
            //})
            


    }]);