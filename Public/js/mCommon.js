	// 手机公用函数
function iframe_index(){
	1
	$.ajax({
		url:'{:U('User/getUserInfo')}',
		type:'GET',
		dataType:'json',
		success:function(data){

		}
	})
}
function openleft(){
	$.openPanel('#left');

}

function openright(){
	$.openPanel('#panel-right');

}
function nav_show(){
	$('#nav-overlady').removeClass('hide');
	$('#nav-menu-list').show();
}
function Get_menu_list (data){
	var list = "";
	var len = data.menu_tree.length;
	$.each(data.menu_tree,function(i,e){
		var list_tree2 = '';
		var list_tree = '';
		if(e._child.length > 0){
			for(var j = 0; j<e._child.length;j++){
				if(j == 0){
					list_tree2 += '<div class="level-2"><ul>'
				}
				list_tree2 += 
				'<li id="'+e._child[j].id+'" data-pid="'+e._child[j].pid+'" href="'+e._child[j].url+'">'+
				e._child[j].name+
				'</li>'
				if(j == e._child.length){
					list_tree2+= '</ul></div>'
				}
			}

		}
		list_tree += '<ul>';
		list_tree += '<li href="#" data-pid="'+e.pid+'">'+e.name+'</li>'+
		list_tree2+
		'</ul>';
		list +='<div class="level-1">'+
		'<a class="nav-level-1-back" onclick="menu_hide()"></a>'+
		list_tree+
		'</div>'
	});
	$('#nav-menu-list').append(list)
}
function menu_hide(){
	$('#nav-overlady').addClass('hide');
	$('#nav-menu-list').hide();
}