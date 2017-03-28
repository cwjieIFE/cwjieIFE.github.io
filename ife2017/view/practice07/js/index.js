var RightMenu = document.getElementById('RightMenu');
var context = document.getElementById('context')
context.oncontextmenu = function(e){
	var event = e || window.event; //做一下兼容
	RightMenu.style.display = 'block';
	//自定义菜单显示在的位置
	var RightMenuX = context.clientWidth - RightMenu.offsetWidth,
		RightMenuY = context.clientHeight - RightMenu.offsetHeight;
	//判断鼠标坐标是否大于自定义菜单区域的宽高度
	var menuX = (event.clientX > RightMenuX) ? RightMenuX : event.clientX,
		menuY= (event.clientY > RightMenuY) ? RightMenuY : event.clientY;
	//确定自定义菜单的位置
	RightMenu.style.left	= menuX + 'px',
		RightMenu.style.top = menuY + 'px';
	// 使用 return flase 来阻止浏览器默认行为
	return false;
}
document.addEventListener('click', function (e) {
	RightMenu.style.display = "none";
},false);
//获取右键点击菜单列表
var itemList = document.getElementsByClassName('itemList');
for(var i=0;i<itemList.length;i++){
	itemList[i].addEventListener('click', function (e) {
		//childNodes 属性返回节点的子节点集合
		alert(this.childNodes[1].innerText);
	},false);
}
