var myApp=$("[ng-app]").attr("ng-app");
var lwjui = angular.module(myApp, [])
    .controller('myCtrl', ['$scope', function($scope) {
        $scope.formValidate=function(){
            if($scope.validate){
                var params={
                    creditcard:$scope.value,
                    email:$scope.email
                };
                $.post("127.0.0.1",params,function(){

                });
            }
        };
        /**
         * 验证不通过时显示的样式及容器
         * errorClass  类名
         * errorElement 容器元素
         */
        $scope.validateDate={
            errorClass:"test_error",
            errorElement:"label"
        };
    }])



    .directive("uiValidate",function(){
    return {
        restrict:"AE",
        require:"ngModel",
        link:function(scope, element, attr,ngModel){
            var config =scope.validateDate;
            var regConfig=config.errorClass||"validate_error";
            element.validate({
                errorElement:config.errorElement||"label",
                errorClass: regConfig,
                //未通过验证时样式
                highlight:function(el){
                    $(el).addClass(regConfig)
                },
                success:function(el){
                    $(el).removeClass(regConfig);
                },
                //验证通过时运行的函数
                submitHandler:function(form){
                    ngModel.$setViewValue(element.valid());
                }
            });

        }
    }
});


