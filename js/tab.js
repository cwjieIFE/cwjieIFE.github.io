/*
*
* 
*  Copyright:山西优逸客科技有限公司 项目开发组 
*
*  Date:2015-01-20 Time:01-14
*
*  The development team: Json  L  Herman  Abner
*
*
*/
$.fn.extend({
	//选项卡
	tab:function(links,lists,bgcolor,ftcolor){
		var bgcolor=bgcolor||"orange";
		var ftcolor=ftcolor||"#fff";
		links.hover(function(){
			var index=links.index(this);
			lists.hide();
			lists.eq(index).show();
			links.removeAttr("style");
			$(this).css({
				background:bgcolor,color:ftcolor});
		})
	}

})