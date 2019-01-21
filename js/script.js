var textArea = document.getElementById("my-text-area");
var error = document.getElementById("error");
textArea.addEventListener("keydown", function(){
  error.classList.remove("show"); 
});


function getList(e){ 
 
  var radios = document.getElementsByName('myRadio');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      var typeQuestion = radios[i].value;
      break;
    }
  }
  

  
  var arrayFromTextArea = textArea.value.split(String.fromCharCode(10));
  var tags = "";
  
  //   validation
  if(textArea.value==""){
     var msgDisplay = "You should type or paste into the textarea box!";
     error.innerHTML = msgDisplay;
     error.classList.add("show");
     e.stopPropagation();
     
  }else if(arrayFromTextArea.length < 3 && typeQuestion!="textarea"){
    var msgDisplay = "You should type at least 3 lines!";
    error.innerHTML = msgDisplay;
    error.classList.add("show");
    e.stopPropagation();
     
  }else if(arrayFromTextArea.length < 2){
    var msgDisplay = "For the textarea you should type at least 2 lines!";
    error.innerHTML = msgDisplay;
    error.classList.add("show");
    e.stopPropagation();
  }
  
  if(typeQuestion=="textarea"){
    arrayFromTextArea.length += 1;
  }
  if(typeQuestion=="dropbox"){
    var optns = "<option value=\"\">Select an option:</option>";
  }
  
  for(var i = 0; i < arrayFromTextArea.length; i++){
    if(arrayFromTextArea[i] != ""){
      if(i == 0){
         tags += "<div>"+arrayFromTextArea[i]+"</div>";
      }else if(i == 1){
         tags += "<div class=\"h4\"><span class\"text-bold\">"+arrayFromTextArea[i]+"</span></div>";     
      }else{
        var Nl = (i-1);
        if(typeQuestion=="radio"){
           tags += "<div class=\"box box-primary\"><div class=\"radio radio-primary\">";
           tags += "<input id=\"QAns"+Nl+"\" type=\"radio\" name=\"QAns\" value=\""+Nl+"\" data-skip=\"0\" autocomplete=\"off\">";
           tags += "<label for=\"QAns"+Nl+"\">"+arrayFromTextArea[i]+"</label></div></div>";
       }else if(typeQuestion=="text"){
                
        tags += "<div class=\"col-xs-12 col-sm-6 col-md-6 col-lg-6\"><label for=\"QAns"+Nl+"\">"+arrayFromTextArea[i]+"</label></div>";
        tags += "<div class=\"col-xs-12 col-sm-6 col-md-6 col-lg-6\"><div class=\"box box-primary\"><div class=\"textbox textbox-primary\">";
        tags += "<div class=\"input-group\"><input type=\"text\" class=\"form-control number-only\" id=\"QAns"+Nl+"\" name=\"QAns"+Nl+"\" maxlength=\"1\" placeholder=\"Please type a 1, 2, or 3\" data-skip=\"0\" autocomplete=\"off\">";
        tags += "<div class=\"input-group-addon\"><i class=\"fa fa-keyboard-o\"></i></div></div></div></div></div>";
        tags += "<div class=\"clearfix visible-sm\"></div>";
         
       }else if(typeQuestion=="checkbox"){  
          tags +=  "<div class=\"col-xxs-12\"><div class=\"box box-primary\">";
          tags += "<div class=\"checkbox checkbox-primary\"><input id=\"QAns"+Nl+"\" type=\"checkbox\" name=\"QAns"+Nl+"\" value=\"1\" data-skip=\"0\" autocomplete=\"off\"><label for=\"QAns"+Nl+"\">"+arrayFromTextArea[i]+"</label></div></div></div> ";
       }else if(typeQuestion=="textarea"){
          tags += "<div class=\"row\"><div class=\"col-xxs-12\"><div class=\"box box-primary\">";
          tags += "<div class=\"textarea\">";
          tags += "<textarea id=\"QAns1\" name=\"QAns"+Nl+"\" class=\"form-control\" maxlength=\"1500\" placeholder=\"Please be as detailed as you can.\" data-skip=\"0\" data-validate=\"S\" autocomplete=\"off\"></textarea>";
          tags +=  "</div></div></div>";
          tags +=  "</div>";

       }else if(typeQuestion=="dropbox"){
        optns += "<option value="+Nl+">"+arrayFromTextArea[i]+"</option>";
       }
     }
           
    }
  }
  
  var result = document.getElementById("result");


  if(typeQuestion=="dropbox"){
      tags += "<div class=\"col-xs-12\"><div class=\"box\"><div class=\"dropdown\">";
      tags += "<select id=\"QAns1\" name=\"QAns1\" class=\"form-control selectpicker bs-select-hidden\" data-skip=\"0\" autocomplete=\"off\">";
      tags +=  optns;
      tags += "</select>";
      tags += "</div></div></div>";
  }

  result.innerHTML += "<div class=\"item\"><div>"+tags+"<div class=\"controllers\"><a href=\"#\" class=\"reorder-up\"><i class=\"fa fa-arrow-circle-up\" aria-hidden=\"true\"></i></a> <a href=\"#\" class=\"reorder-down\"><i class=\"fa fa-arrow-circle-down\" aria-hidden=\"true\"></i></a> <a class=\"delete\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></a>  </div></div>";
  result.innerHTML += "</div>";
  
  textArea.value="";
  $('.obj-container').slideUp();
  $('input[name="myRadio"]').prop('checked', false);
  
  document.querySelectorAll('.item').length;
  
  $(".delete").each(function(i) {
    $(this).on("click",function(){
      
      var r = confirm("Are you sure?");
      if (r == true) {
        $(this).closest(".item").slideUp(300,function(){
          $(this).closest(".item").remove();
        });
        
      } 
      
    });
  });

  reOrder();
}


function reOrder(){
  
  $(".reorder-up").click(function(){
      var $current = $(this).closest('.item')
      var $previous = $current.prev('.item');
      if($previous.length !== 0){
        $current.insertBefore($previous);
      }
      return false;
    });

    $(".reorder-down").click(function(){
      var $current = $(this).closest('.item')
      var $next = $current.next('.item');
      if($next.length !== 0){
        $current.insertAfter($next);
      }
      return false;
    });
}


$('input[name="myRadio"]').on('click', function(){
    if ( $(this).is(':checked') ) {
        $('.obj-container').slideDown();
    } 
    
});






