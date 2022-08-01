$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "./xml/cuestionario.xml",
        dataType: "xml",
        success: function (xml) {
            //var xmlDoc = $.parseXML( xml );   <------------------this line
            //if single item
            //var person = $(xml).find("pregunta").text();

            //but if it's multible items then loop
            $(xml)
                .find("quiz")
                .each(function () {
                    $("#questions").append("<li>" + $(this).text() + "</li>");
                });
        },
    });
});
