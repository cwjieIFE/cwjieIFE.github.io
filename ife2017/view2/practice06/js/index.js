/**
 * Created by cuiwujie on 2017/3/29.
 */
function Stackstart(element, objdata) {
    var Stack = new Stacks(element, objdata);
    Stack.init(Stack);
}
var  Stacks = function(element,data){
    this.element = element;
    this.data = data
    //输入
        this.input_container = document.getElementById('input_container'),
        this.left_in = document.getElementById('left_in'),
        this.right_in = document.getElementById('right_in'),
        this.left_out = document.getElementById('left_out'),
        this.right_out = document.getElementById('right_out'),
        this.list = document.getElementById('list'),
        this.input_search = document.getElementById('input-search'),
        this.search = document.getElementById('input_search'),

        this.data_content = document.querySelector('.content ul');
}
Stacks.prototype = {
    init:function(obj){
        if(this.data.length>0){
            var data=this.data;
            var _this=this;
            var str="";
            data.forEach(function(value,index){
                var node =_this._createItemElement(value);
                _this.element.appendChild(node);
            });
        }else{
            alert('初始化列表出错，列表格式错误');
            console.error('初始化列表出错，列表格式错误');
            return false;
        }

        this.initEvent(obj);
    },
    //注册监听事件
    initEvent:function(obj){
        this.left_in .addEventListener('click',function(){
            var data =obj.getInputValue(obj.input_container);
            obj._unshift(obj.data_content,data, obj.data);
        }),
        this.right_in.addEventListener('click',function(){
            var data =obj.getInputValue(obj.input_container);
            obj._push(obj.data_content,data,obj.data);
        }),
        this.left_out.addEventListener('click',function(){
            obj._shift(obj.data_content,obj.data);
        }),
        this.right_out.addEventListener('click',function(){
            obj._pop(obj.data_content,obj.data);
        }),
        this.data_content.addEventListener('click',function(e){
            if(e.target && e.target.nodeName.toUpperCase() == "LI") {
                var  index;
                var datalist = this.children;
                for(var i = 0; i < datalist.length; i++){
                    if(datalist[i] == e.target){
                        index = i;
                        break;
                    }
                }
                if(index >= 0){
                    //移除数组数组元素
                    obj.data.splice(index,1);
                    //移除HTML代码
                    obj.data_content.removeChild(e.target);
                    alert('移除元素内数值为 ' + e.target.innerText + ', 位置为为 ' + (++index));
                }else{
                    alert('移除元素失败');
                    console.error('移除元素失败');
                }
            }
        }),
        this.search.addEventListener('click',function(){

            var inputSearchContent = obj.input_search.value;
            if(inputSearchContent===""){
                alert("您还尚未输入查询的内容！");
            }else{
                var liList = obj.data_content.children;
                for(var i= 0, len=liList.length; i<len; i++){
                    if(liList[i].innerText.indexOf(inputSearchContent) > -1){
                        liList[i].style.backgroundColor = "#aaaaaa";
                    }else {
                        liList[i].style.backgroundColor = "red";
                    }
                }
            }

        })
    },
    getInputValue:function(element){
        var value =element.value;

        //划分数组
        var array = value.split(/[,，、 \n\t\r]+/);

        var  data = Number(element.value);

        var finalArray = [];

        for(var i= 0, len=array.length; i<len; i++){
            if(array[i].trim() !== ""){
                finalArray.push(array[i]);
            }
        }
        if(finalArray.length){
            return finalArray;
        }else {
            alert("您的输入里没有可提取的内容！");
            return false;
        }
    },
    //左侧进入
    _unshift:function(element,data,data_queue) {
        var _this=this;
        if(data){
            data.forEach(function(value,index){
                data_queue.unshift(value);
                var node = _this._createItemElement(value);
                element.insertBefore(node,element.getElementsByTagName('li')[0]);
            });
            return data_queue;
        }
        return data_queue;
    },
    //右侧进入
    _push:function(element,data,data_queue) {
        var _this=this;
        if(data){
            data.forEach(function(value,index) {
                data_queue.push(value);
                var node = _this._createItemElement(value);
                element.appendChild(node);
            });

            return data_queue;
        }
        return data_queue;
    },
    //左侧移除
    _shift:function(element,data_queue){
        if(data_queue.length<=0){
            alert('列表已空，移除失败');
            console.error('列表已空，移除失败');
            return data_queue;
        }else{
            alert('移除的元素内数值为: ' + data_queue[0]);
            data_queue.shift();
            element.removeChild(element.children[0]);
            return data_queue;
        }
    },
    _pop:function(element,data_queue){
        var length= data_queue.length
        if(length<=0){
            alert('列表已空，移除失败');
            console.error('列表已空，移除失败');
            return data_queue;
        }else{
            console.log(data_queue[length - 1]);
            alert('移除的元素内数值为: ' + data_queue[length - 1]);
            data_queue.pop();
            element.removeChild(element.children[length - 1]);
            return data_queue;
        }
    },
    _createItemElement:function(data) {
        var node = document.createElement("li");
        node.className = "data-list__item";
        node.innerText = data;
        node.setAttribute("data-num",data);
        return node;
    }

}
window.onload = function() {
    var  data= ['10','2','7','12','13'];
    var list = document.getElementById('list')
    Stackstart(list, data)
};
