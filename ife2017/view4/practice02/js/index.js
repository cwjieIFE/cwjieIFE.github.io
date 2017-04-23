/**
 * Created by cuiwujie on 2017/4/1.
 */
    //获取的ID值
/*trim 功能：去除空格，
 意义：防止书写式的意外产生空格，从而导致获取不到对象
 * str 要处理的字符串
 * [type]   l  左边
 r  右边
 b   左右两边
 all 全部的
 传入的值加[]表示——可以传值，也可以不传值（注释时表示）
 */
/*4*/
function trim(str,type){
    var type=type||"b";
    /*判断需要去除空格的情况*/
    if(type=="l"){
        return str.replace(/^\s*/g,"");//去除左边的空格
    }else if(type=="r"){
        return str.replace(/\s*$/g,"");//去除右边的空格
    }else if(type=="b"){
        return str.replace(/^\s*|\s*$/g,"");//去除左右边的空格
    }else if(type=="all"){
        return str.replace(/\s*/g,"");//去除全部空格
    }
}

function validate(){

}

validate.prototype = function(){


}






