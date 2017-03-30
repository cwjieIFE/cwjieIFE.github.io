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
    this.input_container = document.getElementById('input_container'),
        this.left_in = document.getElementById('left_in'),
        this.right_in = document.getElementById('right_in'),
        this.left_out = document.getElementById('left_out'),
        this.right_out = document.getElementById('right_out'),
        this.sort_btn = document.getElementById('sort_btn'),
        this.list = document.getElementById('lists'),
        this.data_content = document.querySelector('.content .lists');
}
Stacks.prototype = {
    init:function(obj){
        var data=this.data;
        var _this=this;
        var str="";
        data.forEach(function(value,index){
            var node =_this._createItemElement(value);
            _this.element.appendChild(node);
        });
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
            if(e.target && e.target.nodeName.toUpperCase() == "DIV") {
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
        this.sort_btn.addEventListener('click',function(){
            obj.data = obj._bubbleSort(obj.data);
            console.log(obj.data);

            //清空
            obj.data_content.innerHTML="";
            obj.data.forEach(function(value,index){
                var node =obj._createItemElement(value);
                obj.element.appendChild(node);
            });

        })
    },
    getInputValue:function(element){
        var  data = Number(element.value);
        if(!data){
            alert('请在输入框内填入数据');
            console.error('请在输入框内填入数据');
            return null;
        }else{
            if(data>=10&&data<=100){
                return data;
            }else{
                alert("不再输入范围！");
            }
        }
    },
    //左侧进入
    _unshift:function(element,data,data_queue) {
        if(data){
            data_queue.unshift(data);
            console.log(data_queue);
            if(this._judgeLength(data_queue)){
                var node = this._createItemElement(data);
                element.insertBefore(node,element.getElementsByTagName('div')[0]);
                return data_queue;
            }else{
                alert('队列数量最多60个');
            }
            }



        return data_queue;
    },
    //右侧进入
    _push:function(element,data,data_queue) {
        if(data){
            data_queue.push(data);
            if(this._judgeLength(data_queue)){
                var node = this._createItemElement(data);
                element.appendChild(node);
                return data_queue;
            }else{
                alert('队列数量最多60个');
            }

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

            alert('移除的元素内数值为: ' + data_queue[length - 1]);
            data_queue.pop();
            element.removeChild(element.children[length - 1]);
            return data_queue;
        }
    },
    _judgeLength:function(data_queue){
        if(data_queue.length>60){
            return false
        }else{
            return true;
        }
    },
    _createItemElement:function(data) {
        var node = document.createElement("div");
        node.innerText = data;
        node.setAttribute("data-num",data);
        node.style.height = data + 'px';
        return node;
    },
    _bubbleSort:function(arr){
        var flag=true;//设置标志位
        var nums=arr.length;
        for(var i=nums;i>=2&&flag;i--){
            flag=false;//如果一次交换能都没有过，则说明冒泡排序已结束
            for(var j=0;j<i-1;j++){
                if(arr[j]>arr[j+1]){
                    flag=true;
                    this.swap(arr,j,j+1);
                }
            }
        }
        return  arr;
    },
    swap:function(arr,index1,index2){
        var temp=arr[index1];
        arr[index1]=arr[index2];
        arr[index2]=temp;
    }

}
window.onload = function() {
    var  data= [];
    var list = document.getElementById('lists')
    Stackstart(list, data)
};
