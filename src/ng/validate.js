var lwjui = angular.module("myApp", []);
lwjui.controller('myCtrl', ['$scope', function($scope) {
    $scope.validateDate={
        errorClass:null,
        errorElement:null
    }
    $scope.value=""
}]);


lwjui.directive("uiValidate",function(){
    return {
        restrict:"E",
        scope:{
            config:"@validateconf"
        },
        require:'ngModel',
        transclude:true,
        link:function(scope, element, attr){
            console.log(element)
            var config = angular.fromJson(scope.config);
            element.validate({
                errorElement: config.errorElement||"label",
                errorClass: config.errorClass||"validate_error",
                //未通过验证时样式
                highlight:function(el){
                    $(el).addClass(config.errorClass||"validate_error")
                },
                success:function(el){
                    $(el).removeClass(config.errorClass||"validate_error")
                },
                //验证通过时运行的函数，提交表单
                submitHandler:function(form){
                    //console.log("提交表单");
                    form.submit();
                }
            })
        }
    }
});
