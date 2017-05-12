var lwjui = angular.module("myApp", [])

    .controller('myCtrl', ['$scope', function($scope) {
    $scope.validateDate={
        errorClass:null,
        errorElement:null
    };
    $scope.value="";
    $scope.formValidate="";
    }])

    .directive("uiValidate",function(){
    return {
        restrict:"AE",
        scope:{
            config:"=validateconf"
        },
        require:'ngModel',
        link:function(scope, element, attr){
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


