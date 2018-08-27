var price = new Array();
price[0] = [ 95, 'Web Front-End','Jquery, Bootstrap, Html css, Html canvas를 잘 다룹니다.' ];
price[1] = [ 90, 'Jsp & Spring','Jsp and Spring, mybatis, hibernate를 개념있게 사용 할 줄 압니다.' ];
price[2] = [ 80, 'PHP','php로 프로그래밍을 할줄 압니다.' ];
price[3] = [ 70, 'NodeJs', 'NodeJs로 서버를 구성할 줄 압니다.' ];
price[4] = [ 40, 'Python', 'Python은 기초정도 수준의 서버를 만들어 보았습니다.' ];
price[5] = [ 70, 'DataBase','다루어본 데이터베이스로는 Mssql, Mysql, Oracle, Postgre이 있습니다.' ];
price[6] = [ 85, 'Android', '안드로이드 프로그래밍 가능합니다.(뷰는 웹뷰)' ];
price[7] = [ 50, 'IOS', 'IOS는 어느정도 가능합니다.' ];
function setPower(){
	var width = $('#mypower').width();
	var height = $('#mypower').height();
	var i_width = width / price.length * 0.9;
	var i_height = height * 0.9;
	price.forEach(function(val,nm){
		var txt = "<div class='graphItm' style='width:"+i_width+"px;height:"+i_height+"px;margin-right:2px;'></div>";
		$('#mypower').append(txt);
	});
	$('.graphItm').each(function(i){
		var that = this;
		var Name = price[i][1];		
		var endNum = 100;
		var startNum = price[i][0];
		var explain = price[i][2];
		var increase = 0;
		var doing = setInterval(function(z){
			if(increase <= startNum){
				$(that).children().remove();
				var txt = '<div class="imGraphNm" style="background:snow;width:'+i_width+'px;height:'+(endNum - increase)+'px;line-height:5%;">'+increase+'%</div>';
				txt += '<div class="imGraph" style="background:'+color[i]+';width:'+i_width+'px;height:'+increase+'px;" id="showMore_'+i+'" explain="'+explain+'" onclick="showExplain(this)"></div>';
				txt += '<div class="skillNm">'+Name+'</div>';
				$(that).append(txt);
				increase ++;
			}
			else{
		        $('#showMore_'+i).each(function(){
		          $(this).mousemove(function(evt) {
		          	var client_x = evt.clientX;
		            var client_y = evt.clientY;
		            var offset = $(this).parent().parent().offset();
		            var r_x = offset.left;
		            var r_y = offset.top;
		            var realX = client_x - r_x;
		            var realY = client_y - r_y;
		            $( "#explaner2").remove();
		            $(this).append($('<div>',{'id':'explaner2'}));
		            $('#explaner2').append("<span>"+explain+"</span>");		 
		            $('#explaner2').css({'position':'absolute','top':realY + 15,'left':realX - 15});
		          })
		          .mouseout(function() {
		              $("#explaner2").remove();
		          });
		        });			
				clearInterval(doing);
			}
		},11);
	});
}
