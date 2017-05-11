var lwjui = angular.module("myApp", []);
lwjui.controller('myCtrl', ['$scope', function($scope) {
    $scope.value="内容"
}]);


lwjui.directive("uiValidate",function(){
    return {
        restrict:"E",
        scope:{},
        require:'ngModel',
        link:function(){

        }
    }
});
