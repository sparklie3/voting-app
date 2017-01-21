/*global $*/

$(document).ready(function() {
    function addOptions(){
        $(".input-group").removeClass("input-group");
        $(".input-group-btn").hide();
        $('.form-group').last().after(
            '<div class="form-group"><div class="input-group"><input type="text" class="form-control" name="option" placeholder="Golden Retriever"  required autofocus><span class="input-group-btn"><button class="btn btn-default addOptions" type="button"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></span></div></div>'
        );
    }
    function checkSignedIn(){
        $("#loginArea").addClass('hide');
        $("#signOutButton,#newPoll").removeClass("hide");
        $("p.show").removeClass("show").addClass("hide");
    }
    
    $.ajax({
            type: "POST",
            url: "/",
            success: function (response) {
                console.log(response);
                checkSignedIn();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if(xhr.status===403) {
                    event.preventDefault();
                }
            }
        });
    
    
    $(document).on('click',"button.addOptions", function(){
        addOptions();
    });    
    
    $("#formSignIn").submit(function(event){
        //alert('signin hit');
        $.ajax({
            type: "POST",
            url: "/login",
            data: $("#formSignIn").serialize(),
            success: function (response) {
                checkSignedIn();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if(xhr.status===403) {
                    window.location.reload();
                }
            }
        });
        event.preventDefault();
    });
    
    
    $("#newPoll").submit(function(event){
        //alert('newpoll hit');
        $.ajax({
            type: "POST",
            url: "/newPoll",
            data: $("#newPoll").serialize(),
            success: function (response) {
                alert('created poll');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if(xhr.status===403) {
                    window.location.reload();
                }
            }
        });
        event.preventDefault();
    });
    
    $("#signOutButton").click(function(){
        $.ajax({
            type: "POST",
            url: "/logout",
            success: function(response){
                window.location.reload();
            },
            error: function(error){
                alert(error);
            }
        })
    })
    
    
    
    
    
});

