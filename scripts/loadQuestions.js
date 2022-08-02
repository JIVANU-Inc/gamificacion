$(document).ready(function () {
    // Pedimos por ajax
    $.ajax({
        type: "GET",
        url: "./xml/cuestionario.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find("enunciado").each(function () {

                    let res = [];
                    var enunciado = $(this).text();

                    var respuesta = $(this).next().find("opcion").each(function () {
                            var opcion = $(this).text();
                            var correcta = $(this).attr("select");
                            var respuesta = {
                                opcion: opcion,
                                correcta: correcta,
                            };
                            res.push(respuesta);
                        });

                    $("#questions").append(
                        "<li>" +
                            enunciado +
                            "<br><li>" +
                            res[0].opcion +
                            " -> " +
                            res[0].correcta +
                            "</li><li>" +
                            res[1].opcion +
                            " -> " +
                            res[1].correcta +
                            "</li><li>" +
                            res[2].opcion +
                            " -> " +
                            res[2].correcta +
                            "</li><li>" +
                            res[3].opcion +
                            " -> " +
                            res[3].correcta +
                            "</li></li><br>"
                    );
                });
        },
    });
});
