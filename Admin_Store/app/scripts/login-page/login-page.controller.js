"use strict";

app.controller('UserLoginCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$localStorage',
    function ($scope, $state, $stateParams, $rootScope, $localStorage) {
        $rootScope.PageTitle = "Login";
        $scope.User = {
            Username: "",
            Password: ""
        };

        $scope.InvalidAuthentication = false;


        $scope.Login = function () {
            //var promise = NixUserHelper.Authenticate($scope.User);
            //promise.then(function (res) {
            //    if (res.data){
            //        $localStorage.NixERPData = res.data;
            //        socket.connect();
            //        $state.go("Home");
            //    }
            //},function(res){
            //    $scope.Error = res.data;
            //    $scope.InvalidAuthentication = true;
            //});
            if ($scope.User.Username == 'test') {
                var tmp = 2;
                var tmpObj = {
                    Token: tmp,
                    User: $scope.User
                };
                $localStorage.Data = tmpObj;
                //$localStorage.Data.User ;
                $state.go("Home");
            }
            else
                $scope.InvalidAuthentication = true;
        };
    }
]);
