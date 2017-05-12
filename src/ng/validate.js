var lwjui = angular.module("myApp", [])
    // 缺少form状态
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
            // *
            var config = angular.fromJson(scope.config);
            var regConfig=config.errorClass||"validate_error";
            var validator=element.validate({
                errorElement:config.errorElement||"label",
                errorClass: regConfig,
                //未通过验证时样式
                highlight:function(el){
                    $(el).addClass(regConfig)
                },
                success:function(el){
                    $(el).removeClass(regConfig)
                },
                //验证通过时运行的函数，提交表单
                submitHandler:function(form){
                    //console.log("提交表单");
                    //*form.submit();
                }
            });

            //* 重置表单
            $("[reset-validate]").click(function(){
                element.find("input[type='text'],input[type='password'],input[type='number'],input[type='tel']," +
                    "input[type='time'],input[type='email'],input[type='url'],textarea").val("");
                $("select option:first").prop("selected","selected");
                validator.resetForm();

            })
        }
    }
});


