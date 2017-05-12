!(function(win,lwjui){
	'use strict';
	lwjui.validate = (function($validate){
		var validator=null;

        //重置表单
		$validate.reset=function(_this,p){
			$("[reset-validate]").click(function(){
				_this.find("input,textarea").val("");
				$("select option:first").prop("selected","selected");
				validator.resetForm();
				//清除自定义errorClass
				p.errorClass?$(_this).find(p.errorClass).removeClass(p.errorClass):$(_this).find(".validate_error").removeClass("validate_error");
			})

		};

		//组件初始化
		$validate.validateInit=function($this,p){
			p= $.extend(p);
			validator=$($this).validate({
				errorElement: p.errorElement||"label",
				errorClass: p.errorClass||"validate_error",
				//未通过验证时样式
				highlight:function(el){
					$(el).addClass(p.errorClass||"validate_error")
				},
				success:function(el){
					$(el).removeClass(p.errorClass||"validate_error")
				},
				//验证通过时运行的函数，提交表单
				submitHandler:function(form){
					//console.log("提交表单");
					form.submit();
				}
			});
			this.reset($this,p);
		};

		$validate.init=function(p){
			//自动查找form标签，需加ui-validate属性，自动注册validate验证
			$("form[ui-validate]").each(function(){
				var _this=$(this);
				$validate.validateInit(_this,p);
			});
			//为表单元素绑定事件并初始化表单验证，防止动态生成表单时无法初始化验证
			$(document).off("click","form[ui-validate]").on("click","form[ui-validate]",function(){
				var _this=$(this);
				$validate.validateInit(_this,p);
			});
		};

		return $validate;
	})({});
})(window,lwjui);


lwjui.directive('ui-validate',function(){
	return {
		uses:["plugin/validate/jquery.validate.js","plugin/validate/messages_zh.js","plugin/validate/validate_custom.js"],
		addcss:["css/formValidate.css"],
		scope:{
			errorClass:'errorClass',
			errorElement:'errorElement'
		},
		link:function(el){
			var config=el.scope,service=el.fn.validate;
			service.init(config);
		}
	}
});