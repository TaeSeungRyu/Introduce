(function($){
    $.fn.newCircle= function (val){
        var colorArray =  ['#F6CED8','#D8F6CE','#a5a8d8','#F5A9A9','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2'];
        var evtStCol = '#3ADF00';
        var that = this;
        var ctx = null;
        var delChecker = 0;
        width = $(this).width();
        height = $(this).height();
        var radius = 140;
        var point_x = width/2;
        var point_y = height/2;
        var can = false;
        var choice = false;
        var iii = -1;
        var handle = 'RIGHT';
        var del_id = -1;
        var reSorting = new Array();
        var explaining = false;

        if(val.color == undefined || val.color==''){val.color = 'black';}
        if(val.line == undefined || val.line==''){val.line = '5';}  // line은 인접효과에도 쓰인다.
        if(val.option != undefined && val.option != null && val.option.radius != undefined){
            radius = Number(val.option.radius);
        }
        if(val.option != undefined && val.option != null && val.option.button != undefined && val.option.button){
            var offset = $(that).offset();
            var canvas_x = offset.left;
            var canvas_y = offset.top;
        }
        if(val.option != undefined && val.option != null && val.option.explain != undefined && val.option.explain){
            $explain = true;
        }

        if($(that).get(0).getContext('2d') == undefined){
            $(that).append('<div>Please tag the canvas element.</div>');
        }
        else{
            ctx = $(this).get(0).getContext('2d');
            clearAndRedraw();
        }
        function returnResultor(){   //callback res
            if(val.result != undefined && typeof val.result == 'function'){ 
                var ress = {'result' : val.data,'STATUS':'SUCC','radius':radius,'identity':this};
                val.result(ress);
            }
        }

        $(this).bind('mousedown',function(evt){
            can = eventPosition(evt);
        });
        $(this).css('cursor','default');
        $(this).bind('mouseup',function(evt){
            sortingArray();
            can = false;
            choice = false;
            iii = -1;
            clearAndRedraw();
        });

        $(this).bind('mousemove',function(evt){
            if(can){
                clearAndRedraw();
                var degree = calculater(evt);  //마우스를 향한 각도는?
                $('#Tovexplainer').remove();
                if(val.data != undefined && val.data.length > 0){
                    var checkDeg = degree / (Math.PI/180);
                    if(checkDeg <= 0){ checkDeg += 360;}  //180 ~ -180
                    if(!choice){ //영역이 선택되기 전 이라면
                        for(var i=0;i<val.data.length;i++){
                            if(Math.abs(val.data[i].s - parseInt(checkDeg)) <= 1 ){   //right event
                                val.data[i].s = checkDeg;
                                clearAndRedraw();
                                choice = true;
                                iii = i;
                                handle = 'RIGHT'; 
                                break; 
                            }
                            else if(Math.abs(val.data[i].e - parseInt(checkDeg)) <= 1 ){  //left event
                                val.data[i].e = checkDeg;
                                clearAndRedraw();
                                choice = true;
                                iii = i;
                                handle = 'LEFT';
                                break;
                            }
                        }
                    }
                    else{  //Resizing start
                        //최소값 방지
                        if(setTotalValueChecker()){
                            if(handle == 'LEFT'){
                                    if(Math.abs(val.data[iii].e - val.data[iii].s) <= 5 && Math.abs(val.data[iii].e - Math.abs(checkDeg)) <= 5){
                                        val.data[iii].e = val.data[iii].e + 30;
                                        choice = false;
                                        iii = -1;
                                    }
                                    else{
                                        val.data[iii].e = checkDeg;
                                    }
                            }
                            else if(handle == 'RIGHT'){
                                if(Math.abs(val.data[iii].s - val.data[iii].e) <= 5 && Math.abs(val.data[iii].s - Math.abs(checkDeg)) <= 5){
                                    val.data[iii].s = val.data[iii].s - 30;
                                    choice = false;
                                    iii = -1;
                                }
                                else{
                                    val.data[iii].s = checkDeg;
                                }
                            }
                        }
                    }
                }
                else{
                    ctx.moveTo(point_x,point_y);
                    ctx.arc(point_x,point_y,radius,Math.PI/180*90,degree);
                    ctx.closePath();
                    ctx.stroke();
                    var checkDeg = degree / (Math.PI/180);
                    val.data = [{s:270,e:320,txt:'defalut'}];
                }
            }
            else{ //explain
                if(eventPosition(evt) && $explain){
                    var client_x = evt.clientX;
                    var client_y = evt.clientY;
                    var offset = $(that).offset();
                    var canvas_x = offset.left;
                    var canvas_y = offset.top;
                    var realX = client_x - canvas_x;
                    var realY = client_y - canvas_y;
                    if($('#Tovexplainer').attr('id') == undefined){
                        $(this).parent().append($('<div>',{'id':'Tovexplainer'}).css({'background':'rgba(118, 111, 219, 0.45)','border-radius':'3px','font-weight':'bold','color':'#8A0829'}));
                        $('#Tovexplainer').append("<div style='padding:5px'>캔버스를 누른 후 부채꼴 방향으로</div><div style='padding:5px'>마우스를 움직여보세요.</div><div style='padding:5px'>부채꼴이 움직입니다.</div>");
                    }
                    var offset = $(that).offset();
                    var canvas_x = offset.left;
                    var canvas_y = offset.top;
                    $('#Tovexplainer').css({'position':'absolute','top':realY + 20,'left':realX + 20 });
                }
                else{
                    $('#Tovexplainer').remove();
                }
            }
        });

        function setTotalValueChecker(){
            return true;
        }

        function eventPosition(evt){ //위치 체커
            var client_x = evt.clientX;
            var client_y = evt.clientY;
            var offset = $(that).offset();
            var canvas_x = offset.left;
            var canvas_y = offset.top;
            var realX = client_x - canvas_x;
            var realY = client_y - canvas_y;
            if( point_x+radius >= realX && point_x-radius <= realX){
                if(point_y+radius >= realY && point_y-radius <= realY){  //원 안에 들어오면
                    return true;
                }
            }
            choice = false;
            iii = -1;
            return false;
        }

        function calculater(evt){ //각 구하기
            var client_x = evt.clientX;
            var client_y = evt.clientY;
            var offset = $(that).offset();
            var canvas_x = offset.left;
            var canvas_y = offset.top;
            var xx = client_x - canvas_x - point_x;
            var yy = client_y - canvas_y - point_y;
            return Math.atan2(yy,xx);
        }

        function setOverRangeChecker(){
            val.data.forEach(function(force){
                if(force.s > 360){force.s = Math.abs(360 - force.s);}
                else if(force.s < 0){force.s = Math.abs(360 + force.s);}
                if(force.e > 360){force.e = Math.abs(360 - force.e);}
                else if(force.e < 0){force.e = Math.abs(360 + force.e);}
            });
        }

        function clearAndRedraw(){//초기화 그리고 기본틀 그리기
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.fillRect(0,0,width,height);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            if(can){
                ctx.strokeStyle = evtStCol;
                ctx.lineWidth = 6;
            }
            else{
                ctx.strokeStyle = val.color;
                ctx.lineWidth = val.line;
            }
            ctx.arc(point_x,point_y,radius,0,(Math.PI/180)*360);
            ctx.stroke();
            ctx.closePath();
            firstDrawer();
            returnResultor();
        }

        function timeCalculator(start, end){
            var arr = [start,end];
            for(var mm=0;mm < arr.length;mm++){
                if (Math.ceil(arr[mm]) == 90){
                    arr[mm] = '12:00';
                }
                else if (Math.ceil(arr[mm]) == 75){
                    arr[mm] = '11:00';
                }
                else if (Math.ceil(arr[mm]) == 180){
                    arr[mm] = '18:00';
                }
                else if (Math.ceil(arr[mm]) == 270){
                    arr[mm] = '00:00';
                }
                else if (Math.ceil(arr[mm]) >= 359){
                    arr[mm] = '06:00';
                }
                else{
                    var hour = Math.floor((arr[mm] / 15)); 
                    if(hour == 0 || hour == 24){hour = '06';} else if(hour == 1){hour = '07';}
                    else if(hour == 2){hour = '08';} else if(hour == 3){hour = '09';} else if(hour == 4){hour = '10';}
                    else if(hour == 5){hour = '11';} else if(hour == 6){hour = '12';} else if(hour == 7){hour = '13';}
                    else if(hour == 8){hour = '14';} else if(hour == 9){hour = '15';} else if(hour == 10){hour = '16';}
                    else if(hour == 11){hour = '17';} else if(hour == 12){hour = '18';} else if(hour == 13){hour = '19';}
                    else if(hour == 14){hour = '20';} else if(hour == 15){hour = '21';} else if(hour == 16){hour = '22';}
                    else if(hour == 17){hour = '23';} else if(hour == 18){hour = '00';} else if(hour == 19){hour = '01';}
                    else if(hour == 20){hour = '02';} else if(hour == 21){hour = '03';} else if(hour == 22){hour = '04';}
                    else if(hour == 23){hour = '05';}
                    var time = (arr[mm] / 15).toFixed(1);
                    time = Number(time.split('.')[1]);
                    if(time == 0){time = '00';} else if(time == 1 || time == 2){time = '10';} 
                    else if(time == 3 || time == 4){time = '20';} else if(time == 5 || time == 6){time = '30';} 
                    else if(time == 7 || time == 8){time = '40';} else if(time == 9){time = '50';} 
                    arr[mm] = hour + ':' + time;
                }
            }
            return arr[0] + '~' + arr[1];
        }

        function sortingArray(){
            var sort_by = function(field, reverse, primer){
               var key = primer ? 
               function(x) {return primer(x[field])} : 
               function(x) {return x[field]};
               reverse = !reverse ? 1 : -1;
               return function (a, b) {
               return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
               }  
            }
            try{
                if(val.data[0].befor >=2300){
                    val.data.sort(sort_by('after', false, parseInt));
                }
                else{
                    val.data.sort(sort_by('befor', false, parseInt));
                }
            }
            catch(e){
                console.log(e);
            }
        }

        function firstDrawer(){  //데이터 그리기
            if(val.data != undefined && val.data.length > 0){
                var m = 0; var misure = 1;
                setOverRangeChecker();
                val.data.forEach(function(force){
                    ctx.beginPath();
                    //원 그리기 s
                    ctx.moveTo(point_x,point_y);
                    ctx.arc(point_x,point_y,radius,Math.PI/180*force.s,Math.PI/180*force.e);
                    ctx.fillStyle = colorArray[m];
                    ctx.fill();
                    //원 그리기 e
                    //텍스트 넣기 s
                    if(force.txt == undefined || force.txt == null || $.trim(force.txt) == ''){
                        force.txt = 'No Name('+m+')';
                    }
                    ctx.font = '300 14px normal';
                    ctx.fillStyle = 'black';
                    var ss = force.s;
                    var ee = force.e;
                    if(ss<0){ss = ss + 360;}
                    if(ee<0){ee = ee + 360;}
                    var view_time = timeCalculator(ss,ee);
                    var cals = 0;
                    if(ss > 180 && ss<=360){
                        cals = (360-ss) + ee;
                    }
                    else if(ss>=0 && ss<=180){
                        cals = ee - ss;
                    }
                    if(cals >= 360){
                        cals = cals-360;
                    }

                    var befor = view_time.split('~');
                    befor = Number(befor[0].replace(":",""));
                    force.befor = befor;

                    var after  = view_time.split('~');
                    after = Number(after[1].replace(":",""));
                    force.after = after;

                    ss = ss + (cals/2);
                    var angle = (ss) * Math.PI / 180;
                    var x_ang = Math.cos(angle) * (radius/2);
                    var y_ang = Math.sin(angle) * (radius/2);
                    var textInfo = ctx.measureText(force.txt);
                    var adder = Math.abs(ctx.measureText(view_time).width-textInfo.width)/2;
                    ctx.fillText(force.txt, (point_x+x_ang)-(textInfo.width /2) ,point_y+y_ang);
                    ctx.fillText(view_time, (point_x+x_ang)-(textInfo.width /2)-adder,point_y+y_ang + 15);
                    //텍스트 넣기 e
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.rect(15 ,misure*20-10,14,14);  
                    ctx.fillStyle =  colorArray[m];
                    ctx.fill();
                    ctx.beginPath();
                    ctx.font = '100 12px normal';
                    ctx.fillStyle = 'black';
                    ctx.fillText(force.txt+' ('+view_time + ')', 40 ,misure*20+2);
                    m++; 
                    misure = misure+1.5;
                    force.sch_time = view_time;
                    ctx.closePath();
                });
            }
        }
    }
})(jQuery);



/*
(function($){
    $.fn.newCircle= function (val){
        var colorArray =  ['#F6CED8','#D8F6CE','#a5a8d8','#F5A9A9','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2','#b0ebc9','#bfe8ff','#d2d2ff','#a6f3ff','#f3daff','#9acbe9','#d7cde6','#c2e3d0','#a5a8d8','#85b6d2'];
        var evtStCol = '#3ADF00';
        var that = this;
        var ctx = null;
        var delChecker = 0;
        width = $(this).width();
        height = $(this).height();
        var radius = 140;
        var point_x = width/2;
        var point_y = height/2;
        var can = false;
        var choice = false;
        var iii = -1;
        var handle = 'RIGHT';
        var del_id = -1;
        var reSorting = new Array();
        var explaining = false;

        if(val.color == undefined || val.color==''){val.color = 'black';}
        if(val.line == undefined || val.line==''){val.line = '5';}  // line은 인접효과에도 쓰인다.
        if(val.option != undefined && val.option != null && val.option.radius != undefined){
            radius = Number(val.option.radius);
        }
        if(val.option != undefined && val.option != null && val.option.button != undefined && val.option.button){
            var offset = $(that).offset();
            var canvas_x = offset.left;
            var canvas_y = offset.top;
        }
        if(val.option != undefined && val.option != null && val.option.explain != undefined && val.option.explain){
            $explain = true;
        }

        if($(that).get(0).getContext('2d') == undefined){
            $(that).append('<div>Please tag the canvas element.</div>');
        }
        else{
            ctx = $(this).get(0).getContext('2d');
            clearAndRedraw();
        }
        function returnResultor(){   //callback res
            if(val.result != undefined && typeof val.result == 'function'){ 
                var ress = {'result' : val.data,'STATUS':'SUCC','radius':radius,'identity':this};
                val.result(ress);
            }
        }

        $(this).bind('mousedown',function(evt){
            can = eventPosition(evt);
        });
        $(this).css('cursor','default');
        $(this).bind('mouseup',function(evt){
            sortingArray();
            can = false;
            choice = false;
            iii = -1;
            clearAndRedraw();
        });

        $(this).bind('mousemove',function(evt){
            if(can){
                clearAndRedraw();
                var degree = calculater(evt);  //마우스를 향한 각도는?
                $('#Tovexplainer').remove();
                if(val.data != undefined && val.data.length > 0){
                    var checkDeg = degree / (Math.PI/180);
                    if(checkDeg <= 0){ checkDeg += 360;}  //180 ~ -180
                    if(!choice){ //영역이 선택되기 전 이라면
                        for(var i=0;i<val.data.length;i++){
                            if(Math.abs(val.data[i].s - parseInt(checkDeg)) <= 1 ){   //right event
                                val.data[i].s = checkDeg;
                                clearAndRedraw();
                                choice = true;
                                iii = i;
                                handle = 'RIGHT'; 
                                break; 
                            }
                            else if(Math.abs(val.data[i].e - parseInt(checkDeg)) <= 1 ){  //left event
                                val.data[i].e = checkDeg;
                                clearAndRedraw();
                                choice = true;
                                iii = i;
                                handle = 'LEFT';
                                break;
                            }
                        }
                    }
                    else{  //Resizing start
                        //최소값 방지
                        if(setTotalValueChecker()){
                            if(handle == 'LEFT'){
                                    if(Math.abs(val.data[iii].e - val.data[iii].s) <= 5 && Math.abs(val.data[iii].e - Math.abs(checkDeg)) <= 5){
                                        val.data[iii].e = val.data[iii].e + 30;
                                        choice = false;
                                        iii = -1;
                                    }
                                    else{
                                        val.data[iii].e = checkDeg;
                                    }
                            }
                            else if(handle == 'RIGHT'){
                                if(Math.abs(val.data[iii].s - val.data[iii].e) <= 5 && Math.abs(val.data[iii].s - Math.abs(checkDeg)) <= 5){
                                    val.data[iii].s = val.data[iii].s - 30;
                                    choice = false;
                                    iii = -1;
                                }
                                else{
                                    val.data[iii].s = checkDeg;
                                }
                            }
                        }
                    }
                }
                else{
                    ctx.moveTo(point_x,point_y);
                    ctx.arc(point_x,point_y,radius,Math.PI/180*90,degree);
                    ctx.closePath();
                    ctx.stroke();
                    var checkDeg = degree / (Math.PI/180);
                    val.data = [{s:270,e:320,txt:'defalut'}];
                }
            }
            else{ //explain
                if(eventPosition(evt) && $explain){
                    var client_x = evt.clientX;
                    var client_y = evt.clientY;
                    var offset = $(that).offset();
                    var canvas_x = offset.left;
                    var canvas_y = offset.top;
                    var realX = client_x - canvas_x;
                    var realY = client_y - canvas_y;
                    if($('#Tovexplainer').attr('id') == undefined){
                        $(this).parent().append($('<div>',{'id':'Tovexplainer'}).css({'background':'rgba(118, 111, 219, 0.45)','border-radius':'3px','font-weight':'bold','color':'#8A0829'}));
                        $('#Tovexplainer').append("<div style='padding:5px'>캔버스를 누른 후 부채꼴 방향으로</div><div style='padding:5px'>마우스를 움직여보세요.</div><div style='padding:5px'>부채꼴이 움직입니다.</div>");
                    }
                    var offset = $(that).offset();
                    var canvas_x = offset.left;
                    var canvas_y = offset.top;
                    $('#Tovexplainer').css({'position':'absolute','top':realY + 20,'left':realX + 20 });
                }
                else{
                    $('#Tovexplainer').remove();
                }
            }
        });

        function setTotalValueChecker(){
            return true;
        }

        function eventPosition(evt){ //위치 체커
            var client_x = evt.clientX;
            var client_y = evt.clientY;
            var offset = $(that).offset();
            var canvas_x = offset.left;
            var canvas_y = offset.top;
            var realX = client_x - canvas_x;
            var realY = client_y - canvas_y;
            if( point_x+radius >= realX && point_x-radius <= realX){
                if(point_y+radius >= realY && point_y-radius <= realY){  //원 안에 들어오면
                    return true;
                }
            }
            choice = false;
            iii = -1;
            return false;
        }

        function calculater(evt){ //각 구하기
            var client_x = evt.clientX;
            var client_y = evt.clientY;
            var offset = $(that).offset();
            var canvas_x = offset.left;
            var canvas_y = offset.top;
            var xx = client_x - canvas_x - point_x;
            var yy = client_y - canvas_y - point_y;
            return Math.atan2(yy,xx);
        }

        function setOverRangeChecker(){
            val.data.forEach(function(force){
                if(force.s > 360){force.s = Math.abs(360 - force.s);}
                else if(force.s < 0){force.s = Math.abs(360 + force.s);}
                if(force.e > 360){force.e = Math.abs(360 - force.e);}
                else if(force.e < 0){force.e = Math.abs(360 + force.e);}
            });
        }

        function clearAndRedraw(){//초기화 그리고 기본틀 그리기
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.fillRect(0,0,width,height);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            if(can){
                ctx.strokeStyle = evtStCol;
                ctx.lineWidth = 6;
            }
            else{
                ctx.strokeStyle = val.color;
                ctx.lineWidth = val.line;
            }
            ctx.arc(point_x,point_y,radius,0,(Math.PI/180)*360);
            ctx.stroke();
            ctx.closePath();
            firstDrawer();
            returnResultor();
        }

        function timeCalculator(start, end){
            var arr = [start,end];
            for(var mm=0;mm < arr.length;mm++){
                if (Math.ceil(arr[mm]) == 90){
                    arr[mm] = '12:00';
                }
                else if (Math.ceil(arr[mm]) == 75){
                    arr[mm] = '11:00';
                }
                else if (Math.ceil(arr[mm]) == 180){
                    arr[mm] = '18:00';
                }
                else if (Math.ceil(arr[mm]) == 270){
                    arr[mm] = '00:00';
                }
                else if (Math.ceil(arr[mm]) >= 359){
                    arr[mm] = '06:00';
                }
                else{
                    var hour = Math.floor((arr[mm] / 15)); 
                    if(hour == 0 || hour == 24){hour = '06';} else if(hour == 1){hour = '07';}
                    else if(hour == 2){hour = '08';} else if(hour == 3){hour = '09';} else if(hour == 4){hour = '10';}
                    else if(hour == 5){hour = '11';} else if(hour == 6){hour = '12';} else if(hour == 7){hour = '13';}
                    else if(hour == 8){hour = '14';} else if(hour == 9){hour = '15';} else if(hour == 10){hour = '16';}
                    else if(hour == 11){hour = '17';} else if(hour == 12){hour = '18';} else if(hour == 13){hour = '19';}
                    else if(hour == 14){hour = '20';} else if(hour == 15){hour = '21';} else if(hour == 16){hour = '22';}
                    else if(hour == 17){hour = '23';} else if(hour == 18){hour = '00';} else if(hour == 19){hour = '01';}
                    else if(hour == 20){hour = '02';} else if(hour == 21){hour = '03';} else if(hour == 22){hour = '04';}
                    else if(hour == 23){hour = '05';}
                    var time = (arr[mm] / 15).toFixed(1);
                    time = Number(time.split('.')[1]);
                    if(time == 0){time = '00';} else if(time == 1 || time == 2){time = '10';} 
                    else if(time == 3 || time == 4){time = '20';} else if(time == 5 || time == 6){time = '30';} 
                    else if(time == 7 || time == 8){time = '40';} else if(time == 9){time = '50';} 
                    arr[mm] = hour + ':' + time;
                }
            }
            return arr[0] + '~' + arr[1];
        }

        function sortingArray(){
            var sort_by = function(field, reverse, primer){
               var key = primer ? 
               function(x) {return primer(x[field])} : 
               function(x) {return x[field]};
               reverse = !reverse ? 1 : -1;
               return function (a, b) {
               return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
               }  
            }
            try{
                if(val.data[0].befor >=2300){
                    val.data.sort(sort_by('after', false, parseInt));
                }
                else{
                    val.data.sort(sort_by('befor', false, parseInt));
                }
            }
            catch(e){
                console.log(e);
            }
        }

        function firstDrawer(){  //데이터 그리기
            if(val.data != undefined && val.data.length > 0){
                var m = 0; var misure = 1;
                setOverRangeChecker();
                val.data.forEach(function(force){
                    ctx.beginPath();
                    //원 그리기 s
                    ctx.moveTo(point_x,point_y);
                    ctx.arc(point_x,point_y,radius,Math.PI/180*force.s,Math.PI/180*force.e);
                    ctx.fillStyle = colorArray[m];
                    ctx.fill();
                    //원 그리기 e
                    //텍스트 넣기 s
                    if(force.txt == undefined || force.txt == null || $.trim(force.txt) == ''){
                        force.txt = 'No Name('+m+')';
                    }
                    ctx.font = '300 14px normal';
                    ctx.fillStyle = 'black';
                    var ss = force.s;
                    var ee = force.e;
                    if(ss<0){ss = ss + 360;}
                    if(ee<0){ee = ee + 360;}
                    var view_time = timeCalculator(ss,ee);
                    var cals = 0;
                    if(ss > 180 && ss<=360){
                        cals = (360-ss) + ee;
                    }
                    else if(ss>=0 && ss<=180){
                        cals = ee - ss;
                    }
                    if(cals >= 360){
                        cals = cals-360;
                    }

                    var befor = view_time.split('~');
                    befor = Number(befor[0].replace(":",""));
                    force.befor = befor;

                    var after  = view_time.split('~');
                    after = Number(after[1].replace(":",""));
                    force.after = after;

                    ss = ss + (cals/2);
                    var angle = (ss) * Math.PI / 180;
                    var x_ang = Math.cos(angle) * (radius/2);
                    var y_ang = Math.sin(angle) * (radius/2);
                    var textInfo = ctx.measureText(force.txt);
                    var adder = Math.abs(ctx.measureText(view_time).width-textInfo.width)/2;
                    ctx.fillText(force.txt, (point_x+x_ang)-(textInfo.width /2) ,point_y+y_ang);
                    ctx.fillText(view_time, (point_x+x_ang)-(textInfo.width /2)-adder,point_y+y_ang + 15);
                    //텍스트 넣기 e
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.rect(15 ,misure*20-10,14,14);  
                    ctx.fillStyle =  colorArray[m];
                    ctx.fill();
                    ctx.beginPath();
                    ctx.font = '100 12px normal';
                    ctx.fillStyle = 'black';
                    ctx.fillText(force.txt+' ('+view_time + ')', 40 ,misure*20+2);

                    m++; 
                    misure = misure+1.5;
                    force.sch_time = view_time;

                    ctx.closePath();

                });
            }
        }


    }
})(jQuery);


*/