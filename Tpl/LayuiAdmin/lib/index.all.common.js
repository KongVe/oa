// 公用方法


var test = window.location.protocol; 
function menu_list(){
	test1 = test+'//'+ window.location.host+'/User/getUserInfo'; 
	$.ajax({
		url:test1,
		type:'GET',
		dataType:'json',
		success:function(data){
        // data = JSON.parse(data);
        console.log(data.data.menu_tree);
        if(data.data.menu_tree.length>0){
        	Get_menu_list(data.data);
        }
    },
})	
}
 /** 
 * 获取指定的URL参数值 
 * URL:http://www.quwan.com/index?name=tyler 
 * 参数：paramName URL参数 
 * 调用方法:getParam("name") 
 * 返回值:tyler 
 */ 
function getParam(paramName) { 
    paramValue = "", isFound = !1; 
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) { 
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0; 
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++ 
    } 
    return paramValue == "" && (paramValue = null), paramValue 
} 
function Get_menu_list(data){
	var list = "";
	var list_list = '';
	var len = data.menu_tree.length;
	$.each(data.menu_tree,function(i,e){
		var list_tree2 = '';
		var list_tree = '';
		if(e._child.length > 0){
			// for(var j = 0; j<e._child.length;j++){
			// 	if(j == 0){
			// 		list_tree2 += '<dl class="layui-nav-child">'
			// 	}
			// 	list_tree2 += 
			// 	'<dd data-name="'+e._child[j].id+'">'+
			// 	'<a  id="'+e._child[j].id+'" data-pid="'+e._child[j].pid+'" href="'+e._child[j].url+'">'+e._child[j].name+'</a>'+
			// 	'</dd>'
			// }
			// list_tree2+= '</dl>'
			list_tree2 = menu_tree_list(e._child);
		}
		if(e._child.length > 0){
			list_tree += '<li class="layui-nav-item" data-name="'+e.id+'"><a  data-pid="'+e.pid+'" ><cite>'+e.name+'</cite><span class="layui-nav-more"></span></a>'+
			list_tree2+
			'</li>';
		}else{
			list_tree += '<li class="layui-nav-item" data-name="'+e.id+'"><a lay-href="'+e.url+'"  data-pid="'+e.pid+'" ><cite>'+e.name+'</cite></a></li>'+
			list_tree2;
		}
		list_list +=list_tree
	});
	list +=

	list_list
	$('#LAY-system-side-menu').append(list)
}
function menu_tree_list(data){
	var list = '';
	$.each(data,function(i,v){
		if(i == 0){
			list += '<dl class="layui-nav-child">'
		}
		if(v._child){debugger
			list += 
			'<dd data-name="'+v.id+'">'+
			'<a  id="'+v.id+'" data-pid="'+v.pid+'"  >'+v.name+'<span class="layui-nav-more"></span></a>'+
			menu_tree_list(v._child)+
			'</dd>'

		}else{
			list += 
			'<dd data-name="'+v.id+'">'+
			'<a  id="'+v.id+'" data-pid="'+v.pid+'" lay-href="'+v.url+'" ><cite>'+v.name+'</cite></a>'+
			'</dd>'
		}
	})
	list+= '</dl>'
	return list;
}
// })