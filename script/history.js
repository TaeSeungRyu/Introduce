var Break = new Error('Break');
function setNext(){
    try{
        if(counter == arr.length){
            $('#nextBtn').attr('class','btn btn-default').text('Done');
            $('#nextBtn').unbind('click').unbind('onclick');
        }
        else{
            arr.forEach(function(val,num){
                if(counter == num){
                    var txt = "<div class='col-md-4'><img class='img-thumbnail img-responsive imgComSize' src='"+val[0]+"'></div>";
                        txt += "<div class='col-md-8'><textArea class='form-control storyTxt'>"+val[1]+"</textArea></div>";
                        $('#storyTeller').children().fadeOut(300,function(){
                           $(this).remove();
                        });
                        $('#storyTeller').append(txt);
                    counter ++;
                    throw Break;
                }
            });
        }
    }
    catch(e){
        console.log(e);
    }
}