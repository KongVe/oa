
//window.frames["iframe1"].document.getElementById("J_TSearchForm").children.item(0).children.item(0).setAttribute('data-spm-click','')
var start;
var iframe = window.frames["iframe1"];
var store_name;
init();

function init() {
	document.getElementsByTagName("body").item(0).innerHTML="";

	var dd=document.createElement("div");
	dd.id="control";
	var html1='<div id="control1" style="top: 2px;left: 400px;width: 300px;height: 58px;background: rgb(255, 202, 158);position: fixed;z-index: 10000;"><button onclick="init();">初始化页面</button> &nbsp;&nbsp;<input type="text" id="searchStoreName"/><button onclick="searchStoreName();">搜索排名</button><button onclick="stop();">停止</button><br><div id="store_name"></div><div id="showResult"></div></div>';
	dd.innerHTML=html1;
	document.getElementsByTagName("body").item(0).appendChild(dd);

	var height=document.body.scrollHeight;

	if(document.getElementById("iframe1")==null){
		var iframe=document.createElement("iframe");
		iframe.id="iframe1";
		iframe.name="iframe1";
		iframe.src="http://s.taobao.com/search?q=%E6%B5%8B%E8%AF%95";
		iframe.height=height;
		iframe.width="100%";
		document.getElementsByTagName("body").item(0).appendChild(iframe);
	}else{
		iframe.src="http://s.taobao.com/search?q=%E6%B5%8B%E8%AF%95";
		iframe.height=height;
		iframe.width="100%"; 
	}
}

function stop () {
	 clearInterval(start);//清除监听
}
function searchStoreName() {
	var iframe=window.frames["iframe1"];

	store_name=document.getElementById("searchStoreName").value;
	document.getElementById("store_name").innerHTML="搜索词："+store_name;
	if(store_name){
		var name_list=iframe.document.getElementsByClassName("shop");

		var result=searchFromList(name_list,store_name);
		if(result!==false){
			var page=getHandlePage();
			showResult("查找成功，在第 "+page+"页的 第"+(result+1)+"个位置",result);
		}else{
			var next_obj=getNextPageButtonObj();
			if(next_obj){
				next_obj.click();

				start = setInterval('check()', 800);		
		
			}else{
				alert("获取下一页链接错误,请查看是否查找完所有页面");
			}
			
		}
	}else{
		//alert("输入有错误");
		return;
	}
}

function check() {
	if (window.frames["iframe1"].document.readyState == 'complete') {
	    try{
	        clearInterval(start);//执行成功，清除监听
	        searchStore();
	    }catch(err){return true;}
	}
}

function searchStore() {
	
	var iframe = window.frames["iframe1"];
	var name_list=iframe.document.getElementsByClassName("shop");
	var result=searchFromList(name_list,store_name);
	if(result!==false){
		
		var page=getHandlePage();
		showResult("查找成功，在第 "+page+"页的 第"+(result+1)+"个位置",result);
	}else{
		var next_obj=getNextPageButtonObj();
	
		if(next_obj){
			next_obj.click();
			
			start = setInterval('check()', 800);

		}else{
			alert("获取下一页链接错误,请查看是否查找完所有页面");
		}
		
	}
}

function searchFromList(shop_list,store_name){
	for (var i = 0; i < shop_list.length; i++) {
		var name=shop_list[i].children[0].children[1].innerHTML;
		if(!shop_list[i]){
			continue;
		}
		if(name.indexOf(store_name) >= 0 ){
			return i;//return shop_list[i].children[0].children[1];
		}
	};
	return false;
}
function getNextPageButtonObj(is_iframe){
	var iframe=window.frames['iframe1'];
	var list=iframe.document.getElementsByClassName("J_Ajax J_Pager link icon-tag");
	for (var i = 0; i < list.length; i++) {
		if(list.item(i).getAttribute("trace")=="srp_select_pagedown"){
			
			return list.item(i);
		}
	};
	return false;
}

function getHandlePage() {
	var iframe=window.frames['iframe1'];

	var page=iframe.document.getElementsByClassName("current")[0].innerHTML;
	if(page!=null || !page){
		return page;
	}else{
		return false;
	}
}

function showResult(str,num){
	var iframe=window.frames["iframe1"];

	var name_list=iframe.document.getElementsByClassName("shop");

	alert(str);
	if(str){
		document.getElementById("showResult").innerHTML=str;
		iframe.document.body.scrollTop=name_list.item(num).offsetTop-300;

		name_list.item(num).children[0].children[1].setAttribute("style","background:yellow");
	}
}
