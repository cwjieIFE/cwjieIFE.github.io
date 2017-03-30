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
    console.log(111);
    this.current;
    this.timer;

    this.pre = document.getElementById('pre');
    this.in = document.getElementById('in');
    this.post = document.getElementById('post');
}
orders.prototype = {
    init:function(obj){
        console.log(11);
        if (obj.arr.length>0){
            obj.current.style.backgroundColor = '#fff';
            obj.arr = [];
            clearTimeout(obj.timer);
        }
        this.initEvent(obj);
    },
    initEvent:function(obj){
        this.pre.addEventListener('click',function(){
            obj.reset(obj);
            obj.preOrder(obj.root);
            obj.showOut();
        });
        this.in.addEventListener('click',function(){
            obj.reset(obj);
            obj.inOrder(obj.root);
            obj.showOut();
        });
        this.post.addEventListener('click',function(){
            obj.reset(obj);
            obj.postOrder(obj.root);
            obj.showOut();
        });



    },
    preOrder:function(node){
        var _this=this;
        if(node){
            _this.arr.push(node);
            _this.preOrder(node.firstElementChild);
            _this.preOrder(node.lastElementChild);
        }
    },
    inOrder:function(node){
        var _this=this;
        if(node){
            _this.inOrder(node.firstElementChild);
            _this.arr.push(node);
            _this.inOrder(node.lastElementChild);
        }
    },
    postOrder:function(node){
        var _this=this;
        if(node){
            _this.postOrder(node.firstElementChild);
            _this.postOrder(node.lastElementChild);
            _this.arr.push(node);
        }
    },
    showOut:function(){
        var _this=this;
        _this.current = _this.arr.shift(); //FIFO
        if(_this.current){
            _this.current.style.backgroundColor = 'red';
            _this.timer = setTimeout(function(){
                _this.current.style.backgroundColor = '#fff';
                _this.showOut();
            },500);
        }
    },
    reset:function(obj){
        if (obj.arr.length>0){
            obj.current.style.backgroundColor = '#fff';
            obj.arr = [];
            clearTimeout(obj.timer);
        }
    }
}

window.onload = function() {
 var root = document.getElementsByClassName("one")[0], //取得根节点
    btn  = document.getElementById("btn");
    orderfunction(btn, root)
}