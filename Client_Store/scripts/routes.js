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
                parent: 'Products',
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
            .state('Shopping_Cart', {
                url: '/shopcart',
                views: {
                    '@': {
                        templateUrl: '../views/shopping_cart.html',
                        controller: 'ShopCartCtrl'
                    }
                }
            })

            .state('Shopping_Cart_Order', {
                url: '/shopcart/:orderid',
                views: {
                    '@': {
                        templateUrl: '../views/shopping_cart.html',
                        controller: 'ShopCartCtrl'
                    }
                }
            })

            .state('About_Us', {
                url: '/information',
                views: {
                    '@': {
                        templateUrl: '../views/about_us.html',
                        controller: 'MainCtrl'
                    }
                }
            });
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage',
            function ($q, $location, $localStorage) {
                return {
                    'request': function (config) {
                        config.headers = config.headers || {};
                        if ($localStorage.UserData && $localStorage.UserData.Token && config.url.endsWith('.html') == false) {
                            config.headers.Authorization = 'Bearer ' + $localStorage.UserData.Token;
                        }
                        return config;
                    },
                    'responseError': function (response) {
                        if (response.status === 401 || response.status === 403) {
                            $localStorage.UserData = null;
                            $location.path("/login");
                        }
                        return $q.reject(response);
                    }
                };
            }]);

    }]);