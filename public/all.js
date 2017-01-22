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
    
    function extractAllQuestions(data){
        //console.log(data[1].questions);
        for (var i=0,array=[];  i<data.length;i++){
            for (var j=0; j<data[i].questions.length;j++){
                array.push(data[i].questions[j].question);
            }
        }
        console.log(array);
        return array;
    }
    
    
    function transformData(data){
        for (var i=0, array =[]; i<data.length;i++){
            array.push(data[i].question);
        }
        console.log(array);
        return array;
    }
    
    function displayPollQuestions(data){
        var array = [];
        for (let value of data) {
            //need to insert a dynamic href to show the result
            var string = "<a href='#' class='list-group-item'>"+value+"</a>";
            array.push(string);
        }
        console.log(array);
        return array;
        
    }
    
    
    
    $.ajax({
            type: "POST",
            url: "/",
            data: "",
            success: function (response) {
                //for all questions
                var allTables = displayPollQuestions(extractAllQuestions(response.all));
                $("#allPolls").append(allTables.join(""));
                
                //for user specific questions
                if (response.user === "none"){
                    checkSignedIn();

                }else if (response.user !== undefined){
                    var tables = displayPollQuestions(transformData(response.user));
                    $("#myPolls").append(tables.join(""));
                    checkSignedIn();
                }
                
                
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
                window.location.reload();
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
                //alert('created poll');
                window.location.reload();
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

