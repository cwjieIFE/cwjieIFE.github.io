/**
 * Created by cuiwujie on 2017/3/29.
 */



function orderfunction(element, objdata) {
    var order = new orders(element, objdata);
    order.init(order);
}
var orders = function(element,root){
    this.element = element;
    this.root = root;
    this.arr = [];
    this.current;
    this.timer;
    this.input_container= document.getElementById('input_container');
    this.pre = document.getElementById('pre');
    this.flagConfig;
    this.rootRadio;
    this.currentNode;
    this.post = document.getElementById('pre');
    this.pre = document.getElementById('post');
    this.search = document.getElementById('search');
    this.delete = document.getElementById('delete');
    this.add = document.getElementById('add');


    this.preradio = document.getElementById('preradio');
    this.postradio = document.getElementById('postradio');


}
orders.prototype = {
    init:function(obj){
        var _this=this;
        if (obj.arr.length>0){
            obj.current.style.backgroundColor = '#fff';
            obj.arr = [];
            clearTimeout(obj.timer);
        }
        if(this.preradio.checked){
            _this.rootRadio =true;
        }else{
            _this.rootRadio =false;
        }
        this.initEvent(obj);
    },
    initEvent:function(obj){
        this.pre.addEventListener('click',function(){
            obj.reset(obj);
            obj.preOrder(obj.root);
            obj.flagConfig="pre";
            console.log()
            obj.showOut();
        });
        this.post.addEventListener('click',function(){
            obj.reset(obj);
            obj.postOrder(obj.root);
            obj.flagConfig="post";
            obj.showOut();
        });
        this.search.addEventListener('click',function(){
            obj.reset(obj);
            if(obj.rootRadio){
                obj.preOrder(obj.root);
            }else{
                obj.postOrder(obj.root);
            }
            obj.flagConfig="search";
            obj.showOut();
        });
        this.root.addEventListener('click',function(e){
            var e=event||window.event;
            var node=e.target||e.srcElement;
            if (node.style.backgroundColor!="red") {
                obj.currentNode=node;
                console.log('11',obj.currentNode)
                obj.resetColor(obj);
                node.style.backgroundColor="red";
            } else{
                node.style.backgroundColor="#fff";
            };
        });
        this.delete.addEventListener('click',function(){

            if(obj.currentNode && obj.currentNode.style.backgroundColor == "red"){
                obj.currentNode.parentNode.removeChild(obj.currentNode);
                objj.currentNode = null;
            }else{
                alert("请选定您要删除的节点");
            }


        });
        this.add.addEventListener('click',function(){
            if(obj.currentNode && obj.currentNode.style.backgroundColor == "red"){
                var data  = obj.getInputValue(obj.input_container);
                var div = document.createElement("div");
                div.appendChild(document.createTextNode(data));
                obj.currentNode.appendChild(div);
            }else{
                alert("请选定您要增加节点的父节点");
            }
        })
    },
    preOrder:function(){
        var _this=this;
        function startTra(parentNode){
            _this.arr.push(parentNode);
            var sonNodes=parentNode.childNodes;
            for(var i in sonNodes)
            {
                if(sonNodes[i].nodeType===1)
                    startTra(sonNodes[i]);
            }
        }
        startTra(this.root);
    },
    inOrder:function(){
        var j=0;
        var _this=this;
        function startTra(parentNode){
            var sonNodes=parentNode.childNodes;
            for(var i in sonNodes)
            {
                if(sonNodes[i].nodeType===1)
                    startTra(sonNodes[i]);
            }
            _this.arr.push(parentNode);
        }
        startTra(_this.root);
    },
    postOrder:function(node){
        var j=0;
        var _this=this;
        function startTra(parentNode){
            var sonNodes=parentNode.childNodes;
            for(var i in sonNodes)
            {
                if(sonNodes[i].nodeType===1)
                    startTra(sonNodes[i]);
            }
            _this.arr.push(parentNode);
        }
        startTra(_this.root);
    },
    showOut:function(){
        if(this.flagConfig=="pre"){
            var _this=this;
            _this.current = _this.arr.shift(); //FIFO
            if(_this.current){
                _this.current.style.backgroundColor = 'red';
                _this.timer = setTimeout(function(){
                    _this.current.style.backgroundColor = '#fff';
                    _this.showOut();
                },500);
            }

        }else if(this.flagConfig=="post"){
            var _this=this;
            _this.current = _this.arr.shift(); //FIFO
            if(_this.current){
                _this.current.style.backgroundColor = 'red';
                _this.timer = setTimeout(function(){
                    _this.current.style.backgroundColor = '#fff';
                    _this.showOut();
                },500);
            }
        }else{
            var _this=this;
            _this.current = _this.arr.shift(); //FIFO
            if(_this.current){
                var data  = _this.getInputValue(_this.input_container)
                var node =_this.current.firstChild.nodeValue;
                if(data==node){
                    _this.current.style.backgroundColor = 'yellow';
                    _this.timer = setTimeout(function(){
                        _this.current.style.backgroundColor = '#fff';
                        _this.showOut();
                    },500);
                    alert("找到元素"+ data);
                }else{
                    _this.current.style.backgroundColor = 'red';
                    _this.timer = setTimeout(function(){
                        _this.current.style.backgroundColor = '#fff';
                        _this.showOut();
                    },500);
                }


            }
        }

    },
    reset:function(obj){
        if (obj.arr.length>0){
            obj.current.style.backgroundColor = '#fff';
            obj.arr = [];
            clearTimeout(obj.timer);
        }
    },
    getInputValue:function(element){
        var  data =element.value;
        if(!data){
            // alert('请在输入框内填入数据');
            console.error('请在输入框内填入数据');
            return null;
        }else{
            return data;
        }
    },
    resetColor:function(obj){
        clearInterval(obj.timer);
        var tree=document.getElementsByClassName("tree");
        for(var i=0;i<tree.length;i++){
            tree[i].style.backgroundColor="#fff"
        }
    }
}

window.onload = function() {
 var root = document.getElementsByClassName("one")[0], //取得根节点
    btn  = document.getElementById("btn");
    orderfunction(btn, root)
}