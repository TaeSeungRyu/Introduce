function setHello(){
	$('#explainerer').hide();
    setEnviro();
    var canWidth = $('#helloCanvas').parent().width()*0.9;
    var canHeight = 300;
    $('#helloCanvas').width(canWidth).css({'border':'1px solid gray','border-radius':'5px','width':canWidth});
    $('#helloCanvas').attr('width',canWidth);
	var ctx = $('#helloCanvas').get(0).getContext('2d');
	ctx.beginPath();

	var img = new Image();
	img.src = 'image/iland.png';
	ctx.drawImage(img,0,0,canWidth,canHeight); 
	ctx.closePath();

	function setWhereAmI(obj,evt,can_width_half,can_height_half){
	    var res = "";
	    var client_x = evt.clientX;
	    var client_y = evt.clientY;
	    var offset = $(obj).offset();
	    var canvas_x = offset.left;
	    var canvas_y = offset.top;
	    var realX = client_x - canvas_x;
	    var realY = client_y - canvas_y;
	    if(realX < can_width_half){
	        if(realY < can_height_half){
	            res = "LEFT-TOP";
	        }
	        else{
	            res = "LEFT-DOWN";
	        }
	    }
	    else{
	        if(realY < can_height_half){
	            res = "RIGHT-TOP";
	        }
	        else{
	            res = "RIGHT-DOWN";
	        }
	    }
	    return res;
	}

    $('#helloCanvas').mousedown(function(evt){
		var can_width_half = $(this).width()/2;
		var can_height_half = $(this).height()/2;
        var where = setWhereAmI(this,evt,can_width_half,can_height_half);
        if(where == 'LEFT-TOP'){
            console.log(1);
            setExplainer('rgba(253,187,187,0.7)','업무를 하는 경우 다른사람과의 협동을 중요시 합니다.\n원을 클릭시 닫힙니다.');
        }
        else if(where == 'LEFT-DOWN'){
            console.log(2);
            setExplainer('rgba(96,203,235,0.7)','고집과 아집을 버리고 경청의 자세로 업무를 합니다.\n원을 클릭시 닫힙니다.');
        }
        else if(where == 'RIGHT-TOP'){
            console.log(3);
            setExplainer('rgba(23,87,142,0.7)','주어진일에 자신의 소임을 다 합니다.\n원을 클릭시 닫힙니다.');
        }
        else if(where == 'RIGHT-DOWN'){
            console.log(4);
            setExplainer('rgba(11,143,52,0.7)','주어진 기술에 만족하지 않고 스스로 탐구합니다.\n원을 클릭시 닫힙니다.');
        }
    });

    function setExplainer(colors,txt){
        $('#explainerer').show();
        $('.container').prepend('<div id="blocks"></div>');
        $('#explainerer').height(6.25).css({'width':'1%','background':colors}).text('');
        var num = 1;
        var inter = setInterval(function(){
            if(num > 20){
                $('#explainerer').text(txt);
                clearInterval(inter);
            }
            var heights = $('#explainerer').height();
            $('#explainerer').css({'width':num+'%','height':'200px','padding':'80px'}).click(function(){
                $(this).fadeOut(250,function(){
                    $('#blocks').remove();
                });
            });
            num++;
        },10);
    }

	$('#helloCanvas').mousemove(function(evt){
		var can_width_half = $(this).width()/2;
		var can_height_half = $(this).height()/2;

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,$(this).width(),$(this).height());
    	img.src = 'image/iland.png';
    	ctx.drawImage(img,0,0,canWidth,canHeight); 
    	ctx.closePath();

        var where = setWhereAmI(this,evt,can_width_half,can_height_half);

        if(where == 'LEFT-TOP'){
            	ctx.strokeStyle = "#0000FF";
            	ctx.lineWidth = 3;
            	ctx.rect(0,0,can_width_half,can_height_half);
                ctx.fillStyle = "rgba(255, 255, 51, 0.4)"
                ctx.fill();
                ctx.fillStyle = "#FF0000"
                ctx.font = '16px _sans';
                var txt = "협동심";
                var textInfo = ctx.measureText(txt);
                ctx.fillText(txt,can_width_half/2 - textInfo.width/2,can_height_half/2);
            	ctx.stroke();	
        }
        else if(where == 'LEFT-DOWN'){
            	ctx.strokeStyle = "#0000FF";
            	ctx.lineWidth = 3;
            	ctx.rect(0,can_height_half,can_width_half,can_height_half);
                ctx.fillStyle = "rgba(17, 1, 255, 0.3)"
                ctx.fill();
                ctx.fillStyle = "#FF0000"
                ctx.font = '16px _sans';
                var txt = "배려심";
                var textInfo = ctx.measureText(txt);
                ctx.fillText(txt,can_width_half/2 - textInfo.width/2,can_height_half+can_height_half/2);
            	ctx.stroke();	
        }
        else if(where == 'RIGHT-TOP'){
            	ctx.strokeStyle = "#0000FF";
            	ctx.lineWidth = 3;
            	ctx.rect(can_width_half,0,can_width_half,can_height_half);
                ctx.fillStyle = "rgba(139, 139, 139, 0.4)"
                ctx.fill(); 
                ctx.fillStyle = "#FF0000"
                ctx.font = '16px _sans';
                var txt = "책임감";
                var textInfo = ctx.measureText(txt);
                ctx.fillText(txt,can_width_half+can_width_half/2 - textInfo.width/2,can_height_half/2);
            	ctx.stroke();	
        }
        else if(where == 'RIGHT-DOWN'){
            	ctx.strokeStyle = "#0000FF";
            	ctx.lineWidth = 3;
            	ctx.rect(can_width_half,can_height_half,can_width_half,can_height_half); 
                ctx.fillStyle = "rgba(255, 139, 174, 0.4)"
                ctx.fill();            	
                ctx.fillStyle = "#FF0000"
                ctx.font = '16px _sans';
                var txt = "전문성";
                var textInfo = ctx.measureText(txt);
                ctx.fillText(txt,can_width_half+can_width_half/2 - textInfo.width/2,can_height_half+can_height_half/2);
            	ctx.stroke();	
        }
	});
}