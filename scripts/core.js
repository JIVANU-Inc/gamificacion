const play = document.getElementById("play");

// Cargar las preguntas del fichero XML
async function getXML() {
    let preguntas = [];
    const response = await fetch('./xml/cuestionario.xml');
    const xml = await response.text();
    $(xml).find("enunciado").each(function () {
        let temp = [$(this).text()];
        let respuestas = [];
        $(this).next().find("opcion").each(function () {
            respuestas.push([$(this).text(), $(this).attr("select")]);
        });
        temp.push(respuestas);
        preguntas.push(temp);
    });
    function shuffle(arr) {
        let currentIndex = arr.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [
                arr[randomIndex], arr[currentIndex]];
        }
        return arr;
    }
    let shuffled = shuffle(preguntas);
    return shuffled;
}

CEXT.onInit = () => {
    // TODO: Add logic here
    var partidaNum = null;

    CEXT.onInit = () => {
        // Realizar las llamadas de inicialización del juego
        let estado = CEXT.getGlobalStatus(); // true si había una partida guardada, false en caso contrario

        if (estado) {
            let confirm = confirm("Hay una partida guardada\n¿Desea continuar?");
            if (confirm) {
                // Si hay una partida guardada, cargarla
                partidaNum = CEXT.getNumAttempts(); // Número de partida

            } else {
                alert("no hay partida guardada");
            }

        } else {
            // Si no hay partida guardada, iniciar una nueva partida
            CEXT.startNewAttempt();

            // Cargar las preguntas del fichero XML
            getXML().then((data) => {
                data.forEach(element => {
                    let question = element[0];
                    let test = question;
                    let answers = element[1];
                    answers.forEach(answer => {
                        test += "\n" + answer[0] + " -> " + answer[1];
                    });
                    //alert(test);
                });
            }).catch((error) => {
                console.log(error);
            });

            let pregunta = `<div class="quest-name row justify-content-center">
                                <div class="col-xxl-5 col-xl-5 col-lg-7 col-md-8" style="width: 700px">
                                    <div class="section-title text-center mb-60">
                                        <h3 class="mb-15">PREGUNTA 1:</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="quests row">
                                <div class="col-lg-6 col-md-6">
                                    <p class="puntuacion mb-5"><strong>Puntuación:</strong></p>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <p class="time mb-5"><strong>Tiempo restante:</strong></p>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <div class="single-feature quest1">
                                            <div class="content">
                                                <p>Sección para descargar documentos de estudio</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="single-feature quest2">
                                            <div class="content">
                                                <p>Pon a prueba tus conocimientos mientras juegas</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="single-feature quest3">
                                            <div class="content">
                                                <p>Sección para descargar documentos de estudio</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="single-feature quest4">
                                            <div class="content">
                                                <p>Sección para descargar documentos de estudio</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            play.innerHTML = pregunta;
        }
    }

}