// Load game menu with ajax request
async function loadGame() {
    const gameMenu = document.getElementById("playground");
    var gameMenu_content = await fetch("./views/gameMenu.html");
    var gameMenu_content = await gameMenu_content.text();
    gameMenu.innerHTML = gameMenu_content;
    document.getElementById("historial").addEventListener("click", function () {
        gameMenu.innerHTML = "";
        loadHistorial();
    });

}

// Load historial with ajax request
async function loadHistorial() {
    const historial = document.getElementById("playground");
    var historial_content = await fetch("./views/historial.html");
    var historial_content = await historial_content.text();
    historial.innerHTML = historial_content;
    const volver = document.getElementById("volver");
    volver.addEventListener("click", function () {
        loadGame();
    });
}

// Load questions from XML with ajax request
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

loadGame();