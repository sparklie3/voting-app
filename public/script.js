$( document ).ready(function() {
    
    /*temp
    $("#register").css("display","none");
    $(".form-registeration").css("display","block");
    */
    
    console.log("ready!");
    $("#inputPassword").focusin(function(){
        console.log('clicked');
      $(this).keyup(function(){
          console.log('keyup');
          //console.log($("#inputEmail").val());
          if($("#inputEmail").val()!=="" && $("#inputPassword").val().length>=8){
              //console.log($("#inputEmail").val());
              console.log('success');
              //$("#submit").html("&#10004;");
              $("#submit").addClass("active");
          }
      })
    })
    
    $("#submit").click(function(){
        if($("#submit").hasClass("active")){
            console.log(true);
            $("#submit").addClass("animate").html("&#10004;");
        }
    });
    
    $("#forgotButton").click(function(){
        alert("Doesn't do anything yet");
    })
    
    
    $("#register").click(function() {
        $(this).css("display","none");
        $(".form-registeration").css("display","block");
    })
    
    $(".close").click(function() {
        $(".form-registeration").css("display","none");
        $("#register").css("display","flex");
    })
    
    
});