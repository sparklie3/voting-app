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
    
    $("#formRegister").submit(function(event){
        $.ajax({
            type: "POST",
            url: "/register",
            data: $("#formRegister").serialize(),
            success: function (response) {
                
                    $(".alert").empty().append(
                        '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Success:</span> Registered. Now login.'
                        )
                
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if(xhr.status===403) {
                    $(".alert").empty().append(
                        '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> Unable to register. Try again.' 
                        )
                }
            }
        });
        event.preventDefault();
    });
    
});