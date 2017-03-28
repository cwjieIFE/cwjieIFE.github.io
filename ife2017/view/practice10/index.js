function Vue(obj) {
    // 参数判断
    if (typeof obj === 'object') {
        this.DOM = this.$(obj.el);
        this.data = obj.data;
        this.dataRendering();
    }
    else {
        throw 'data type must object.';
    }
}
//仿JQuery
Vue.prototype.$= function (selector,obj){
    var obj=obj||document;
    /*如果输入为空，则返回。*/
    if(!selector){
        return;
    }
    /*判断输入的参数*/
    if(typeof selector=="string")
    {
        var selector=this.trim(selector);
        if(selector.charAt(0)==".")
        {
            return getClass(selector.substr(1),obj);
        } else if(selector.charAt(0)=="#")
        {
            return document.getElementById(selector.substr(1));
        } else if(/^[a-z][a-z1-6]{0,10}$/.test(selector)){
            return obj.getElementsByTagName(selector);
        }else if(/^<[a-z][a-z1-6]{0,10}>$/.test(selector) )
        {
            return	document.createElement(selector.slice(1,-1) );
        }
    }else {
        throw 'El must be string.';
    }

}

//去空格
Vue.prototype.trim  = function(str,type){
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
//匹配加载渲染数据
Vue.prototype.dataRendering = function () {
    if (this.DOM) {
        var Text = this.DOM.innerHTML;
        (function (obj) {
            //全局正则匹配{{}}
            var rep = /\{{2}(.*)\}{2}/g;
            do {
                var tempRander = rep.exec(Text);
                if (tempRander) {
                    var key ='obj.data.' + tempRander[1];
                    Text = Text.replace(tempRander[0], eval(key));
                }
            } while (tempRander);
            if (Text) {
                obj.DOM.innerHTML = Text;
            }
        })(this);
    }
};
let app = new Vue({
    el: '#app',
    data: {
        user: {
            name: 'cwjie',
            age: 26
        }
    }
});