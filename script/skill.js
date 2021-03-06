    function setEnviro(){
        $('.dragger').each(function(){
            $(this).draggable({helper:'clone' ,opacity:0.6,cursor: "move",cursor: "move",zIndex: 100000});
        });
        $('#dropper').droppable({drop:function(evt,ui){
            var type = $(ui.draggable).attr('drg-type');
            if(type != undefined && type != null){
                $(this).text('');
                if(type == '1'){
                    $(this).children().remove();
                    $(this).append($('<table>',{'id':'moreTable','class':'table table-bordered'}));
                    var skillArr = [['Javascript','상'],['Angular v2.0↑','상'],['TypeScript','상'],['Jquery','상']];
                    $('#moreTable').append($('<tr>',{'id':'explainer','class':'tableTxts'}));
                    $('#explainer').append("<th>Target</th><th>Level</th>");
                    skillArr.forEach(function(val,num){
                        $('#moreTable').append($('<tr>',{'id':'mid_'+num,'class':'tableTxts'}));
                        $('#mid_'+num).append("<th>"+val[0]+"</th><th>"+val[1]+"</th>");
                    });
                }
                else if(type == '2'){
                    $(this).children().remove();
                    $(this).append($('<table>',{'id':'moreTable','class':'table table-bordered'}));
                    var skillArr = [['Java & JSP','상'],['Spring & Mybatis','상'],['NodeJs','중상'],['PhP','중'],['Python','중하'],['Mqtt관련 서버','중'],['FCM','중']];
                    $('#moreTable').append($('<tr>',{'id':'explainer','class':'tableTxts'}));
                    $('#explainer').append("<th>Target</th><th>Level</th>");
                    skillArr.forEach(function(val,num){
                        $('#moreTable').append($('<tr>',{'id': 'id_'+num,'class':'tableTxts'}));
                        $('#'+'id_'+num).append("<th>"+val[0]+"</th><th>"+val[1]+"</th>");
                    });
                }
                else{
                    $(this).children().remove();
                    $(this).append($('<table>',{'id':'moreTable','class':'table table-bordered'}));
                    var skillArr = [['SVN & Git','중'],['DataBase(R-DB)','중상'],['Eclipse','중'],['비관계형 db(Mongo-db,redis)','중'],['파이어베이스','중'],['Server(Centos, Ubunto)','중'],['Server(WindowServer)','중']];
                    $('#moreTable').append($('<tr>',{'id':'explainer','class':'tableTxts'}));
                    $('#explainer').append("<th>Target</th><th>Level</th>");
                    skillArr.forEach(function(val,num){
                        $('#moreTable').append($('<tr>',{'id': 'id_'+num,'class':'tableTxts'}));
                        $('#'+'id_'+num).append("<th>"+val[0]+"</th><th>"+val[1]+"</th>");
                    });
                }
            }
            $(this).css('border','4px dashed bisque');
          },over:function(){
            $(this).css('border','6px solid tomato');

          },out:function(){
            $(this).css('border','4px dashed bisque');
          }
        });
    }
