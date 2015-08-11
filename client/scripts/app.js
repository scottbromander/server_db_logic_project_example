var peopleData;

$(document).ready(function(){
    $(".generate").on('click', function(){
       $.ajax({
           type: "GET",
           url: "/things/generate",
           success: function(){
               console.log("GENERATED!");
               getData();
           }
       });
    });

    $("#peopleContainer").on('click', '.delete', function(){
        var $el = $(this);
        $.ajax({
            type: "DELETE",
            url: "/things/" + $(this).data('id'),
            success: function(data){
                console.log(data);
                $el.parent().remove();
            }
        });
    });

    getData();
});

function getData(){
    $.ajax({
        type: "GET",
        url: "/things",
        success: function(data){
            console.log(data);
            peopleData = data;
            appendPeople();
        }
    });
}

function appendPeople(){
    $("#peopleContainer").empty();
    for(var i = 0; i < peopleData.length; i++){
        $("#peopleContainer").append("<div class='col-sm-3 well'></div>");
        var $el =  $("#peopleContainer").children().last();
        $el.append("<p class='lead'>" + peopleData[i].name + "</p>");
        $el.append("<p>" + peopleData[i].age + ", " + peopleData[i].sex + "</p>");
        $el.append("<p class='location'>" + peopleData[i].location + "</p>");
        $el.append("<p class='twitter'>" + peopleData[i].twitter + "</p>");
        $el.append("<button class='btn btn-danger delete' data-id='" +  peopleData[i]._id + "'>X</button>");
    }
}