/**
 * Created by cuiwujie on 2017/4/1.
 */
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
    var regex1 = /^\s*/;
    var regex2 = /\s*$/;
    return (str.replace(regex1, "")).replace(regex2, "");
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener, isCorrect) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, isCorrect);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

var validate = {
    //将name中的所有中文字符替换（1中文字符长度=2英文字符长度）
    nameVali: function (input, status) {
        var chineseRegex = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
        var lenRegex = /^.{4,16}$/;
        var handledInput = (input.value).replace(chineseRegex, "00");
        if (handledInput.length == 0) {
            this.wrongMessage(input, status, "名称不能为空")
        }
        else if (!lenRegex.test(handledInput)) {
            this.wrongMessage(input, status, "长度为4~16个字符");
        }
        else {
            this.correctMessage(input, status, "名称格式正确");
        }
    },

    //密码验证
    passwordVali: function (input, status) {
        var repasswordInput = document.querySelector('input[name="repassword"]');
        var repasswordStatus = (repasswordInput.parentElement.nextElementSibling) || (repasswordInput.parentElement.nextSibling);
        if (input.value.length < 8 || input.value.length > 20) {
            this.wrongMessage(input, status, "密码不可用");
        }
        else {
            this.correctMessage(input, status, "密码可用");
        }
        this.repasswordVali(repasswordInput, repasswordStatus);
    },

    //再次输入的密码验证
    repasswordVali: function (input, status) {
        var password = document.querySelector('input[name="password"]').value;
        if (input.value !== password) {
            this.wrongMessage(input, status, "密码输入不一致");
        }
        else if (input.value.length < 8 || input.value.length > 20) {
            this.wrongMessage(input, status, "长度为8~20个字符");
        }
        else {
            this.correctMessage(input, status, "密码输入一致");
        }
    },

    // 判断是否为邮箱地址
    // 第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
    // 第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
    // 而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
    emailVali: function (input, status) {
        var regex = /^([\w-*\.*]+)@([\w-]+)((\.[\w-]{2,4}){1,2})$/;
        if (regex.test(input.value)) {
            this.correctMessage(input, status, "邮箱格式正确");
        }
        else {
            this.wrongMessage(input, status, "邮箱格式错误");
        }
    },

    // 判断是否为手机号
    telephoneVali: function (input, status) {
        var regex = /^1[0-9]{10}$/;
        if (regex.test(input.value)) {
            this.correctMessage(input, status, "手机格式正确");
        }
        else {
            this.wrongMessage(input, status, "手机格式错误");
        }
    },

    correctMessage: function (input, status, targetStr) {
        input.className = "correctInput";
        status.className = "status correctSta";
        status.innerHTML = targetStr;
    },

    wrongMessage: function (input, status, targetStr) {
        input.className = "wrongInput";
        status.className = "status wrongSta";
        status.innerHTML = targetStr;
    }

}

var events = {
    submit: function (e) {
        var inputArray = document.getElementsByTagName("input");
        inputArray = [].slice.call(inputArray, 0);      //important !!
        var isCorrect = true;
        console.log(inputArray);
        for (var cur in inputArray) {
            if (inputArray[cur].className !== "correctInput") {
                isCorrect = false;
                break;
            }
        }
        if (isCorrect) {
            alert("提交成功");
        }
        else alert("提交失败");
    },

    inputFocus: function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === "input") {
            target.className = 'inputFocus';
            var status = (target.parentElement.nextElementSibling) || (target.parentElement.nextSibling);
            status.style.display = "block";
        }
    },

    inputBlur: function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === "input") {
            var status = (target.parentElement.nextElementSibling) || (target.parentElement.nextSibling);
            switch (target.name) {
                case "name":
                    validate.nameVali(target, status);
                    break;
                case "password":
                    validate.passwordVali(target, status);
                    break;
                case "repassword":
                    validate.repasswordVali(target, status);
                    break;
                case "email":
                    validate.emailVali(target, status);
                    break;
                case "tel":
                    validate.telephoneVali(target, status);
                    break;
                default: break;
            }
        }
    }
}


var form = document.getElementById("form-container");
var button = document.getElementById("submit");
addEvent(form, "focus", events.inputFocus, true);
addEvent(form, "blur", events.inputBlur, true);
addEvent(button, "click", events.submit, false);