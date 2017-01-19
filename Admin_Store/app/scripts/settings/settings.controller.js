app.controller('SettingsCtrl', ['$rootScope', '$scope', 'User', '$localStorage', function ($rootScope, $scope, User, $localStorage) {

    $scope.rootUser = new User($rootScope.User);
    $scope.rootUser.TempPassword = null;
    $scope.updateUser = function () {
        var Password = $rootScope.User.Password;
        if ($scope.rootUser.TempPassword != null) {
            Password = $scope.rootUser.Password;
        }
        var promise = $scope.rootUser.Update(Password);
        promise.then(function (data) {
            $localStorage.Data = data.data;
            $rootScope.User = data.data;
            if ($scope.rootUser.TempPassword != null){
                $rootScope.showActionToast("User has been updated, please login again");
                $rootScope.Logout();
            }
            else {
                $rootScope.showActionToast("User has been updated");
            }
        }, function (err) {
            $scope.InvalidAuthentication = true;
        });
    };
}]);