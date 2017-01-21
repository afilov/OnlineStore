"use strict";

app.controller("MainCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$mdSidenav','UserFactory',
    function ($scope, $rootScope, $localStorage, $state, $mdSidenav, UserFactory) {
        $rootScope.PageTitle = "Online Store Admin";
        $scope.Users = [];

        $rootScope.Logout = function () {
            $localStorage.Data = null;
            $rootScope.User = null;
        };

        $scope.getAllUsers = function(){
            var promise = UserFactory.GetAll();
            promise.then(function(data){
                $scope.Users = data.data;
            })
        };
        $scope.getAllUsers();


        function BuildMainMenu() {
            if ($rootScope.mainMenu)
                return;

            $rootScope.mainMenu = [
                {
                    Title: "Dashboard",
                    Group: "dashboard",
                    CssClass: "fa fa-barcode",
                    Children: []
                },
                {
                    Title: "Product management",
                    Group: "management",
                    CssClass: "fa fa-barcode",
                    Children: []
                },
                {
                    Title: "Paypal reports",
                    Group: "paypal",
                    CssClass: "fa fa-barcode",
                    Children: []
                },
                {
                    Title: "Settings",
                    Group: "settings",
                    CssClass: "fa fa-gear",
                    Children: []
                }
            ];

            var tmpMenu = {};
            for (var i = 0; i < $rootScope.mainMenu.length; i++) {
                var tmpItem = $rootScope.mainMenu[i];
                tmpMenu[tmpItem.Group] = tmpItem;
            }

            var states = $state.get();
            for (var i = 0; i < states.length; i++) {
                var tmpState = states[i];


                if (tmpState.ChildrenStates == undefined) {
                    tmpState.ChildrenStates = [];
                }
                if (tmpState.ParentState == undefined) {
                    tmpState.ParentState = null;
                }
                if (tmpState.ParentGroup == undefined) {
                    tmpState.ParentGroup = null;
                }

                if (tmpState.menuGroup && tmpMenu[tmpState.menuGroup]) {
                    tmpState.ParentGroup = tmpMenu[tmpState.menuGroup];
                    tmpMenu[tmpState.menuGroup].Children.push(tmpState);
                }

                if (tmpState.parent) {
                    var tmpParentState = $state.get(tmpState.parent);
                    if (tmpParentState) {
                        if (tmpParentState.ChildrenStates == undefined) {
                            tmpParentState.ChildrenStates = [];
                        }

                        tmpParentState.ChildrenStates.push(tmpState);
                        tmpState.ParentState = tmpParentState;
                    }
                }
            }

            for (var i = 0; i < $rootScope.mainMenu.length; i++) {
                $rootScope.mainMenu[i].Children.sort(function (a, b) {
                    return a.Order > b.Order;
                });
            }
        }

        BuildMainMenu();


        $rootScope.SetCurrentState = function (curState) {
            $rootScope.currentState = curState;
            $rootScope.activeStates = [];

            var tmpState = curState;
            while (tmpState.ParentState != null) {
                $rootScope.activeStates.push(tmpState);
                tmpState = tmpState.ParentState;
            }

            $rootScope.activeStates.push(tmpState);

            if (tmpState.ParentGroup != null) {
                $rootScope.activeStates.push(tmpState.ParentGroup);
            }

            $rootScope.activeStates.reverse();
        };

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                $rootScope.SetCurrentState(toState);
            });


        $rootScope.IsGroupSelected = function (menuGroup) {
            return $rootScope.activeStates.indexOf(menuGroup) > -1;
        };

        $rootScope.RootMenuItemClicked = function (menuItem) {
            for (var i = 0; i < menuItem.Children.length; i++) {
                var tmpItem = menuItem.Children[i];
                $state.go(tmpItem.name);
            }

            return;
        };


        $rootScope.MenuItemClicked = function (menuItem) {
            $state.go(menuItem.name);
        };


        $rootScope.openSideNavPanel = function () {
            $mdSidenav('left').open();
        };

        $rootScope.closeSideNavPanel = function () {
            $mdSidenav('left').close();
        };

        $scope.mdSidenavIsOpen = function () {
            return $mdSidenav('left').isLockedOpen();
        };


        $rootScope.GetActiveClass = function (item) {
            if ($rootScope.currentState == item) {
                return "subactive active";
            }
            if ($rootScope.activeStates.indexOf(item) > -1) {
                return "subactive";
            }
            return "";
        };

    }]);