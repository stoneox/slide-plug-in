(function($){
	$.fn.picTurn = function(options){
		var defalut = {
			flag : 1,
			len : 3,
			timeInterval : 4000,
			autoPlay: 1,
			navigation : 1,
			slideIcon :1
		},
	setting = $.extend({},defalut,options);

	function animate(ele,wid,flag){
		this.wid = wid;
		this.flag = flag;
		this.ele = ele;
	}
	animate.prototype = {
		adjust:function(num){
			var page = num;
			$('.slideSet span').removeClass('active');
			$(".slideSet span").eq(page-1).addClass('active');
		},
		turnRight:function(){
			var This = this;
			if($(This).is(':animated()')){return false};
			//console.log(This.flag);
			var $ele = This.ele;
			var $right = - parseInt(This.wid);		//number类型
			if(This.flag==setting.len){
				$ele.animate({left:'-=' + This.wid},1000,function(){
					$ele.css('left',$right);
				});
				This.flag=1;
				//console.log(This.flag);
				This.adjust(This.flag);
			}else{
				$ele.animate({ left: '-='+ This.wid }, 1000, function () { 
            });

            This.flag++;
            console.log(This.flag);
            This.adjust(This.flag);
			}
		},
		turnLeft:function(element){
			var This = this;
			if($(This).is(':animated()')){return false};
			var $ele = This.ele;
			var $left = - parseInt(This.wid)*setting.len;		//number类型
			if(This.flag==1){  
               $ele.animate({ left: '+='+ This.wid}, 1000, function () {
                $ele.css('left',$left);
            });
               This.flag=setting.len;
               //console.log(this.flag);
               This.adjust(This.flag);
            }else{
            $ele.animate({ left: '+='+This.wid}, 1000, function () {
            });
            This.flag--;  
            //console.log(this.flag);
            This.adjust(This.flag);         
        	}
		},
		setTimer:function(){
			var This = this;
			var $ele = this.ele,
				$pic = $ele.parent();
			var a = setInterval(function(){This.turnRight();},setting.timeInterval);
			if($(this).is(':animated()')){clearTimeout(a);}
			$pic.hover(						//add方法
			function(){
				clearTimeout(a);
			},
			function(){
				a = setInterval(function(){This.turnRight();},setting.timeInterval);
			}
			);
		},
		clickTurn:function(){
			var This = this;
			var $ele = this.ele;
			$ele.parent().append('<div class="arrow arrow_left"></div>');
			$ele.parent().append('<div class="arrow arrow_right"></div>');
			$(".arrow_right").click(function(){
				This.turnRight();
			});
			$(".arrow_left").click(function(){
				This.turnLeft();
			});
			$ele.parent().hover(
				function(){
					$('.arrow').show();
				},
				function(){
					$('.arrow').hide();
				}
			)
			
		},
		slide:function(){
			var This = this;
			var $ele = this.ele;
			$ele.parent().append('<div class="slideSet"></div>');
			for(var i=0;i<setting.len;i++)
			{
				$('<span class="slideIcon"></span>').on('click',{index:i},function(event){
					$('.slideSet span').removeClass("active");
					This.flag = event.data.index+1;				
					le = parseInt(This.wid)*(event.data.index+1);
					$ele.animate({left:-le},500);
					$(this).addClass("active");
				}).appendTo($('.slideSet'));

			}
		}


}
	
	return this.each(function(){
		var $picbox = $(this);
		var picWidth = $picbox.children().eq(0).width();
		var picFunc = new animate($picbox,picWidth.toString()+'px',setting.flag);
		if(setting.autoPlay==1){
			picFunc.setTimer();
		}
		$picbox.parent().find('.arrow').hide();
		if(setting.navigation==1){	
			picFunc.clickTurn();
		}
		if(setting.slideIcon==1){
		picFunc.slide();
		}
		$('.slideSet span').eq(0).addClass('active');							//左右标签
	});


	
}
})(jQuery)
