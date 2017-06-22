~(function(){
	document.domain = '163.com';
	//帖子ID
	var pid = "";
	//发送中
	var isSend = false;
	//上传图片权限token
	var token = "";
	//图片数组
	var images = [];
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return decodeURIComponent(r[2]); return null; 
	}
	//清除两边的空格
	String.prototype.trim = function() { 
		var reg = new RegExp("(^\\s*)|(\\s*$)","g");
	  	return this.replace(reg, ''); 
	};
	window.toast = function(msg, obj){
		var $r;
		if($(".ypw-l").length > 0){
			$r = $(".ypw-l");
		}else{
			$r = $(".cc");
		}
		var $toast = $("<div class='ypw-toast'>"+msg+"</div>");
		var top = obj.offset().top ;
		var ltop = $r.offset().top;
		top = top - ltop - 40;
		$toast.css("top",top+"px").appendTo($r).fadeIn(600).delay(1000).fadeOut(300,function(){$(this).remove()});
	}
	function init(){
		//获取帖子
		getThread();
		//获取上传权限token
		getFpToken();
		$("#bold").on("click",function(){
			$(this).toggleClass("active");
			RE.restorerange();
			RE.setBold();
		});
		$("#strikeThrough").on("click",function(){
			$(this).toggleClass("active");
			RE.restorerange();
			RE.setStrikeThrough();
		});
		window.REItemsCallback = function(items){
			if(items.length < 1 ){
				$("#bold").removeClass("active");
				$("#strikeThrough").removeClass("active");
				return;
			}
			items = items.join(",");
			if(items.indexOf("bold") > -1){
				if(!$("#bold").hasClass("active")){
					$("#bold").addClass("active");
				}
			}else{
				$("#bold").removeClass("active");
			}
			if(items.indexOf("strikeThrough") > -1){
				if(!$("#strikeThrough").hasClass("active")){
					$("#strikeThrough").addClass("active");
				}
			}else{
				$("#strikeThrough").removeClass("active");
			}
		}
		$("#insertImg").on("click",function(){
			$("#imgFile").click();
		});
		$("#imgFile").on("change",function(){
			uploadImg();
		});
		$("#sendThread").on("click",function(){
			if(isSend) return;
			if(!checkForm()) return;
			isSend = true;
			var content = compileContent();
			var json = {
				title: $("#title").val(),
				category : 0,
				images : images,
				content : content
			}
			$.ajax({
				type:"patch",
				url: "/api/v2/thread/"+pid,
				contentType:"application/json",
				data:JSON.stringify(json),
				success:function(res){
                	isSend = false;
                	toast("发送成功！", $("#sendThread"));
                	location.href = location.origin + "/evolution/pages/thread-edit.html?pid="+pid+"&ptype=1";
                	$("#formMsg").addClass("info-msg").removeClass("error-msg").html("发送成功！");
				},
				error:function(xhr, textStatus, e){
					var rt = JSON.parse(xhr.responseText);
					$("#formMsg").addClass("error-msg").removeClass("info-msg").html(rt.message);
					isSend = false;
				}
			});
		});
		window.onbeforeunload = function(){
      		return "如果离开页面，编辑的数据不会得到保存，确定要离开吗？";
       	}
	}
	//获取帖子
	function getThread(){
		$.ajax({
		    url: "/api/v2/thread/" + pid,
		    type: "get",
		    dataType: "json",
		    success: function(res) {
		    	if(res.title){
		    		imageDatas = res.images;
		    		if(!checkRights(res.rights)){
		    			location.href = "http://ypw.163.com/w/404";
		    			return;
		    		}
		    		var content = res.content;
		    		content = content.replace(/<!--\s*(IMG|APP)[0-9]+\s*-->/gi,function(curVal){
						var index = /\d{1,}/g.exec(curVal);
						var img = imageDatas[index];
						var temp = " <img class='c-img' style='width:"+img.width+";height:"+img.height+";'  src='"+img.url+"'/>";
						return temp;
					});
					$("#title").val(res.title);
					$("#editor").html(content);
					//剩余活跃时间
					var seconds = res.life.seconds;
					$("#selLife").find("option:selected").html(timeHandle(seconds));
		    	}
		    },
		    error: function(xhr){
		    	if(xhr.status == 404){
		    		location.href = "http://ypw.163.com/w/404";
		    	}
		    }
		});
	}
	//时间处理
	function timeHandle(time){
		var t;
		if(time <= 0 ){
			t = 0;
		}else if(time < 60){
			t = parseInt(time) + "秒";
		}else if(time < 60*60*2){
			t = parseInt(time/60) + "分钟";
		}else{
			t = parseInt(time/3600) + "小时";
		}
		return t;
	}
	//检查权限，是否有编辑帖子权限 THREAD_EDIT = 1 << 10
	function checkRights(rights){
		var result = rights & (1<<10);
		if(result > 0){
			return true;
		}else{
			return false;
		}
	}
	//编译内容，将图片标签转换为<!--IMG0-->，其中0为内容中图片序号
	function compileContent(){
		var content = $("#editor").html();
		var imgs = $("#editor").find("img");
		for (var i = 0; i < imgs.length; i++) {
			var img = {
				width:imgs[i].naturalWidth,
				height: imgs[i].naturalHeight,
				url: imgs[i].src
			}
			images.push(img);
		}
		var count = 0;
		content = content.replace(/<img[^>]+\/?>/gi,function(curVal,index){
			return "<!--IMG"+(count++)+"-->";
		});
		
		return content;
	}
	function uploadImg(){
		$("#uploadForm").ajaxSubmit({
		    dataType: 'json',
		    beforeSend: function() {
		        // 设置进度条为0
		    },
		    uploadProgress: function(event, position, total, percentComplete) {
		        // 更新进度条
		        console.log(position);
		        console.log(percentComplete);
		    },
		    success: function(data) {
		        // 设置进度条为100%，然后处理数据
		        if (data['status'] == 200) {
		            // 保存 signature 和 body，发送到服务端验证保存文件元信息
		            var signature = data['headers']['X-Ntes-Signature'];
		            var body = data['body'];
		            var json_body = $.parseJSON(body);
		            RE.insertImage(json_body['url'],"", json_body.picSize[0],json_body.picSize[1]);
//		            console.log('上传' + data['filename'] + '成功，文件URL是：' + json_body['url']);
		        } else if (data['status'] == 400 && data['body'] == 'File Size Invalid') {
		            console.log('悲剧，您上传的文件' + data['filename'] + '超过5M啦！！');
		        } else if (data['status'] == 400 && data['body'] == 'File Type Invalid') {
		            console.log('矮油，只能上传图片哦！！');
		        } else {
		            console.log('这不科学，上传出现了意想不到的错误，赶紧联系客服！！');
		        }
		    }
		});
	}
	//获取上传权限token
	function getFpToken(){
		$.ajax({
		    url: "/api/v2/fp_tokens",
		    type: "get",
		    dataType: "json",
		    success: function(res) {
		    	if(res){
		    		token = res.token;
		    		$("#authorization").val(token);
		    	}
		    }
		});
	}
	function checkForm(){
		var title = $("#title").val();
		var content = $("#editor").html();
		if(title.trim() == ""){
			$("#formMsg").addClass("error-msg").removeClass("info-msg").html("标题内容不能为空");
			return false;
		}else if(title.length >= 20){
			$("#formMsg").addClass("error-msg").removeClass("info-msg").html("标题内容必须在20个字符以内");
			return false;
		}else if(content.trim() == "" ){
			$("#formMsg").addClass("error-msg").removeClass("info-msg").html("内容不能为空");
			return false;
		}else{
			$("#formMsg").addClass("info-msg").removeClass("error-msg").html("退出本页面草稿自动保存");	
			return true;
		}
	}
	$(function(){
		pid = getQueryString("pid");
		init();
		
		
	})
})();
