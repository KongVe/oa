var ueditor = null;
String.prototype.visualLength = function()
{
	var ruler = $("#len_arr");
	ruler.show();
	ruler.text(this);
	var i = ruler[0].offsetWidth;
	ruler.hide();
	return i;
};
// document.cookie="sidebar-toggle-icon=ace-save-state ace-icon fa fa-angle-double-left";
$('#sidebar-collapse').click(function(){
	if(localStorage.getItem("sidebar")== 'left'){
		localStorage.setItem("sidebar",'right');
	}else{
		localStorage.setItem("sidebar",'left');
	}

})

formatDate = function (v, format) {
	if (!v) return "";
	var d = v;
	if (typeof v === 'string') {
		if (v.indexOf("/Date(") > -1)
			d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
		else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
    	format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
    	if (new RegExp("(" + k + ")").test(format)) {
    		format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    	}
    }
    return format;
};
function getParam(paramName) { 
	paramValue = "", isFound = !1; 
	if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) { 
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0; 
		while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++ 
	} 
return paramValue == "" && (paramValue = null), paramValue 
} ;
$.fn.serializeObject = function()  
{  
	var o = {};  
	var a = this.serializeArray();  
	$.each(a, function() {  
		if (o[this.name]) {  
			if (!o[this.name].push) {  
				o[this.name] = [o[this.name]];  
			}  
			o[this.name].push(this.value || '');  
		} else {  
			o[this.name] = this.value || '';  
		}  
	});  
	return o;  
};
function get_form_detail(data,id){//get_form_detail(数据,主键id,子数据列)详情表单填充
	$.each(data,function(i,v){
		var text = '';
		if(v.edit_type != 'hidden'){
			text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<div type="number" name="'+v.field_key+'"class="form-control" data-edit_type="'+v.edit_type+'">&nbsp;</div>'+
		'</div>'+
		'</div>';
	}else{
		text += '<div class="form-group" hidden>'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<div type="number" name="'+v.field_key+'"class="form-control" data-edit_type="'+v.edit_type+'">&nbsp;</div>'+
		'</div>'+
		'</div>';
	}
	$('#'+id).append(text);
})
}  
function get_form_list(data,id){//get_form_list(数据,主键id,子数据列)表单填充
	$.each(data,function(i,v){
		var text = '';
		switch(v.edit_type){
		case 'number'://数字
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<input type="number" name="'+v.field_key+'" class="form-control" data-edit_type="'+v.edit_type+'" placeholder="'+v.show_name+'"/>'+
		'</div>'+
		'</div>';
		$('#'+id).append(text);
		break;
		case 'text'://字符串
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<input type="text" name="'+v.field_key+'" class="form-control" data-edit_type="'+v.edit_type+'" placeholder="'+v.show_name+'"/>'+
		'</div>'+
		'</div>';
		$('#'+id).append(text);
		break;
		case'select_singer'://下拉单选
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<select type="text" name="'+v.field_key+'" class="form-control" data-edit_type="'+v.edit_type+'" id="'+v.field_key+'_select2" placeholder="'+v.show_name+'"><option></option></select>'+
		'</div>'+
		'</div>';
		$('#'+id).append(text);
		var select_list =[];
		if(v.field_select_list){
			$.each(v.field_select_list,function(q,k){
				select_list.push({id:q,text:k});
			})
			$('#'+v.field_key+'_select2').select2({
				placeholder:""+v.show_name+"",
				width:'100%',
				data:select_list
			})
		}
		break;
		case 'select_multiple'://下拉多选
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<select type="text" name="'+v.field_key+'"multiple="multiple" class="form-control" data-edit_type="'+v.edit_type+'" id="'+v.field_key+'_select2" placeholder="'+v.show_name+'"/>'+
		'</div>'+
		'</div>';
		$('#'+id).append(text);
		var select_list =[];
		if(v.field_select_list){
			$.each(v.field_select_list,function(q,k){
				select_list.push({id:q,text:k.replace(/<[^>]+>/g,'')});
			})
			$('#'+v.field_key+'_select2').select2({
				placeholder:v.show_name,
				width:'100%',
				multiple:true,
				data:select_list
			})
		}
		break;
		case 'radio'://点击单选
		var radio_list = '';
		if(v.field_select_list){
			$.each(v.field_select_list,function(q,k){
				radio_list += '<label>'+
				'<input type="radio" name="'+v.field_key+'"value="'+q+'" class="ace" data-edit_type="'+v.edit_type+'"/>'+
				'<span class="lbl">'+k+'</span>'+
				'</label>';
			})
		}else{
			radio_list='';
		}
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span><div class="radio">'+
		radio_list+
		'</div></div>'+
		'</div>';
		$('#'+id).append(text);
		break;
		case 'checkbox'://复选
		var checkbox_list = '';
		if(v.field_select_list){
			$.each(v.field_select_list,function(q,k){
				checkbox_list += '<label>'+
				'<input type="checkbox" name="'+v.field_key+'"value="'+q+'" class="ace" data-edit_type="'+v.edit_type+'"/>'+
				'<span class="lbl">'+k+'</span>'+
				'</label>';
			})
		}
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span><div class="checkbox">'+
		checkbox_list+
		'</div></div>'+
		'</div>';

		$('#'+id).append(text);
		break;
		case 'date_choose'://时间点
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<input type="text"class="input-sm form-control" placeholder="开始"id="'+v.field_key+'" name="'+v.field_key+'" data-edit_type="'+v.edit_type+'"/>'
		'</div>'+
		'</div>';
		$('#'+id).append(text);
		$('#'+v.field_key).datetimepicker({
			format: 'YYYY-MM-DD HH:mm',
			clearBtn: true  //添加清除按钮，可选值：true/false
			,icons: {
				time: 'fa fa-clock-o',
				date: 'fa fa-calendar',
				up: 'fa fa-chevron-up',
				down: 'fa fa-chevron-down',
				previous: 'fa fa-chevron-left',
				next: 'fa fa-chevron-right',
				today: 'fa fa-arrows ',
				clear: 'fa fa-trash',
				close: 'fa fa-times'
			}

		}).next().on(ace.click_event, function(){
			$(this).prev().focus();
		});
		break;
		case 'date_range'://时间段
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<input type="text"class="input-sm form-control" placeholder="开始"id="'+v.field_key+'" name="'+v.field_key+'" data-edit_type="'+v.edit_type+'"/>'
		'</div>'+
		'</div>';
		$('#'+id).append(text);
		$('#'+v.field_key).datepicker({
			autoclose:true,
			format:'yyyy-mm-dd',
			language:'zh-CN',
			clearBtn: true  //添加清除按钮，可选值：true/false
			,todayHighlight:true
		})		
		break;
		case 'rich_text'://富文本
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<textarea type="text" class="form-control"style="height:400px" contenteditable="true" placeholder="'+v.show_name+'"id="'+v.field_key+'_rich" name="'+v.field_key+'" data-edit_type="'+v.edit_type+'"></textarea>'
		'</div>'+
		'</div>';
		$('#'+id).append(text);
		ueditor = UE.getEditor(v.field_key+'_rich',{
			toolbars: [[
'undo', //撤销
'redo', //重做
'bold', //加粗
'italic', //斜体
'underline', //下划线
'strikethrough', //删除线
'subscript', //下标
'fontborder', //字符边框
'superscript', //上标
'formatmatch', //格式刷
'pasteplain', //纯文本粘贴模式
'selectall', //全选
'horizontal', //分隔线
'removeformat', //清除格式
'deletecaption', //删除表格标题
'inserttitle', //插入标题
'cleardoc', //清空文档
'fontfamily', //字体
'fontsize', //字号
'paragraph', //段落格式
'link', //超链接
'justifyleft', //居左对齐
'justifyright', //居右对齐
'justifycenter', //居中对齐
'justifyjustify', //两端对齐
'forecolor', //字体颜色
'backcolor', //背景色
'insertorderedlist', //有序列表
'insertunorderedlist', //无序列表
'rowspacingtop', //段前距
'rowspacingbottom', //段后距
'lineheight', //行间距
'customstyle', //自定义标题
'autotypeset', //自动排版
'touppercase', //字母大写
'tolowercase', //字母小写
'simpleupload', //单图上传
'insertimage'//多图上传
]],
wordCount:false
,enableAutoSave: false
});
		
		break;
		case 'textarea'://文本
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<textarea type="text"class="input-sm form-control" placeholder="'+v.show_name+'"id="'+v.field_key+'" name="'+v.field_key+'" data-edit_type="'+v.edit_type+'"></textarea>'
		'</div>'+
		'</div>';
		$('#'+id).append(text);
		break;
		case 'switch'://开关
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<label><input name="'+v.field_key+'" class="ace ace-switch ace-switch-4" type="checkbox" data-edit_type="'+v.edit_type+'"><span class="lbl"></span></label>'+
		'</div>';
		$('#'+id).append(text);
		break;
		case 'password'://密码
		text += '<div class="form-group">'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<input name="'+v.field_key+'" class="form-control" type="password" placeholder="'+v.show_name+'" data-edit_type="'+v.edit_type+'"/>'+
		'</div>';
		$('#'+id).append(text);
		break;
		case 'hidden':
		text += '<div class="form-group" hidden>'+
		// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
		' <div class="input-group">'+
		'<span class="input-group-addon">'+v.show_name+'</span>'+
		'<input name="'+v.field_key+'" class="form-control" type="hidden" placeholder="'+v.show_name+'" data-edit_type="'+v.edit_type+'"/>'+
		'</div>';
		$('#'+id).append(text);
		break;
		case 'custom':
		newCustom(id,v);
		break;
	}
})
}
function str_reg(htmlStr){
	var  reg = /<[^>]+>/g;
	return reg.test(htmlStr);
}
function clomodel(table ,data,pager,url){
	$.each(config_data.title_list,function(i,v){
		var k = v.key;
		var obj = {};
		if(v.sort_key){
			obj['name'] = v.sort_key;
			// obj['index'] = v.key;
			obj['formatter'] = function(cellvalue, options,rowObject){

				var name = '';
				$.each(config_data.title_list,function(i,v){
					if(options.colModel.name == v.sort_key){
						name = rowObject[v.key]?rowObject[v.key]:'';
						// if(str_reg(name)){
						// 	name = name.replace(/<[^>]+>/g,'');
						// }
						return false;
					}

				})
				return name
			}
		}else{
			obj['name'] = v.key;
		}
		if(v.val){
			obj ['label'] = v.val;
		}else{
			obj['hidden'] = true
		}
		if(v.sort == true){
			obj['sortable'] =true;
		}else{
			obj['sortable'] = false;
		}
		if(!data instanceof Array){
		if(k){
			var len_arr_list=0;
			$.each(data.results,function(i,v){
				var a = v[k];
				if(k == 'action_control'){
					a = '';
				}
				if(!a instanceof Array){
					if(a.visualLength()>len_arr_list){
						len_arr_list = a.visualLength();
					}
					if(obj.label.visualLength()>len_arr_list){
						len_arr_list = obj.label.visualLength();
					}
				}
			})
      // if(len_arr_list<30){
      // 	 obj['width'] = 30
      // }else if(len_arr_list>150){
      // 	obj['width'] = 150
      // }else 
      if(k=='id'){
      	obj['width'] = len_arr_list;
      }
    // else{
    //   	obj['width'] = len_arr_list
    //   }

}
}
if(k== 'action_control'){
    	// obj['width'] = 150;
    	obj['formatter']= function(cellvalue, options,rowObject){
    		// if(cellvalue){
    		// 	if(cellvalue.action_control){
    		// 		var name = '';
    		// 		$.each(cellvalue.action_control,function(k,q){
    		// 			name += '<a class="btn">'+q+'</a>'
    		// 		})
    		// 	}
    		// }else{
    		// 	return '';
    		// }
    		return '<a class="btn btn-sm" onclick="edit('+rowObject.id+')">编辑</a>&nbsp;<a class="btn btn-sm" onclick="detail('+rowObject.id+')">详情</a>'
    		// +'<a class="btn" onclick="addRow('+options.rowId+')">子表</a>'
    	}
    }
    obj['align'] = 'center';
      // obj['width'] = 100
      colModel.push(obj);
  })
	Get_Grid(table,data,pager,url);
};
function sub_list(id,row,url,pager,data,parentid){
	// var rowList = [];
	// for(var i = 0;i<(Number(data.list_total_count)/Number(data.list_rows));i++){
	// 	rowList.push((data.list_rows*(i+1)))
	// }
	$('#'+id).setGridWidth($('#'+parentid).width())
	$("#" + id).jqGrid({
		url:url,
		datatype: "json",
		height:'100%', 
		autoheight:true,
		width:'100%',
		colModel:child_colModel,
		viewrecords : true,
		altRows: true,//单双行样式不同
		// totalCount:data.list_total_count,
          jsonReader : { // jsonReader来跟服务器端返回的数据做对应
			root : "data.results", // 包含实际数据的数组
			page : "data.p", // 当前页
			total :'data.page_count',
			records : "data.list_total_count", // 查询出的记录数
			rowList:[10,20,50,100,1000,'data.list_total_count'],
                rowNum:'data.list_rows',
			id:'id',
			repeatitems :false
		},
		pagerpos: 'left',
		recordpos: 'right',
		prmNames: {
                    page: "p"   // 表示请求页码的参数名称
                },
                rowList:[10,20,50,100,500,1000],
                rowNum:20,
                pager : pager,
                shrinkToFit: false,
                // autoScroll: true, 
                multiselect: true,
                
                loadComplete : function() {
                	var table = this;
                	setTimeout(function(){
                		updatePagerIcons(table);
                	}, 0);
                	$('#'+id).setGridWidth($('#'+parentid).width())
                	if($('.ui-jqgrid-htable').width()>$('div.ui-jqgrid-hdiv').width())
                		$('div.ui-jqgrid-hdiv').width($('.ui-jqgrid-htable').width())
                	if($('.ui-jqgrid-htable').width()>$('ui-jqgrid-bdiv').width())
                		$('.ui-jqgrid-bdiv').width($('.ui-jqgrid-htable').width());
                }
                ,onSortCol:function(index,iCol,sortorder){
                	var order_sort = {};
                	order_sort[index] = sortorder == 'asc' ? 1:0;
      	// var postData = submit_list('#search_table');
      	var postData = $('#'+id).jqGrid("getGridParam", "postData")||{};
      	if(postData['order_sort'])
      		$.each(postData['order_sort'], function (k, v) {
      			delete postData['order_sort'][k];
      		});
      	postData['order_sort'] = order_sort;
      	postData['sidx'] = index;
      	postData['sord'] = sortorder;
      	$("#"+id).jqGrid("setGridParam", {
      		postData:postData,
      	}).trigger("reloadGrid");
      }
      
      	});
	
}
function Get_SubGrid(table,data,pager,search_url){
	// var rowList = [];
	// for(var i = 0;i<(Number(data.list_total_count)/Number(data.list_rows));i++){
	// 	rowList.push((data.list_rows*(i+1)))
	// }
	$('#'+table).jqGrid({
		subGrid : true,
		// data:data.results,
		subGridOptions : {
			plusicon : "fa fa-angle-down center bigger-200 blue",
			minusicon  : "fa fa-angle-up center bigger-200 blue",
			openicon : "ace-icon fa fa-chevron-right center orange"
		},
		subGridRowColapsed :function(subgridDivId, rowId){
			var subgridTableId = subgridDivId + "_t";
			$('#'+subgridTableId).jqGrid('clearGridData')
			$("#" + subgridDivId).html('');
		},
          //for this example we are using local data
          subGridRowExpanded: function (subgridDivId, rowId) {
          	var subgridTableId = subgridDivId + "_t";
          	$("#" + subgridDivId).html("<table id='" + subgridTableId + "'></table><div id='"+subgridTableId+"+pager'></div>");
          	// $.ajax({
          	// 	url:config_data.child_data.child_search_url+'?'+config_data.child_data.id_name+'='+rowId,
          	// 	type:'GET',
          	// 	dataType:'json',
          	// 	success:function(data){
          			if(child_colModel.length == 0){
          			child_clomodel([]);
          		}
          			sub_list(subgridTableId,rowId,config_data.child_data.child_search_url+'?'+config_data.child_data.id_name+'='+rowId,subgridTableId+'pager',[],subgridDivId);
          		// }
          	// })
          },
          url:search_url,
          datatype: "json",
          height:'100%', 
          autoheight:true,
          width:'100%',
          colModel:colModel,
          viewrecords : true,
		altRows: true,//单双行样式不同
		// totalCount:data.list_total_count,
          jsonReader : { // jsonReader来跟服务器端返回的数据做对应
			root : "data.results", // 包含实际数据的数组
			page : "data.p", // 当前页
			total :'data.page_count',
			records : "data.list_total_count", // 查询出的记录数
			
                rowNum:'data.list_rows',
			id:'id',
			repeatitems :false
		},
		pagerpos: 'left',
		recordpos: 'right',
		prmNames: {
                    page: "p"   // 表示请求页码的参数名称
                },
                 rowList:[10,20,50,100,1000],
                rowNum:20,
                pager : pager,
                shrinkToFit: false,
                // autoScroll: true, 
                multiselect: true,
                
                loadComplete : function() {
                	var table = this;
                	setTimeout(function(){
                		updatePagerIcons(table);
                	}, 0);
                	if($('.ui-jqgrid-htable').width()>$('div.ui-jqgrid-hdiv').width())
                		$('div.ui-jqgrid-hdiv').width($('.ui-jqgrid-htable').width())
                	if($('.ui-jqgrid-htable').width()>$('ui-jqgrid-bdiv').width())
                		$('.ui-jqgrid-bdiv').width($('.ui-jqgrid-htable').width());
                }
                ,onSortCol:function(index,iCol,sortorder){
                	var order_sort = {};
                	order_sort[index] = sortorder == 'asc' ? 1:0;
      	// var postData = submit_list('#search_table');
      	var postData = $('#'+table).jqGrid("getGridParam", "postData")||{};
      	if(postData['order_sort'])
      		$.each(postData['order_sort'], function (k, v) {
      			delete postData['order_sort'][k];
      		});
      	postData['order_sort'] = order_sort;
      	postData['sidx'] = index;
      	postData['sord'] = sortorder;
      	$("#"+table).jqGrid("setGridParam", {
      		postData:postData,
      	}).trigger("reloadGrid");
      }

      	})
};
function modelHeight(){
	if(IsPC() != false){
		$('#myModal').find('div').eq(0).removeClass('modal-full').addClass('modal-dialog');
		var height_content = document.documentElement.clientHeight-61-69-60 ;
		$('#table-content').height(height_content);
	}else{
		$('#myModal').find('div').eq(0).addClass('modal-full').removeClass('modal-dialog');
		var height_content = document.documentElement.clientHeight-61-69;
		$('#table-content').height(height_content);
	}
}
function Get_Grid(table,data,pager,search_url){
	var rowList = [];
	for(var i = 0;i<(Number(data.list_total_count)/Number(data.list_rows));i++){
		rowList.push((data.list_rows*(i+1)))
	}
	$('#'+table).jqGrid({
		url:search_url,
		datatype: "json",
		height:'100%', 
		autoheight:true,
		width:'100%',
		colModel:colModel,
		viewrecords : true,
		altRows: true,//单双行样式不同
		totalCount:data.list_total_count,
          jsonReader : { // jsonReader来跟服务器端返回的数据做对应
			root : "data.results", // 包含实际数据的数组
			page : "data.p", // 当前页
			total :'data.page_count',
			records : "data.list_total_count", // 查询出的记录数
			id:'id',
			repeatitems :false
		},
		pagerpos: 'left',
		recordpos: 'center',
		prmNames: {
                    page: "p"   // 表示请求页码的参数名称
                },
                rowList:rowList,
                rowNum:data.list_rows,
                pager : pager,
                shrinkToFit: false,
                // autoScroll: true, 
                multiselect: true,
                
                loadComplete : function() {
                	var table = this;
                	setTimeout(function(){
                		updatePagerIcons(table);
                	}, 0);
                	if($('.ui-jqgrid-htable').width()>$('div.ui-jqgrid-hdiv').width())
                		$('div.ui-jqgrid-hdiv').width($('.ui-jqgrid-htable').width())
                	if($('.ui-jqgrid-htable').width()>$('ui-jqgrid-bdiv').width())
                		$('.ui-jqgrid-bdiv').width($('.ui-jqgrid-htable').width());
                }
                ,onSortCol:function(index,iCol,sortorder){
                	var order_sort = {};
                	order_sort[index] = sortorder == 'asc' ? 1:0;
      	// var postData = submit_list('#search_table');
      	var postData = $('#'+table).jqGrid("getGridParam", "postData")||{};
      	if(postData['order_sort'])
      		$.each(postData['order_sort'], function (k, v) {
      			delete postData['order_sort'][k];
      		});
      	postData['order_sort'] = order_sort;
      	postData['sidx'] = index;
      	postData['sord'] = sortorder;
      	$("#"+table).jqGrid("setGridParam", {
      		postData:postData,
      	}).trigger("reloadGrid");
      }

      	})
};
function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
	"SymbianOS", "Windows Phone",
	"iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
};
function showTips(tips, title) {

	$.gritter.add({
		title: title,
		text: tips,
		time: 3000,
		class_name: 'gritter-info gritter-center'
	});

}
function post_data_list(table,id,type,iframe,edit_id){

	var postData = $($('#'+iframe).contents()).find('#form-edit').serializeObject();
	for(var l in postData){
		switch($($('#'+iframe).contents()).find('#form-edit').find('[name="'+l+'"]').attr('data-edit_type')){
			case'checkbox':
			case'select_multiple':
			if(!(postData[l] instanceof Array)){
				var d = postData[l].split(',');
				postData[l] = d;
			}
			break;
		}
	}
	if(type == 'add'){
		$.ajax({
			url:'./save',
			type:'POST',
			dataType:'json',
			data:postData,
			success:function(data){
				if(data.status == 1){
					showTips(data.info,'提示');
					setTimeout(function(){parent.$('#'+id).modal('hide');},3000)
					$("#"+table).trigger("reloadGrid");


				}else{
					showTips(data.info,'提示');
				}
			},error:function(error,data,dataType){
				showTips(error.responseText,'错误');
			}
		})
	}else{
		postData['id'] = edit_id;
		$.ajax({
			url:'./save?id='+edit_id,
			type:'POST',
			dataType:'json',
			data:postData,
			success:function(data){
				if(data.status == 1){
					showTips(data.info,'提示');
					setTimeout(function(){parent.$('#'+id).modal('hide');},3000)

					$("#"+table).trigger("reloadGrid");

				}else{
					showTips(data.info,'提示');
				}

			},error:function(error,data,dataType){
				showTips(error.responseText,'错误');
			}
		})
	};
};
function updatePagerIcons(table) 

{
	var replacement = {
		'ui-icon-seek-first' : ' ace-icon fa fa-angle-double-left bigger-140',
		'ui-icon-seek-prev' : ' ace-icon fa fa-angle-left bigger-140',
		'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
		'ui-icon-seek-end' : ' ace-icon fa fa-angle-double-right bigger-140'
	};
	$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
		var icon = $(this);
		var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
		if ($class in replacement)
			icon.attr('class', 'ui-icon ' + replacement[$class]);
	});
};

function menu_list_get(){//获取导航菜单数据
	var test = window.location.protocol; 
	test += '//'+ window.location.host+'/User/getUserInfo'; 
	$.ajax({
		url:test,
		type:'GET',
		dataType:'json',
		success:function(data){
			if(data.data.menu_tree.length>0){
				Get_menu_list(data.data);
			}
		},
	})
};
			function Get_menu_list(data){//填充菜单
				var list = '';
				$.each(data.menu_tree,function(i,v){
					var list_child = '';
					if(v._child){
						list_child = get_menu_child(v._child);
						list += '<li><a node="'+v.id+'" href="'+v.url+'" class="dropdown-toggle"><i class="menu-icon fa fa-caret-right"></i><span class="menu-text"></span>'+v.name+'</a><b class="arrow fa fa-angle-down"></b>'+list_child+'</li>' 
					}else{
						list += '<li><a node="'+v.id+'" href="'+v.url+'" ><i class="menu-icon fa fa-caret-right"></i><span class="menu-text"></span>'+v.name+'</a><b class="arrow"></b></li>'
					}
				})
				$('.nav-list').append(list);
				$.each($('.nav-list a[href !="#"][href!=""]'),function(i,v){
					if(v.href == window.location.href){
						$(v).parent().addClass('active');
						if($(v).parent().parent()[0].localName == 'ul'){
							$(v).parent().parent().show();
							$(v).parents('li').addClass('open');
							$(v).parents('li').addClass('active');
							$(v).parents('ul.submenu').show();
						}
					}
				})
				$('#sidebar-collapse i').each(function(i,v){
					if(v.className.indexOf(localStorage.getItem('sidebar')) == -1){
						if(localStorage.getItem('sidebar') == 'left')
							v.className = v.className.replace('right',localStorage.getItem('sidebar'));
						else
							v.className = v.className.replace('left',localStorage.getItem('sidebar'));
					}
				});
			}
			function get_menu_child(data){//子级餐单填充
				var list = '';
				var data_len = data.length-1;
				$.each(data,function(i,v){
					var list_child = '';
					if(i == 0){
						list += '<ul class="submenu">';
					}
					if(v._child){
						list_child = get_menu_child(v._child);
						list += '<li><a node="'+v.id+'" href="'+v.url+'" class="dropdown-toggle"><i class="menu-icon fa fa-caret-right"></i><span class="menu-text"></span><b class="arrow fa fa-angle-down"></b>'+v.name+'</a><b class="arrow"></b>'+list_child+'</li>' 
					}else{
						list += '<li><a node="'+v.id+'" href="'+v.url+'" ><i class="menu-icon fa fa-caret-right"></i><span class="menu-text"></span>'+v.name+'</a><b class="arrow"></b></li>'
					}
					if(i == data_len){
						list += '</ul>'
					}
				})
				return list;
			}
function serch_list(id){//搜索条件添加
	$('#'+id).empty().append('<div class="form-horizontal"></div>');
	$.each(filter_list,function(i,data){
		if(i%2 ==0){
			$('#'+id).find('.form-horizontal').append('<div class="form-group"></div>')
		}
		switch (data.filter_type) {
			case 'str_in_array':
					// 英文逗号分隔，如 33,533,64,text文本
					$('#'+id).find('.form-horizontal').find('.form-group:last').append(
						'<div class="col-sm-6">'+
						// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
						' <div class="input-group">'+
						'<span class="input-group-addon">'+data.title+'</span>'+
						'   <input type="text"class="form-control" placeholder="'+(data.memo||data.title)+'" name="'+data.name+'" data-filter_type="'+data.filter_type+'">'+
						'</div>'+
						'</div>');
					break;
					case 'time_between':
					//1个或者2个input type=text,时间用" - "分隔，如 2018-04-01 - 2018-04-18
					$('#'+id).find('.form-horizontal').find('.form-group:last').append(
						'<div class="col-sm-6">'+
						// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
						' <div class="input-group">'+
						'<span class="input-group-addon">'+data.title+'</span>'+
						'   <input type="text"class="input-sm form-control" placeholder="开始"id="'+data.name+'" name="'+data.name+'start" data-filter_type="'+data.filter_type+'"/><span class="input-group-addon"><i class="fa fa-exchange"></i></span><input type="text"class="input-sm form-control" placeholder="结束"id="'+data.name+'" name="'+data.name+'end"  data-filter_type="'+data.filter_type+'"/>'+
						'</div>'+
						'</div>');
					
					$('#'+id).find('[name="'+data.name+'start"]').datepicker({
						language: 'zh-CN',//选择语言
						autoclose: true,
						// EndDate :new Date(),
						clearBtn: true,  //添加清除按钮，可选值：true/false
						todayHighlight: true,
						format:'yyyy-mm-dd'
					}).on('changeDate', function(ev){            	
						if(ev.date){
							// $('#'+id).find('[name="'+data.name+'end"]').datepicker('setStartDate',formatDate(new Date(ev.date.valueOf()).toLocaleDateString(),'yyyy-MM-dd'))
							$('#'+id).find('[name="'+data.name+'end"]').datepicker('setStartDate', new Date(new Date(ev.date).valueOf()+(1 * 24 * 60 * 60 * 1000)))
						}else{
							$('#'+id).find('[name="'+data.name+'end"]').datepicker('setStartDate',null);
						}
					});
					$('#'+id).find('[name="'+data.name+'end"]').datepicker({
						language: 'zh-CN',//选择语言
						autoclose: true,
						// StartDate :new Date(),
						clearBtn: true,  //添加清除按钮，可选值：true/false
						format:'yyyy-mm-dd',
						todayHighlight: true
					}).on('changeDate', function(ev){  
						if(ev.date){
							// $('#'+id).find('[name="'+data.name+'start"]').datepicker('setEndDate', formatDate(new Date(ev.date.valueOf()).toLocaleDateString(),'yyyy-MM-dd'))
							$('#'+id).find('[name="'+data.name+'start"]').datepicker('setEndDate',new Date(new Date(ev.date).valueOf()-(1 * 24 * 60 * 60 * 1000)))
						}else{
							$('#'+id).find('[name="'+data.name+'start"]').datepicker('setEndDate',null);
						} 

					});
					break;
					case 'multi_select'://多选
					$('#'+id).find('.form-horizontal').find('.form-group:last').append(
						'<div class="col-sm-6">'+
						// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
						' <div class="input-group">'+
						'<span class="input-group-addon">'+data.title+'</span>'+
						'   <select type="select"class="chosen-select form-control" id="'+data.name+'_select2" size="1" multiple="multiple"  placeholder="'+data.title+'"class="col-xs-10 col-sm-5" name="'+data.name+'[]"data-filter_type="'+data.filter_type+'"></div>'+
						'</div>'+
						'</div>');
					var list = [];
					var list_name = '';
					if(data.filter_data){
					$.each(data.filter_data,function(e,q){//选项值
						list.push({id:q.key,text:q.val.replace(/<[^>]+>/g,'')});
						// list += q.key +',';
						// list_name += q.val+',';
						// list += '<option value="'+q.key+'">'+q.val+'</option>';
					});
				}
					// list = list.substr(0,list.length-1);
					// list_name = list_name.substr(0,list_name.length-1);
					$('#'+data.name+'_select2').select2({//插件初始化
						placeholder:data.title,
						data:list,
						Width:'90%'
					});

					// $('#'+data.name+'_select2').append(list);

					break;
					case 'like_left'://模糊搜索 左侧模糊查询
					$('#'+id).find('.form-horizontal').find('.form-group:last').append(
						'<div class="col-sm-6">'+
						// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
						' <div class="input-group">'+
						'<span class="input-group-addon">'+data.title+'</span>'+
						'   <input type="text" class="form-control" placeholder="'+(data.memo||data.title)+'" name="'+data.name+'"data-filter_type="'+data.filter_type+'">'+
						'</div>'+
						'</div></div>');
					break;
					case 'like_right'://模糊搜索 右侧模糊查询
					$('#'+id).find('.form-horizontal').find('.form-group:last').append(
						'<div class="col-sm-6">'+
						// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
						' <div class="input-group">'+
						'<span class="input-group-addon">'+data.title+'</span>'+
						'   <input type="text" class="form-control" placeholder="'+(data.memo||data.title)+'" name="'+data.name+'"data-filter_type="'+data.filter_type+'">'+
						'</div>'+
						'</div></div>');
					break;
					case 'like_between'://模糊搜索 匹配左右模糊查询
					$('#'+id).find('.form-horizontal').find('.form-group:last').append(
						'<div class="col-sm-6">'+
						// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
						' <div class="input-group">'+
						'<span class="input-group-addon">'+data.title+'</span>'+
						'   <input type="text" class="input-sm form-control" placeholder="开始"id="'+data.name+'" name="'+data.name+'start"data-filter_type="'+data.filter_type+'"><span class="input-group-addon"><i class="fa fa-exchange"></i></span><input type="text" class="input-sm form-control" placeholder="结束"id="'+data.name+'" name="'+data.name+'end"data-filter_type="'+data.filter_type+'">'+
						'</div>'+
						'</div></div>');
					break;
					case 'eq'://精确查询
					$('#'+id).find('.form-horizontal').find('.form-group:last').append(
						'<div class="col-sm-6">'+
						// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
						' <div class="input-group">'+
						'<span class="input-group-addon">'+data.title+'</span>'+
						'   <input type="text" class="form-control" placeholder="'+(data.memo||data.title)+'" name="'+data.name+'"data-filter_type="'+data.filter_type+'">'+
						'</div>'+
						'</div></div>');
					break;
					case 'number_between'://最小值和最大值
					$('#'+id).find('.form-horizontal').find('.form-group:last').append(
						'<div class="col-sm-6">'+
						// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
						' <div class="input-group">'+
						'<span class="input-group-addon">'+data.title+'</span>'+
						'   <input type="number" class="input-sm form-control" placeholder="最小值" id="'+data.name+'" name="'+data.name+'start"data-filter_type="'+data.filter_type+'"><span class="input-group-addon"><i class="fa fa-exchange"></i></span><input type="text" class="input-sm form-control" placeholder="最大值"id="'+data.name+'" name="'+data.name+'end"data-filter_type="'+data.filter_type+'">'+
						'</div>'+
						'</div></div>');
					break;
					default:
					// 默认为文本输出

					$('#'+id).find('.form-horizontal').find('.form-group:last').append(
						'<div class="col-sm-6">'+
						// '<label class="col-sm-3 control-label no-padding-right">'+data.title+'</label>'+
						' <div class="input-group">'+
						'<span class="input-group-addon">'+data.title+'</span>'+
						'   <input type="text" class="form-control" placeholder="'+(data.memo||data.title)+'" name="'+data.name+'" data-filter_type="'+data.filter_type+'">'+
						'</div>'+
						'</div></div>');
					break;
				}
				
			});
//加载查询表单按钮
$('#'+id).find('.form-horizontal').append('<div class="clearfix form-actions" >'+
	'<div class="col-md-offset-3 col-sm-12"style="margin-top:.5rem">'+
	'<button class="btn" onclick="re_form('+"search_table"+')">重置</button>&nbsp;&nbsp;&nbsp;&nbsp;'+
	'<button  class="btn btn-info" onclick="submit_form('+"search_table"+')">提交</button>'+
	'</div>'+
	'</div>');

}
function button_list_push(id,data){//按钮组填充
	
	$.each(data,function(i,v){
		if(!v.hidden){
			$('#'+id).append('<button class="btn btn-success" id="btn_'+v.key+'">'+v.name+'</button>&nbsp;&nbsp;')
		}
	})
}
function re_form(id){//清空搜索条件值
	$(id).find('input').each(function(i,v){
		if($(v).attr('data-filter_type') == 'time_between'){
			$(v).val('');
			$(v).datepicker('clearDates');
			
			
		}else{
			$(v).val('')
		}
	})
	$(id).find('select[id]').each(function(i,q){
		$("#"+$(q).attr('id')).select2('val');
	})
}
function submit_form(id){//提交搜索
	
	var post_list = submit_list(id);
	get_list(post_list);

}
function submit_list(id){//搜索条件数据
	var post_list = {};
	post_list['filter']={};
	$(id).find('input[name]').each(function(i,q){//输入框遍历
		if(!$(q).attr('id')){//不含有id
			var name = $(q).attr('name')
			if(!post_list.filter[""+$(q).attr('data-filter_type')+""])
				post_list.filter[""+$(q).attr('data-filter_type')+""] = {}
			post_list.filter[""+$(q).attr('data-filter_type')+""][""+name+""] = $(q).val()
		}else{//存在id值
			var id = $(q).attr('id');
			var id_start =id+'start'
			var id_end = id+'end'
			if(!post_list.filter[""+$(q).attr('data-filter_type')+""])
				post_list.filter[""+$(q).attr('data-filter_type')+""] = {};
			if(!post_list.filter[""+$(q).attr('data-filter_type')+""][""+id+""])
				post_list.filter[""+$(q).attr('data-filter_type')+""][""+id+""] = {}
			post_list.filter[""+$(q).attr('data-filter_type')+""][""+id+""]["0"]=$('input[name="'+id_start+'"]').val();
			post_list.filter[""+$(q).attr('data-filter_type')+""][""+id+""]["1"]=$('input[name="'+id_end+'"]').val();
		}

	})
	$(id).find('select[name]').each(function(i,q){//多选框遍历
		var name = $(q).attr('id').replace('_select2','');
		var value = '';
		if($('#'+($(q).attr('id'))).val() != null){
			$.each($('#'+($(q).attr('id'))).val(),function(k,v){
				value += v+','
			})
			value = value.substr(0,value.length-1);
		}
		if(!post_list.filter[""+$(q).attr('data-filter_type')+""])
			post_list.filter[""+$(q).attr('data-filter_type')+""] = {};
		post_list.filter[""+$(q).attr('data-filter_type')+""][""+name+""] = value ;

	});
	return post_list;//返回数据
}