var times = new Array();
times[0] = [ 'Student', '1984 ~ 2007','인천거주, 인천 대학교 졸업' ];
times[1] = [ 'Soldier', '2007 ~ 2014','군 입대. 대위로 전역' ];
times[2] = [ 'Student', '2014 ~ 2015','프로그래밍 공부' ];
times[3] = [ 'Programer', '2015 ~ Now','좋은 프로그래머가 되기위한 노력!' ];
function setTimeLineStart() {
	console.log('a');
	times.forEach(function(val,mm) {
		sleep(200);
		setTimeout(function() {
			var txt = '<div class="cirlce-mother" style="background:'+color[mm]+'"><div class="cirlce-son" style="color: '+color[mm]+';">'	+ val[0] + '</div></div>';
			var item = $(txt).fadeIn(500);
			$('#timeLine').append(item);
			txt = '<div class="cirlce-uncle" style="border: 2px solid '+color[mm]+';color: '+color[mm]+';" id="hovers_'+mm+'"> Period : ' + val[1] + '</div>';		
			item = $(txt).fadeIn(500);
			$('#timeTirm').append(txt);
			$('#hovers_'+mm).each(function(){
				$(this).mousemove(function(evt) {
		            var client_x = evt.clientX;
		            var client_y = evt.clientY;
		            var offset = $(this).parent().offset();
		            var r_x = offset.left;
		            var r_y = offset.top;
		            var realX = client_x - r_x;
		            var realY = client_y - r_y;
		            $( "#explaner").remove();
		            $(this).parent().append($('<div>',{'id':'explaner'}));
	                $('#explaner').append("<span>"+times[mm][2]+"</span>");		 
	                $('#explaner').css({'position':'absolute','top':realY + 15,'left':realX + 15});
				})
				.mouseout(function() {
				    $("#explaner").remove();
				});
			});			
		}, 1000);
	});
}
