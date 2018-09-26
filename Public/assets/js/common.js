$(function(){
	$.extend({
		getUrlVars: function(){
				var vars = [], hash;
				var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
				for(var i = 0; i < hashes.length; i++)
				{
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
				return vars;
			},
		getUrlVar: function(name){
				return $.getUrlVars()[name];
			}
	});

	//检测是否需要显示高级搜索
	var input_objs = $("#adv_search input");
	var select_objs = $("#adv_search select");
	var show = false;
	for (var i = 0; i < input_objs.length; i++) {
		var tmp = input_objs.eq(i).val();
		if(tmp != undefined && tmp != '' && tmp != null && tmp != 0){
			show = true;
			break;
		}
	};
	if(show){
		$("#adv_search").removeClass("display-none");
	}
	$(document).ready(function(){
	    $(document).ready(function() { 
			if($("#tr_title").length>0 && !is_mobile()){
				//后端控制默认不悬浮表头
				//固定表头每项的宽度 
				$("#tr_title").children().each(function(ii){
					var tmp_width = $(this).css("width");
					$(this).css("width",tmp_width);
					$(this).css("max-width",tmp_width);
					$(this).css("min-width",tmp_width);
					// $("table tr").eq(1).children().each(function(jj){
					// 	if(ii == jj){
					// 		$(this).css('width',tmp_width);
					// 		$(this).css("min-width",tmp_width);
					// 		$(this).css("max-width",tmp_width);
					// 	}
					// });
				});

				$(window).scroll(function(){
					var pageY=window.pageYOffset;
					var pageX=window.pageXOffset;
					var table_position=$('#tr_title').offset();
					if($("#tr_title_fixed").length>0){
						var tr_fixed = $("#tr_title_fixed");
					}else{
						var tr_fixed = $("#tr_title").clone(true);
						tr_fixed.attr("id","tr_title_fixed");
						$("#tr_title").before(tr_fixed);
					}

					if(pageY > table_position.top+150){
						$("#tr_title").attr("disabled",true);
						
						//固定表头每项的宽度 
						$("#tr_title").children().each(function(ii){
							var tmp_width = $(this).css("width");
							$(this).css("width",tmp_width);
							$(this).css("max-width",tmp_width);
							$(this).css("min-width",tmp_width);
							// $("table tr").eq(1).children().each(function(jj){
							// 	if(ii == jj){
							// 		$(this).css('width',tmp_width);
							// 		$(this).css("min-width",tmp_width);
							// 		$(this).css("max-width",tmp_width);
							// 	}
							// });
						});

						//显示悬浮框
						if(pageX > 0){
							var left_val = table_position.left-pageX;
							tr_fixed.attr("style","position: fixed;top:0px;left:"+left_val+"px;z-index:1005;border-bottom:groove;background-color:#E6E6E6");
						}else{
							tr_fixed.attr("style","position: fixed;top:0px;z-index:1005;border-bottom:groove;background-color:#E6E6E6");
						}
					}else{
						tr_fixed.remove();
						$("#tr_title").attr("disabled",false);
					}
				});
			}

			if($(".blink_selector").length > 0){
				blink(".blink_selector");
			}
			
		});
	});  

	//table表头多选项点击提交
	$(".filter_checkbox_v2").click(function(){
		$("#form_search").submit();
	});
	//table表头排序
	$(".sort_button_v2").click(function(){
		previous_order = $("#order").val();
		$("#form_search").append("<input name='_previous_order' value='" + previous_order + "' />");
		$("#order").val($(this).attr("name"));
		if($("#sort").val() == "1"){
			$("#sort").val("0");
		}else{
			$("#sort").val("1");
		}

		$("#form_search").submit();
	})
	$(".sort_button").mousedown(function(){
		previous_order = $("#order").val();
		if($("#previous_order").length == 0){
			$("#form_search").append("<input name='_previous_order' id='previous_order' value='" + previous_order + "' />");
		}

	})
	//通用关闭 modal box的class点击事件
	$(".close_box_button").click(function(){
		closeBox();
	});

	//根据form表单的action重新载入页面
	$(".roload_form_action").click(function(){
		var obj_list = $(this).parents();
		for (var i = 0; i < obj_list.length; i++) {
			if(obj_list.get(i).tagName == "FORM"){
				var url = obj_list.eq(i).attr("action");
				if(url){
					// if(confirm("确认重新载入当前页面？所有搜索选项将丢失")){
					// 	
					// }
					window.location.href = url;	
				}
				break;
			}
		};
	});

	$(".showBox").click(function(r){
		var type = $(this).attr("data-type");
		var url = $(this).attr("data-url");
		var use_parent = $(this).attr("data-use_parent");
		if(!type || type==undefined){
			//默认middle
			type = "middleBox";
		}
		showBox(type,url,use_parent);
	});

	//通用编辑页面表单ajax提交 按钮
	$(".defaultEditFormSubmit").click(function(r){
		var msg = $(this).attr("data-msg");
		var close = $(this).attr("data-close");
		var reload = $(this).attr("data-reload");
		var target = $(this).attr("data-target");
		var form_id = "editForm";
		if(!msg){
			msg = "确认保存?";
		}
		if(!confirm(msg)){
			return false;
		}
		var data = $("#"+form_id).serialize();
		var url = $("#"+form_id).attr("action");
		
		var btn = $(this);
		btn.button('loading');
		if (check_form(form_id)) {
			if(typeof(editor)!="undefined"){
				editor.sync();	
			}
			sendForm(form_id,url,false,function(msg){
				if(msg.status){
					alertWarning(msg.info,1);
					if(close){
						closeBox();
					}
					if(close && reload){
						if(target){
							parent.frames[target].window.location.reload();
						}else{
							parent.window.location.reload();	
						}
					}else if(reload){
						if(target){
							parent.frames[target].window.location.reload();
						}else{
							window.location.reload();
						}
					}
					btn.button('reset');
				}else{
					alertWarning(msg.info);
					btn.button('reset');
				}
			});
		}else{
			btn.button('reset');
		}
	});

	//
	$(".V2EditMemo").hover(
		function(){
			var pencil = '<i class="icon-pencil"></i>';
			$(this).children().eq(0).before(pencil);

			$(".V2EditMemo .icon-pencil").click(function(){
				showMemoEdit($(this).parent());
			});
		},
		function(){
			$(this).find(".icon-pencil").remove();
		}
	);
	
	$(".V2EditMemo .icon-pencil").click(function(){
		showMemoEdit(this);
	});

	$(".thumbnail").hover(
		function(){
			$(".thumbnailBox img").attr("src",$("img",this).attr("src"));
			var position = $(this).position(),
			outerWidth = $(this).outerWidth(true),
			box_top = position.top + 100,
			box_left = position.left + outerWidth + 10;
			$(".thumbnailBox").css({top:box_top,left:box_left}).show();
		},
		function(){
			$(".thumbnailBox").hide();
		}
	);

	//下载粘贴的缩略图
	if($("input.thumbnail_clipboard").length > 0){
		downloadThumbnailClipboard();

	}
	
	//点击后提交当前form
	$(".click_submit_form").click(function(){
		
		var list = $(this).parents();
		for (var i = 0; i < list.length; i++) {
			var tmp_name = list.eq(i).get(0).tagName;
			
			if(tmp_name == "FORM"){
				list.eq(i).submit();
			}
		};
	});
}); 

function downloadThumbnailClipboard(){
	for(thumbnail_clipboard_i = 0 ;thumbnail_clipboard_i < $("input.thumbnail_clipboard").length;thumbnail_clipboard_i++){
		$("input.thumbnail_clipboard")[thumbnail_clipboard_i].addEventListener('paste', function(e) {
		    //判断是否是粘贴图片
		    if (e.clipboardData && e.clipboardData.items[0].type.indexOf('image') > -1) {
		        var that = this,
		            reader = new FileReader();
		        	file = e.clipboardData.items[0].getAsFile();
		        if($(this).data('nextdiv')){
        			target = $(this).parent().next().find("a.thumbnail").eq(0);
        			target_img = $(this).parent().next().find("img").eq(0);
		        	
		        	console.log(target);

		        }else if($(this).data('target')){
		        	target = $("#" + $(this).data('target'));
		        	target_img = $("img",target);
		        }else{
		        	target = $("a.thumbnail");
		        	target_img = $("a.thumbnail img");
		        }
		        //ajax上传图片
		        reader.onload = function(e) {
		        	thumbnail_base64 = this.result;
		        	data = {
		        		file:thumbnail_base64
		        	}

		        	$.post(thumbnail_clipboard_url,data,function(r){
		        		if(r.status){
		        			target_img.attr('src',r.data.url);
		        			a_href = target.attr("href");
		        			if(a_href == '' || a_href == null){
		        				target.attr("href",r.data.url);
		        			}
		        			that.value = r.data.url;
		        		}else{
		        			alertWarning(r.info);
		        		}
		        	});
		        }
		        reader.readAsDataURL(file);
		    }
		}, false);			
	}

	changeThumbnailClipboard();
}

//修改显示的图片
function changeThumbnailClipboard(){
	$(".thumbnail_clipboard").change(function(){
		$(this).parent().next().find("img").eq(0).attr("src",$(this).val());
		$(this).parent().next().find("a.thumbnail").eq(0).attr("href",$(this).val());
	})
}

function del_current_node(){
	set_cookie("current_node",null);	
}

/* 填充时间*/
function fill_time(id) {
	for (var i = 5; i < 22; i++) {
		val = ("0" + i);
		val = val.substring(val.length - 2)
		$("#" + id).append("<option value='" + val + ":00'>" + val + ":00</option>");
		$("#" + id).append("<option value='" + val + ":30'>" + val + ":30</option>");
	}
}

/* 删除左右两端的空格*/
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/* 获取日历背景颜色*/
function schedule_bg(j) {
	var myArray = new Array(5);
	myArray[0] = "#CCCCCC";
	myArray[1] = "#99CCFF";
	myArray[2] = "#CCFFCC";
	myArray[3] = "#FFFFCC";
	myArray[4] = "#FFCCCC ";
	return myArray[j - 1];
}



/*联系人显示格式转换*/
function conv_address_item(id, name) {
	html = '<label>';
	html += '		<input class="ace" type="checkbox" name="addr_id" value="' + id + '"/>';
	html += '		<span class="lbl">' + name + '</span></label>';
	return html;
}

function conv_inputbox_item(id,name,title,data){
	if(data!==undefined){
		html = "<span data=\"" + data + "\" id=\"" + id + "\">";
	}else{
		html = "<span id=\"" + id + "\">";
	}	
	html+="<nobr><b  title=\"" + title + "\">" + name + "</b>";
	html+="<a class=\"del\" title=\"删除\"><i class=\"icon-remove\"></i></a></nobr></span>";
	return html;
}

/* 关闭弹出窗口*/
function myclose() {
	parent.winclose();
}

function winclose() {
	$("html,body").css("overflow", "auto");
	$("div.shade").hide();
	$("#dialog").html("");
	$("#dialog").remove();
}

/* 在iframe里显示textarea的内容*/
function show_content() {
	var iframe = $("#content_iframe").get(0).contentWindow;
	var div = document.createElement("div");
	div.innerHTML = $("#content").val();
	div.className = "height";
	iframe.document.body.appendChild(div);
	height = $(iframe.document.body).find("div.height").height();
	if (height < 300) {
		height = 300;
	}
	iframe.height = height;
	$("#content_wrap").height(height + 30);
	$("#content_wrap").parent().height(height + 40);
	$("#content_iframe").height(height + 30);
}

function showBottomBox(url,use_parent,param){

	var div = '<div class="bottomBox col-lg-12" id="bottomBox" style="position:fixed;z-index:100;height:300px;left:42px;display:none;padding:0px 42px 0px 0px;"><div style="position: absolute;text-align:right;width: 100%;height:0px;"><button type="button" class="close icon-4x" data-dismiss="modal" aria-hidden="true" onclick="$(\'#bottomBox\').hide(\'fast\');$(\'#bottomBoxIframe\').attr(\'src\',\'about:blank\');" style="margin:-45px 100px auto auto;">×</button></div><iframe src="" id="bottomBoxIframe" frameborder="0" height="300px" name="bottomBoxIframe" srolling="auto"  width="100%"></iframe></div>';

	if(is_mobile()){
		var div = '<div class="bottomBox col-lg-12" id="bottomBox" style="position:fixed;z-index:100;height:300px;left:0px;display:none;padding:0px 0px 0px 0px;"><div style="position: absolute;text-align:right;width: 100%;height:0px;"><button type="button" class="close icon-4x" data-dismiss="modal" aria-hidden="true" onclick="$(\'#bottomBox\').hide(\'fast\');$(\'#bottomBoxIframe\').attr(\'src\',\'about:blank\');" style="margin:-45px 100px auto auto;">×</button></div><iframe src="" id="bottomBoxIframe" frameborder="0" height="300px" name="bottomBoxIframe" srolling="auto"  width="100%"></iframe></div>';
	}

	//放置div
	if(use_parent){
		if(parent.$("#bottomBox").length<=0){
			//放置div
			parent.$("body").append(div);
		}else{
			parent.$("#bottomBox").replaceWith(div);
		}
	}else{
		if($("#bottomBox").length<=0){
			//放置div
			$("body").append(div);
		}else{
			$("#bottomBox").replaceWith(div);
		}
	}
	
	var order_detail_box = $("div.bottomBox");
	$("#bottomBoxIframe").attr("src","about:blank");
	
	var box_top = document.documentElement.clientHeight - order_detail_box.height();
	//var box_width = window.screen.availWidth;
	var box_width = document.documentElement.clientWidth;
	order_detail_box.css({display:"block",top:box_top + "px",width:box_width + "px"});

	$("#bottomBoxIframe").attr("src",url + "&_"+  Math.round(new Date().getTime()/1000));

}

function showMiddleBox(url,use_parent){
	showBox("middleBox",url,use_parent)
}

//显示弹出层
function showBox(type,url,use_parent,param){

	if(!type){
		type = "middleBox";
	}
	var div_style="height:100%;width:70%;min-width:70%;";

	if(type == "rightBox"){
		div_style+="float:right;";
	}

	if(is_mobile()){
		var div_style="height:100%;width:100%;min-width:100%;";
	}
	var iframe_style="width:100%;height:100%";

	var div = '<div class="modal fade" id="'+type+'" role="dialog"  tabindex="-1" aria-labelledby="'+type+'Label" aria-hidden="true"><div class="modal-dialog" style="'+div_style+'"><div style="text-align: right;position: absolute;width:100%;height:0px;"><button type="button" class="close icon-3x" data-dismiss="modal" aria-hidden="true" onclick="$(this).parent().parent().find(\'iframe\').attr(\'src\',\'about:blank\');" style="margin-right:40px;"><i class="icon-remove"></i></button><button type="button" class="close icon-3x" onclick="window.frames[ $(this).parent().parent().find(\'iframe\').attr(\'name\') ].window.location.reload();" style="margin-right: 20px;"><i class="icon-refresh"></i></button></div><iframe src=""  id="'+type+'Iframe" name="'+type+'Iframe"  style="'+iframe_style+'" scrolling="auto" ></iframe></div></div>';
	
	if(use_parent){
		var _body = parent.$("body");
		if(parent.$("#"+type).length<=0){
			//放置div
			
			_body.append(div);
		}else{
			parent.$("#"+type).replaceWith(div);
		}
		var iframe = parent.window.frames[type+"Iframe"];
		var frame = parent.$("#"+type+"Iframe");
		var box = parent.$("#"+type+"");
	}else{
		var _body = $("body");
		if($("#"+type).length<=0){
			//放置div
			
			_body.append(div);
		}else{
			$("#"+type).replaceWith(div);
		}
		var iframe = window.frames[type+"Iframe"];
		var frame = $("#"+type+"Iframe");
		var box = $("#"+type+"");
	}
	//清空iframe
	iframe.location.href = "about:blank";
	if(!url){
		url = "about:blank";
	}else{
		if(url.indexOf("?")!="-1"){
			var tmp_time = "&_" + Math.round(new Date().getTime()/1000);
		}else{
			var tmp_time = "?_" + Math.round(new Date().getTime()/1000);
		}
	}
	
	frame.attr("src",url + tmp_time);

	var modal_param = {backdrop:'static'};
	
	if(param){
		if(param.modal_param){
			console.log(param['modal_param']);
			var modal_param = param['modal_param'];
		}
	}
	
	if (is_mobile()) {
			
		$("#"+type).css("width", _body.width());
		$("#"+type).css({
			width : _body.width(),
			height : "auto",
			position : "fixed",
			"z-index" : "2000",
			top : 0,
			left : 0,
			"background-color" : "#ffffff"
		});

	}

	box.modal(modal_param).modal("show");

	//关闭时也清空iframe
	box.on('hidden', function () {
		var tmp_iframe = box.find("iframe");
		var id = tmp_iframe.attr("id");
		var iframe = window.frames[id];
		if(iframe){
			iframe.location.href = "about:blank";
		}
	});
}

//在弹出层中调用，寻找自己的父页中的ID然后close
function closeBox(){
	var obj_list = parent.$(window.frameElement).parents();
	for (var i = 0; i < obj_list.length; i++) {
		if(obj_list.eq(i).hasClass("modal")){
			obj_list.eq(i).modal("hide");
			window.location.href = "about:blank";
			break;
		}
	};
	
}

/*返回到上一页*/
function go_return_url() {
	window.open(get_cookie("return_url"), "_self");
	return false;
}

function toggle_adv_search() {
	if ($("#adv_search").attr("class").indexOf("display-none") < 0) {
		$("#adv_search").addClass("display-none");
		$("#toggle_adv_search_icon").addClass("icon-chevron-down");
		$("#toggle_adv_search_icon").removeClass("icon-chevron-up");
	} else {
		$("#adv_search").removeClass("display-none");
		$("#toggle_adv_search_icon").addClass("icon-chevron-up");
		$("#toggle_adv_search_icon").removeClass("icon-chevron-down");
	}
}

function submit_search(){
	$("#form_search").submit();
}
function submit_adv_search(){	
	$("#form_adv_search").submit();
}
$('#sidebar-collapse i').each(function(i,v){
					if(v.className.indexOf(localStorage.getItem('sidebar')) == -1){
						if(localStorage.getItem('sidebar') == 'left')
						v.className = v.className.replace('right',localStorage.getItem('sidebar'));
					else
						v.className = v.className.replace('left',localStorage.getItem('sidebar'));
					}
				});
function close_adv_search() {
	$("#adv_search").addClass("display-none");
	$("#toggle_adv_search_icon").addClass("icon-chevron-down");
	$("#toggle_adv_search_icon").removeClass("icon-chevron-up");
}



var ul_table = {
	//displays a toolbar according to the number of selected messages
	display_bar : function(count) {
		if (count == 0) {
			$('#id-toggle-all').removeAttr('checked');
			$('#id-message-list-navbar .message-toolbar').addClass('hide');
			$('#id-message-list-navbar .message-infobar').removeClass('hide');
		} else {
			$('#id-message-list-navbar .message-infobar').addClass('hide');
			$('#id-message-list-navbar .message-toolbar').removeClass('hide');
		}
	},
	select_all : function() {
		var count = 0;
		$('.tbody input[type=checkbox]').each(function() {
			this.checked = true;
			$(this).closest('.tbody').addClass('selected');
			count++;
		});

		$('#id-toggle-all').get(0).checked = true;

		ul_table.display_bar(count);
	},
	select_none : function() {
		$('.tbody input[type=checkbox]').removeAttr('checked').closest('.tbody').removeClass('selected');
		$('#id-toggle-all').get(0).checked = false;

		ul_table.display_bar(0);
	},
	select_read : function() {
		$('.message-unread input[type=checkbox]').removeAttr('checked').closest('.tbody').removeClass('selected');

		var count = 0;
		$('.tbody:not(.message-unread) input[type=checkbox]').each(function() {
			this.checked = true;
			$(this).closest('.tbody').addClass('selected');
			count++;
		});
		ul_table.display_bar(count);
	},
	select_unread : function() {
		$('.tbody:not(.message-unread) input[type=checkbox]').removeAttr('checked').closest('.tbody').removeClass('selected');

		var count = 0;
		$('.message-unread input[type=checkbox]').each(function() {
			this.checked = true;
			$(this).closest('.tbody').addClass('selected');
			count++;
		});

		ul_table.display_bar(count);
	}
}

var Inputbox = {
	//displays a toolbar according to the number of selected messages
	display_bar : function(count) {
		if (count == 0) {
			$('#id-toggle-all').removeAttr('checked');
			$('#id-message-list-navbar .message-toolbar').addClass('hide');
			$('#id-message-list-navbar .message-infobar').removeClass('hide');
		} else {
			$('#id-message-list-navbar .message-infobar').addClass('hide');
			$('#id-message-list-navbar .message-toolbar').removeClass('hide');
		}
	},
	select_all : function() {
		var count = 0;
		$('.tbody input[type=checkbox]').each(function() {
			this.checked = true;
			$(this).closest('.tbody').addClass('selected');
			count++;
		});

		$('#id-toggle-all').get(0).checked = true;

		ul_table.display_bar(count);
	},
	select_none : function() {
		$('.tbody input[type=checkbox]').removeAttr('checked').closest('.tbody').removeClass('selected');
		$('#id-toggle-all').get(0).checked = false;

		ul_table.display_bar(0);
	},
	select_read : function() {
		$('.message-unread input[type=checkbox]').removeAttr('checked').closest('.tbody').removeClass('selected');

		var count = 0;
		$('.tbody:not(.message-unread) input[type=checkbox]').each(function() {
			this.checked = true;
			$(this).closest('.tbody').addClass('selected');
			count++;
		});
		ul_table.display_bar(count);
	},
	select_unread : function() {
		$('.tbody:not(.message-unread) input[type=checkbox]').removeAttr('checked').closest('.tbody').removeClass('selected');

		var count = 0;
		$('.message-unread input[type=checkbox]').each(function() {
			this.checked = true;
			$(this).closest('.tbody').addClass('selected');
			count++;
		});
		ul_table.display_bar(count);
	}
}

/*赋值*/

function set_val(name, val) {
	if ($("#" + name + " option").length > 0) {
		$("#" + name + " option[value='" + val + "']").attr("selected", "selected");
		return;
	}

	if (($("#" + name).attr("type")) === "checkbox") {
		if (val == 1) {
			$("#" + name).attr("checked", true);
			return;
		}
	}
	if (($("#" + name).attr("type")) === "text") {
		$("#" + name).val(val);
		return;
	}
	if (($("#" + name).attr("type")) === "hidden") {
		$("#" + name).val(val);
		return;
	}
	if (($("#" + name).attr("rows")) > 0) {
		$("#" + name).text(val);
		return;
	}
}

/*设置要返回的URL*/
function set_return_url(url) {
	if (url != undefined) {		
		set_cookie("return_url", url);
	} else {
		set_cookie("return_url", document.location);		
	}
}

/*打开弹出窗口*/
function winopen(url, w, h) {
	url = fix_url(url);
	$("html,body").css("overflow", "hidden");
	$("div.shade").show();
	var _body = $("body").eq(0);
	if ($("#dialog").length == 0) {
		if (!is_mobile()) {
			_body.append("<div id=\"dialog\"><iframe src='" + url + "' style='width:" + w + "px;height:100%' scrolling='auto' ></iframe></div>");
			$("#dialog").css({
				width : w,
				height : h,
				position : "fixed",
				"z-index" : "2000",
				top : ($(window).height() / 2 - h / 2),
				left : (_body.width() / 2 - w / 2),
				"background-color" : "#ffffff"
			});
		} else {
			$("div.shade").css("width", _body.width());
			_body.append("<div id=\"dialog\"><iframe src='" + url + "' style='width:100%;height:100%' scrolling='auto' ></iframe></div>");
			$("#dialog").css({
				width : _body.width(),
				height : h,
				position : "fixed",
				"z-index" : "2000",
				top : 0,
				left : 0,
				"background-color" : "#ffffff"
			});
		}
	} else {
		$("#dialog").show();
	}
}

/*联系人显示格式转换*/
function contact_conv(val) {
	var arr_temp = val.split(";");
	var html = "";
	for (key in arr_temp) {
		if (arr_temp[key] != '') {
			data=arr_temp[key].split("|")[1];
			id=arr_temp[key].split("|")[1];
			name=arr_temp[key].split("|")[0];
			title=arr_temp[key].split("|")[0];
			html +=conv_inputbox_item(id,name,title,data)
			//html +=  '<span data="' + arr_temp[key].split("|")[1] + '" onmousedown="return false"><nobr>' + arr_temp[key].split("|")[0] + '<a class=\"del\" title=\"删除\"><i class=\"icon-remove\"></i></a></nobr></span>';			
		}
	}
	return html;
}

/* 判断是否是移动设备 */
function is_mobile() {
	return navigator.userAgent.match(/mobile/i);
}

/*联系人显示格式转换*/
function fix_url(url) {
	var ss = url.split('?');
	url = ss[0] + "?";
	for (var i = 1; i < ss.length; i++) {
		url += ss[i] + "&";
	}
	if (ss.length > 0) {
		url = url.substring(0, url.length - 1);
	}
	return url;
}

function check_form(form_id) {
	var check_flag = true;
	$("#" + form_id + " :input").each(function(i) {
		if ($(this).attr("check")) {
			//单选或多选中有选择项目
			if($(this).attr("check")=="checked"){
				if($("input[name='"+$(this).attr("name")+"']").serializeArray().length<=0){
					alertWarning($(this).attr("msg"));
					$(this).focus();
					check_flag = false;
					return check_flag;
				}
			}else if (!validate($(this).val(), $(this).attr("check"))) {
				alertWarning($(this).attr("msg"));
				$(this).focus();
				check_flag = false;
				return check_flag;
			}
		}
	})
	return check_flag;
}

/* 验证数据类型*/
function validate(data, datatype) {
	if (datatype.indexOf("|")) {
		tmp = datatype.split("|");
		datatype = tmp[0];
		data2 = tmp[1];
	}
	switch (datatype) {
		case "require":
			if (!data || data == 0 || data == "") {
				return false;
			} else {
				return true;
			}
			break;
		case "email":
			var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
			return reg.test(data);
			break;
		case "number":
			var reg = /^[0-9]+\.{0,1}[0-9]{0,3}$/;
			return reg.test(data);
			break;
		case "html":
			var reg = /<...>/;
			return reg.test(data);
			break;
		case "eqt":
			data2 = $("#" + data2).val();
			return data >= data2
			break;
	}
}

/* ajax提交*/
function sendAjax(url, vars, callback) {
	return $.ajax({
		type : "POST",
		url : url,
		data : vars + "&ajax=1",
		dataType : "json",
		success : callback
	});
}

/*提交表单*/
function sendForm(formId, post_url, return_url,callback) {
	if ($("#ajax").val() == 1) {
		var vars = $("#" + formId).serialize();
		if(callback){
			$.post(post_url,vars,callback).error(function(r){
				alertWarning("请求失败,网络错误");
			});

			// $.ajax({
			// 	type : "POST",
			// 	url : post_url,
			// 	data : vars,
			// 	dataType : "json",
			// 	success : callback,
			// 	error : function(){
			// 		alertWarning("网络错误");
			// 	}
			// });
		}else{
			$.post(post_url,vars,function(data){
				alert(data.info);
				if (return_url) {
					location.href = return_url;
				}
			}).error(function(r){
				alertWarning("请求失败,网络错误");
			});
			// $.ajax({
			// 	type : "POST",
			// 	url : post_url,
			// 	data : vars,
			// 	dataType : "json",
			// 	success : function(data) {
			// 		alert(data.info);
			// 		if (return_url) {
			// 			location.href = return_url;
			// 		}
			// 	},
			// 	error : function(){
					
			// 	}
			// });
		}
		
	} else {
		$("#" + formId).attr("action", post_url);
		if (return_url) {
			set_cookie('return_url', return_url);			
		}
		$("#" + formId).submit();
	}
}

/*临时表单POST提交 data支持一维关联数组arr["name"]=1，json对象:{name:1},序列化参数name=1&name2=2*/
function tmpSendForm(url,data,target,formId,encode){
	var data_type = typeof(data);
	if(data_type=="undefined"){
		return false;
	}
	if(typeof(encode) === "undefined"){
		encode = true;
	}
	if(!formId){
		formId = "tmp_form";
	}
	if(!target){
		target = "_blank";
	}
	if($("#"+formId).length<=0){
		$("body").append('<form id="'+formId+'" name="'+formId+'" method="post" style="display:none;"></form>');
	}
	//清空
	var form_obj = $("#"+formId);
	form_obj.html("");
	var param_data = [];
	if(data_type=="string"){
		//解析参数
		var vars = [], hash;
		var hashes = data.split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			param_data.push({name:hash[0],value:hash[1]});
		}
	}else if(data_type=="object"){
		// data = $.param(data);
		for(var key in data){
			param_data.push({name:key,value:data[key]});
		};
		// //解析参数
		// var vars = [], hash;
		// var hashes = data.split('&');
		// for(var i = 0; i < hashes.length; i++)
		// {
		// 	hash = hashes[i].split('=');
		// 	param_data.push({name:hash[0],value:hash[1]});
		// }
	}else{
		return false;
	}
	//遍历
	for (var i = 0; i < param_data.length; i++) {
		if(typeof(param_data[i].value)!="object"){
			if(encode){
				form_obj.append('<input type="hidden" name="'+decodeURI(param_data[i].name)+'" value="'+encodeURI(param_data[i].value)+'" />')	
			}else{
				form_obj.append('<input type="hidden" name="'+decodeURI(param_data[i].name)+'" value="'+param_data[i].value+'" />')	
			}
			
		}
	}
	if(target){
		form_obj.attr("target",target);
	}
	form_obj.attr("action",url);
	form_obj.submit();
}



function click_nav_menu(obj_node) {
	url = $(obj_node).attr("href");
	if (url.length > 0 && (url != "#")) {
		node = $(obj_node).attr("node");
		set_cookie("current_node", node);
	} else {
		//node = $(obj_node).parent().find("ul li a:first").attr("node");
		//set_cookie("current_node", node);
		//url = $(obj_node).parent().find("ul li a:first").attr("href");
		//if (url !== undefined) {
		//	location.href = url;
		//}
		//return false;
	}
}

/*设置 cookie*/
function set_cookie(key, value, exp, path, domain, secure) {
	path = "/";
	var cookie_string = key + "=" + escape(value);
	if (exp) {
		cookie_string += "; expires=" + exp.toGMTString();
	}
	if (path)
		cookie_string += "; path=" + escape(path);
	if (domain)
		cookie_string += "; domain=" + escape(domain);
	if (secure)
		cookie_string += "; secure";
	document.cookie = cookie_string;
}

/*读取 cookie*/
function get_cookie(cookie_name) {
	var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
	if (results)
		return (unescape(results[2]));
	else
		return null;
}

/*删除 cookie*/
function del_cookie(cookie_name) {
	var cookie_date = new Date();
	//current date & time
	cookie_date.setTime(cookie_date.getTime() - 1);
	document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}


function sort($field,$order){

}

$(document).ready(function() {
	$(".sidebar .nav a").click(function() {
		click_nav_menu($(this));
	})
	$('.ul_table .tbody input[type=checkbox]').removeAttr('checked');
	$('.ul_table').delegate('.tbody input[type=checkbox]', 'click', function() {
		$(this).closest('.tbody').toggleClass('selected');
		if (this.checked)
			ul_table.display_bar(1);
		//display action toolbar when a message is selected
		else {
			ul_table.display_bar($('.ul_table input[type=checkbox]:checked').length);
			//determine number of selected messages and display/hide action toolbar accordingly
		}
	});

	$('#id-toggle-all').removeAttr('checked').on('click', function() {
		if (this.checked) {
			ul_table.select_all();
		} else
			ul_table.select_none();
	});

	var url_pathname = window.location.pathname;

	var menu_list = $(".sidebar .nav a");

	for (var i = 0; i < menu_list.length; i++) {
		if(menu_list.eq(i).attr("href")){
			var tmp = url_pathname.indexOf(menu_list.eq(i).attr("href"));
			if(tmp > -1){

 
				breadcrumb="";
				// current_node = get_cookie("current_node");
				menu_list.eq(i).parents("li").each(function(){
					$(this).addClass("active open");		
					breadcrumb='<li>'+$(this).find("a:first").text()+'</li>'+breadcrumb;					
				})	
				$(".breadcrumb").append(breadcrumb);	
				
				// current_node = get_cookie("current_node");
				// $(".sidebar .nav a[node='" + current_node + "']").parents("li").each(function(){
				// 	$(this).addClass("active open");		
				// 	breadcrumb='<li>'+$(this).find("a:first").text()+'</li>'+breadcrumb;					
				// })	
				// $(".breadcrumb").append(breadcrumb);	


				break;
			}
		}
	};

	// breadcrumb="";
	// current_node = get_cookie("current_node");
	// $(".sidebar .nav a[node='" + current_node + "']").parents("li").each(function(){
	// 	$(this).addClass("active open");		
	// 	breadcrumb='<li>'+$(this).find("a:first").text()+'</li>'+breadcrumb;					
	// })	
	// $(".breadcrumb").append(breadcrumb);	

}); 

//修改显示内容, url 必须包含要处理记录的主键
//other_data 其它附加更改的数据
//need_cover
function editStatic(obj,url,type,other_data){
	var other_data_str=jsonToStr(other_data);
	var val = $(obj).html();
	var name= $(obj).attr('field');
	var width=parseInt($(obj).css('width'))+30;
	var height=parseInt($(obj).css('height'))+30;

	if(type=="textarea"){
		$(obj).replaceWith('<textarea data-bak="'+ val +'" style="height:'+height+'px;width:'+width+'px" class="form-control" name="' + name + '" onBlur="saveStatic(this,\'' + url + '\',\'textarea\','+other_data_str+')" oninput="changeEdit(this)" >' + val + '</textarea>')
		$("textarea[name='" +name + "']").focus();
	}else{
		$(obj).replaceWith('<input data-bak="'+ val +'" style="max-width:80%;" name="' + name + '" value="' + val + '" onBlur="saveStatic(this,\'' + url + '\',\'\', ' +other_data_str+')" />');
		$("input[name='" +name + "']").focus().select();

	}
}
$('#sidebar-collapse').click(function(){
		if(localStorage.getItem("sidebar")== 'left'){
			localStorage.setItem("sidebar",'right');
		}else{
			localStorage.setItem("sidebar",'left');
		}
		
	})
//no_cover_option 为true时，other_data的数据导入到对应字段数据的前面,否则，直接覆盖
function saveStatic(obj,url,type,other_data){

	var other_data_bak=other_data;
	var val = $(obj).val();
	var val_bak = $(obj).attr("data-bak");

	var name = $(obj).attr("name");
	var url_data = name + "=" + val + "&opmode=edit" ;
	var other_data_value ='';
	var other_data_list=url_data;
	//封装其它需要更改的数据
	var other_data_length=getJsonLength(other_data);

	if(val == val_bak){
		no_need_post=1;
	}else{
		no_need_post=false;
	}
	if(other_data_length>0){
		other_data_list=other_data_list+'&has_field=true';
	}
	
	for (var i = 0; i < other_data_length; i++) {
		for (var key in other_data[i]['save_data']) {
			if(other_data[i]['save_data'][key]!=''){
				other_data_list = other_data_list+'&other_data_value['+key+']='+other_data[i]['save_data'][key];
				//替换旧数据			
				other_data_bak[i]['save_data'][key]=other_data_bak[i]['save_data'][key].replace(other_data_bak[i]['keyword'],val);
				other_data_bak[i]['keyword']=val;
			}else{
				//替换旧数据
				other_data_bak[i]['save_data'][key]=other_data_bak[i]['save_data'][key].replace(other_data_bak[i]['keyword'],val);
				other_data_bak[i]['keyword']=val;
			}
		};
	};
	var old_data_str=jsonToStr(other_data_bak);
	if(no_need_post){
		if(type=="textarea")
			$(obj).replaceWith('<span class="editStatic" style=""  field="' + name + '" onclick="editStatic(this,\'' + url + '\',\'textarea\','+old_data_str+')">' + val + '</span>');
		else
			$(obj).replaceWith('<span class="editStatic" style=""  field="' + name + '" onclick="editStatic(this,\'' + url + '\',\'\','+old_data_str+')">' + val + '</span>');
	}else{
		$.post(url,other_data_list,function(r){
			if(r.status){
				if(type=="textarea")
					$(obj).replaceWith('<span class="editStatic" style=""  field="' + name + '" onclick="editStatic(this,\'' + url + '\',\'textarea\','+old_data_str+')">' + val + '</span>');
				else
					$(obj).replaceWith('<span class="editStatic" style=""  field="' + name + '" onclick="editStatic(this,\'' + url + '\',\'\','+old_data_str+')">' + val + '</span>');
			}else{
				alertWarning(r.info);
			}
		})
	}

}

function editMemo(obj,url,type){
	var val = $(obj).html();
	var name= $(obj).attr('field');
	var width=parseInt($(obj).css('width'))+30;
	var height=parseInt($(obj).css('height'))+30;

	if(type=="textarea"){
		$(obj).replaceWith('<textarea data-bak="'+ val +'" style="height:'+height+'px;width:'+width+'px" class="form-control" name="' + name + '" onBlur="addMemo(this,\'' + url + '\',\'textarea\')" oninput="changeEdit(this)" placeholder="添加备注"></textarea>')
		$("textarea[name='" +name + "']").focus();
	}else{
		$(obj).replaceWith('<input data-bak="'+ val +'" style="max-width:80%;" name="' + name + '" value="" placeholder="添加备注" onBlur="addMemo(this,\'' + url + '\',\'\')" />');
		$("input[name='" +name + "']").focus().select();

	}
}

//no_cover_option 为true时，other_data的数据导入到对应字段数据的前面,否则，直接覆盖
function addMemo(obj,url,type){
	var val = $(obj).val();

	var val_bak = $(obj).attr("data-bak");

	var name = $(obj).attr("name");
	if(!name){
		alertWarning("数据错误");
		return false;
	}
	var url_data = "memo_field_name=" +name + "&" + name + "=" + val + "&opmode=edit" ;

	if(!val || !confirm("确认备注？将不可删除，只能添加备注")){
		if(type=="textarea"){
			$(obj).replaceWith('<span class="editMemo" style=""  field="' + name + '" onclick="editMemo(this,\'' + url + '\',\'textarea\')">' + val_bak + '</span>');
		}else{
			$(obj).replaceWith('<span class="editMemo" style=""  field="' + name + '" onclick="editMemo(this,\'' + url + '\',\'\')">' + val_bak + '</span>');
		}
		return false;
	}

	$.post(url,url_data,function(r){
		if(r.status){
			if(type=="textarea"){
				$(obj).replaceWith('<span class="editMemo" style=""  field="' + name + '" onclick="editMemo(this,\'' + url + '\',\'textarea\')">' + r.data[name] + '</span>');
			}else{
				$(obj).replaceWith('<span class="editMemo" style=""  field="' + name + '" onclick="editMemo(this,\'' + url + '\',\'\')">' + r.data[name] + '</span>');
			}
		}else{
			alertWarning(r.info);
			return false;
		}
	});
}

function changeEdit(obj){
	console.log(obj);
	obj.style.height="0px";
	obj.style.height=(obj.scrollHeight+8) + "px";
	//=\'0px\';this.style.width=((this.scrollWidth+8)+\'px\');
}

function showMemoEdit(obj){
	var field_value = $(obj).data("field-value");
	var table_name = $(obj).data("table-name");
	var field = $(obj).data("field");
	if(!field_value || !table_name ){
		alertWarning("缺少参数，请联系技术人员");
		return false;
	}
	if(!field){
		field = "memo";
	}
	parent.showMiddleBox('/Memo/edit?field_value='+field_value+'&table_name='+table_name+'&field='+field+'&_'+  Math.round(new Date().getTime()/1000));
}

//通用的把目标table里的远程图片换成本地图片
function downloadThumbnail(table,field_name,ids,remote_field_name){

	url = "/thumbnail/download/?table=" + table + "&field_name=" + field_name + "&remote_field_name=" + remote_field_name;

	if(ids){
		var id_str_list = [];
		for (var i = 0; i < ids.length; i++) {
			id_str_list.push("id[]="+ids[i]);
		};
		if(id_str_list.length>0){
			var id_param = id_str_list.join("&");
			url+=("&"+id_param);
		}
	}

	$.get(url,function(r){
		if(r.status){

		}else{
			alert("下载缩略图失败，请联系技术：" . r.info);
		}
	})
}

//用form方式提交一个POST数据打开一个链接。
function formOpen(url,data,target){
	if(!target){
		target = "_blank";
	}
	var form = $("<form method='POST' action='" + url +"' target='" + target +"'><input type='submit' /></form>");
	
	$.each(data,function(n,i){
		form.append("<input type='hidden' name='" + n + "' value='" + i + "' />" );
	})
	form.submit();
}


//多维数组排序
function listSortBy(myArray,field,order){
	//冒泡排序
	if(myArray.length>0){
		for(var i=0; i<myArray.length; i++){
			//在这要注意myArray.length-i-1，意思是第一次从数组第一个值开始，第二次从第二个值开始.....
			for(var j=0; j<myArray.length-i-1; j++){
				var str_i = myArray[j][field];
				var str_j = myArray[j+1][field];
				//判断值是否大于后面值，如果大于进行换位处理
				if(order=='desc'){
					//降序排序
					if(parseFloat(str_i) < parseFloat(str_j)){
						var tmp = myArray[j];
						myArray[j] = myArray[j+1];
						myArray[j+1] = tmp;
					}
				}else{
					//默认升序排序
					if(parseFloat(str_i) > parseFloat(str_j)){
						var tmp = myArray[j];
						myArray[j] = myArray[j+1];
						myArray[j+1] = tmp;
					}
				}
			}
		}
	}
	return myArray;
}


//警告弹窗
function alertWarning(str,status){
	if($('#alertBox').length<=0){
		$('body').append('<div class="modal fade " id="alertBox" tabindex="-1" role="dialog" aria-labelledby="alertBoxLabel" aria-hidden="true"><div class="modal-dialog" style="width:60%;"><div class="bs-example"><div class="alert alert-danger fade in" id="alertStatus"><h4> </h4><p id="alerBody"></p><p><button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" id="alertConfirm">确认</button></p></div></div></div></div>')
	}
	
	if(status==1){
		$('#alertStatus').attr('class','alert alert-success fade in');
	}else{
		$('#alertStatus').attr('class','alert alert-danger fade in');
	}
	$('#alertBox').modal({show:true});
	//$('#alertBox').css();
	$('#alerBody').html('<b style="font-size:20px;">'+str+'</b>');
	document.onkeydown=function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];         
		if(e && e.keyCode==13){ // enter 键
		    $('#alertConfirm').click();
		    return false;
		}
		if(e && e.keyCode==32){ // 空格 键
		    $('#alertConfirm').click();
		    return false;
		}
	}; 
}

//Json对象转String对象
function jsonToStr(o) { 
	var arr = []; 
	var fmt = function(s) { 
	if (typeof s == 'object' && s != null) return jsonToStr(s); 
	return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s; 
	} 
	for (var i in o) arr.push("'" + i + "':" + fmt(o[i])); 
	return '{' + arr.join(',') + '}'; 
} 

//获得 Json对象长度
function getJsonLength(jsonData){
	var jsonLength = 0;
	for(var item in jsonData){
		jsonLength++;
	}
	return jsonLength;
}

//元素闪烁
function blink(selector){
    $(selector).fadeOut('slow', function(){
        $(this).fadeIn('slow', function(){
            blink(this);
        });
    });
}

//复制到剪贴板
function copyToClipboard(txt) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        clipboardData.setData("Text", txt);
        alert("复制成功！");

    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
            alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'");
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip)
            return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans)
            return;
        trans.addDataFlavor("text/unicode");
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip)
            return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
        alert("复制成功！");
    }
}

//chomre桌面通知，其它浏览器没测试
function notify(title, content) {
    if(!title && !content){
        title = "桌面提醒";
        content = "您看到此条信息桌面提醒设置成功";
    }
    var iconUrl = "/images/send_ok.png";
    
    if (window.webkitNotifications) {
        //chrome老版本
        if (window.webkitNotifications.checkPermission() == 0) {
            var notif = window.webkitNotifications.createNotification(iconUrl, title, content);
            notif.display = function() {}
            notif.onerror = function() {}
            notif.onclose = function() {}
            notif.onclick = function() {this.cancel();}
            notif.replaceId = 'Meteoric';
            notif.show();
        } else {
            window.webkitNotifications.requestPermission($jy.notify);
        }
    }
    else if("Notification" in window){
        if (Notification.permission === "granted") {
            var notification = new Notification(title, {
                "icon": iconUrl,
                "body": content,
            });
        }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function(permission) {
                // Whatever the user answers, we make sure we store the
                // information
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }
                if (permission === "granted") {
                    var notification = new Notification(title, {
                        "icon": iconUrl,
                        "body": content,
                    });
                }
            });
        }
    }
}