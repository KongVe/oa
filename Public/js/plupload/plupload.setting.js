var uploader
function uploader_init(){
	var settings={
		runtimes : 'html5,flash',
		browse_button : 'pickfiles',
		container: 'uploader',
		max_file_size : '200mb',
		url :  root_path+upload_url,
		flash_swf_url : root_path+'/Public/js/plupload/plupload.flash.swf',
		filters : [
			{title : "Office Files", extensions : "doc,docx,dox,xls,xlsx,ppt,pptx,pdf,csv,tsv,txt"},
			{title : "Image Files", extensions : "jpg,gif,png,tif,xps,psd,bmp,cad"},
			{title : "Zip Files", extensions : "zip,rar"},
			{title : "Video Files", extensions : "mp4,avi"}	
		]
	};

	uploader = new plupload.Uploader(settings);
	uploader.init();
	if($("#uploader .tbody").length>0){
		$("#uploader .tbody .loading").css("width","100%");
		$("#uploader .thead").show();
		$("#uploader .tbody").each(function(){
			id=$(this).attr("filename");
			filename=$(this).attr("filename");
			size=$(this).attr("size");
			file=new plupload.File(id,filename,size);
			file.status=plupload.DONE;
			count=uploader.files.length;
			uploader.files[count]=file;
		})		
	}
	uploader.bind('FilesAdded', function(up, files) {
		$("#uploader li.thead").show();
		// console.log(files);
		

		
		uploader.start();
	});

	uploader.bind('UploadProgress', function(up, file){
		$("#"+file.id).find("a.del").hide();
		$("#"+file.id).find('.loading').css("width",file.percent+"%");
	});

	uploader.bind('FileUploaded', function(up,file,data){
		console.log(up);
		console.log(file);
		console.log(file.response);
		console.log(data);
		
		var myObject = eval('(' + data.response + ')');
		console.log(myObject);
		
		if(!myObject.id){
			for (var i = 0; i < $("#file_list li").length; i++) {
				$("#file_list li").eq(i);
				if($("#file_list li").eq(i).attr('add_file')==null){
					$("#file_list li").eq(i).remove();
				}
			};
			alert(data.response);
			return;
		}

		html='<li class="tbody" id="'+file.id+'" add_file>\n';
		html+='<div class="loading"></div>\n';
		html+='<div class="data">\n';
		if(myObject.action){
			html+='<span class="del text-center"><a class="link" onclick="doImgActionFromUpload(this,'+myObject.id+',&quot;'+myObject.url+'&quot;);">选择</a> <a class="link del">删除</a></span>\n';
		}else{
			html+='<span class="del text-center"><a class="link del">删除</a></span>\n';
		}

		html+='<span class="size text-right">'+plupload.formatSize(myObject.size)+'</span>';

		// if(myObject.showImg){
		// 	html+='<span class="text-right"><a href="/'+myObject.url+'" target="_blank"><img src="/'+myObject.url+'" style="height:40px"/></a></span>\n';
		// }

		html+='<span class="auto autocut" style="width:60%;position: absolute;" title="'+myObject.name+'">'+myObject.name+'</span>';
		html+='</li>';
		html+='</div>\n';

		$('#file_list').append(html);

		if($("#add_file").length!=0){
			$("#add_file").val($("#add_file").val()+myObject.id+";")
		}
		$("#"+file.id).attr("add_file",myObject.id);
		if($("#save_name").length!=0){
			$("#save_name").val($("#save_name").val()+myObject.savename+";")
		}
		$("#"+file.id).find("a.del").show();

		//重新注册删除监听器
		$("#uploader a.del").on('click',function(){
			
			if (confirm("确定要删除吗？")){
				id=$(this).parents("li").attr("id");
				file=uploader.getFile(id);
				add_file=$(this).parents("li").attr("add_file");
				$("#add_file").val($("#add_file").val().replace(add_file + ";", ""));			
				if(add_file.length>0){
					$(this).parents("li").remove();
					sendAjax(del_url, 'id=' + $(this).attr("id"));
				}else{
					uploader.removeFile(file);
					$(this).parents("li").remove();
				}
			}
		});

	});

	$('#uploadfiles').click(function(){
		uploader.start();
		return false;
	});

	$("#uploader a.del").on('click',function(){
		uploaderDel(this);
	});
}


function uploaderDel(obj){
	if (confirm("确定要删除吗？")){
		id=$(obj).parents("li").attr("id");
		file=uploader.getFile(id);
		add_file=$(obj).parents("li").attr("add_file");
		f_id=$(obj).parents("li").attr("f_id");
		$("#add_file").val($("#add_file").val().replace(add_file + ";", ""));

		if(add_file.length>0){
			$(obj).parents("li").remove();
			sendAjax(del_url, 'id=' + f_id);
		}else{
			uploader.removeFile(file);
			$(obj).parents("li").remove();
		}
	}
}