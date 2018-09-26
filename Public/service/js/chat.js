/*发送消息*/
function send(headSrc,str){
	var html="<div class='send'><div class='msg'><img src="+headSrc+" /><span>小Q</span>"+
	"<p><i class='msg_input'></i>"+str+"</p></div></div>";
	upView(html);
}
/*接受消息*/
function show(headSrc,str){
	var html="<div class='show'><div class='msg'><img src="+headSrc+" /><span>小</span>"+
	"<p><i class='msg_input'></i>"+str+"</p></div></div>";
	upView(html);
	$('.footer').find('input').val('');
}
/*更新视图*/
function upView(html){
	$('.message').append(html);
	$('.message')[0].scrollTop=$('.message')[0].scrollHeight;
	

}
function sj(){
	return parseInt(Math.random()*10)
}
$(function(){
	$('.footer').on('keyup','input',function(){
		if($(this).val().length>0){
			$(this).next().css('background','#114F8E').prop('disabled',true);

		}else{
			$(this).next().css('background','#ddd').prop('disabled',false);
		}
	})
	// $('.footer').on('click','input',function(){
	// 	$(".message").css("height",window.innerHeight);
	// 	var el = this;
	// 	setTimeout(function(){
	// 		el.scrollIntoView(true);
	// 		document.body.scrollTop = document.body.scrollHeight;
	// 		ws.send(document.body.scrollTop);
	// 	},100);
		
	// })
	$('.footer').on('focus','input',function()
	{
		var el = this;	
		setTimeout(function(){
			el.scrollIntoViewIfNeeded(true);
			// document.body.scrollTop = document.body.scrollHeight;
			// ws.send(document.body.scrollTop);
		},300);
	})
	$('.footer').on('blur','input',function(){
		$(".message").css("height","100%");
	});
	$('.footer').on('keypress','input',function(){
		var keycode = event.keyCode;
		var searchName = $(this).val();
		if(keycode == '13') {
			ws.send(searchName);
		}

	})
	$('.footer p').click(function(){
		ws.send($(this).prev().val());
	})
})

/*测试数据*/
var arr=['我是小Q','好久没联系了！','你在想我么','怎么不和我说话','跟我聊会天吧'];
var imgarr=['../../Public/service/images/touxiang.png','../../Public/service/images/touxiangm.png']
var ws = null;
test()
function test(){
	ws = IWebSocket({
		uri:'echo.websocket.org'
    // 可以自定义四大事件
    ,onOpen: function(event) {
    	ws.send('连接成功！');
        // send(imgarr[1],'连接成功！');
    }
    ,onClose: function(event){
    	console.log("阅读时长统计WebSocket关闭！");
    	ws.close();
    },onMessage: function(event) {
    	console.log(event.data);
    	if(event.data != "" && event.data != '连接成功！'){
    		show(imgarr[1],event.data);
    	}else if (event.data == '连接成功！'){
    		upView('<div class="time"><div class="link_send">'+event.data+'</div></div>');
    	}


    }
});
	$.ajax({
		url:'',
		data:{},
		type:'GET',
		dataType:'json',
		success:function(){
			
		}
	})
}