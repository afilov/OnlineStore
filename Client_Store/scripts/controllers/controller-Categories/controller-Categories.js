"use strict";

app.controller("CategoriesCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$mdSidenav','Category',
    function ($scope, $rootScope, $localStorage, $state, $mdSidenav, Category) {

        var CategoryInstance = new Category();
        $scope.Categories = {};
        $scope.selectedCategory;



        $scope.loginUser = function () {

        };
        $scope.models = {
            selected: null,
            lists: {"A": [], "B": []}
        };

        // Generate initial model
        for (var i = 1; i <= 3; ++i) {
            $scope.models.lists.A.push({label: "Item A" + i});
            $scope.models.lists.B.push({label: "Item B" + i});
        }

        // Model to JSON for demo purpose
        $scope.$watch('models', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);


        $scope.getAll = function () {
            var promise = CategoryInstance.GetAllCategories();
            promise.then(function (data) {
                $scope.Categories = data.data;
                $scope.selectedCategory = $scope.Categories[0]._id;
            }, function (err) {
                console.log(err)
            });
        };
        $scope.getAll();

        $scope.renderProducts = function(category){
            var promise = Cat
        }

    }]);