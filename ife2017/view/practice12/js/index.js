/**
 * Created by cuiwujie on 2017/3/25.
 */
function testphone() {
    var phone = document.getElementById('phone').value;
    if(phone!="") {
        if (!(/^1[3|4|5|7|8][0-9]{9}$/g.test(phone))) {
            alert("手机号码有误，请重填");
            return false;
        } else {
            alert("手机号码填写正确");
            return true;
        }
    }else{
        alert("没有填写手机号");
        document.getElementById('phone').focus();
    }
}
function testwordRepeat() {
    var wordRepeat = document.getElementById('wordRepeat').value;
    if(wordRepeat!="") {
        if(!(/(^|\s)([a-zA-Z]+)\s+\2\b/g.test(wordRepeat))){
            alert("不重复");
            return false;
        }else {
            alert("重复");
            return true;
        }
    }else{
        alert("没有填写检测内容");
        document.getElementById('wordRepeat').focus();
    }
}