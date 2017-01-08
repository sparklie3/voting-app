$(document).ready(function() {
    function addOptions(){
        $(".input-group").removeClass("input-group");
        $(".input-group-btn").hide();
        $('.form-group').last().after(
            '<div class="form-group"><div class="input-group"><input type="text" class="form-control" placeholder="Golden Retriever"  required autofocus><span class="input-group-btn"><button class="btn btn-default addOptions" type="button"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></span></div></div>'
        );
    }
    
    $(document).on('click',"button.addOptions", function(){
        addOptions();
    });    
    
    
    
    
    
    
    
});

