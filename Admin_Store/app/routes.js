app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {



        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('Home', {
                url: '/home',
                menuGroup: 'dashboard',
                menuTitle: 'Home',
                views: {
                    '@': {
                        templateUrl: 'app/scripts/default-page/default-page.view.html',
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('Users_Login', {
                url: '^/login',
                views: {
                    '@': {
                        templateUrl: 'app/scripts/login-page/login-page.view.html',
                        controller: 'UserLoginCtrl'
                    }
                }
            })
            .state('Product_List', {
                url: '^/products',
                menuGroup: 'management',
                menuTitle: 'Products',
                menuOrder: 1,
                views: {
                    '@': {
                        templateUrl: 'app/scripts/product-page/product-list.view.html',
                        controller: 'ProductListCtrl'
                    }
                }
            })
            .state('Product_Details', {
                url: '^/product/:id',
                parent: 'Product_List',
                views: {
                    '@': {
                        templateUrl: 'app/scripts/product-page/product-details.view.html',
                        controller: 'ProductDetailsCtrl'
                    }
                }
            })
            .state('Product_New', {
                url: '^/products/new',
                parent: 'Product_List',
                views: {
                    '@': {
                        templateUrl: 'app/scripts/product-page/product-details.view.html',
                        controller: 'ProductDetailsCtrl'
                    }
                }
            })
            .state('Category_List', {
                url: '^/categories',
                menuGroup: 'management',
                menuTitle: 'Categories',
                menuOrder: 1,
                views: {
                    '@': {
                        templateUrl: 'app/scripts/category/category-list.view.html',
                        controller: 'CategoryListCtrl'
                    }
                }
            })
            .state('Category_Details', {
                url: '^/categories/:id',
                parent: 'Category_List',
                views: {
                    '@': {
                        templateUrl: 'app/scripts/category/category-details.view.html',
                        controller: 'CategoryDetailsCtrl'
                    }
                }
            })
            .state('Category_New', {
                url: '^/categories/new',
                parent: 'Category_List',
                views: {
                    '@': {
                        templateUrl: 'app/scripts/category/category-details.view.html',
                        controller: 'CategoryDetailsCtrl'
                    }
                }
            })
            .state('Paypal', {
                url: '^/paypal/settings',
                menuGroup: 'paypal',
                menuTitle: 'Paypal',
                views: {
                    '@': {
                        templateUrl: 'app/scripts/paypal/paypal.view.html',
                        controller: 'PaypalCtrl'
                    }
                }
            })
            .state('Order_Details', {
                parent: 'Paypal',
                url: '^/paypal/order/:orderid',
                views: {
                    '@': {
                        templateUrl: 'app/scripts/paypal/paypal.view.html',
                        controller: 'PaypalCtrl'
                    }
                }
            })
            .state('Settings', {
                url: '^/settings/account',
                menuGroup: 'settings',
                menuTitle: 'Settings',
                views: {
                    '@': {
                        templateUrl: 'app/scripts/settings/settings.view.html',
                        controller: 'SettingsCtrl'
                    }
                }
            });


        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.Data && $localStorage.Data.Token && config.url.endsWith('.html') == false) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.Data.Token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $localStorage.Data = null;
                    }
                    return $q.reject(response);
                }
            };
        }]);

    }]);