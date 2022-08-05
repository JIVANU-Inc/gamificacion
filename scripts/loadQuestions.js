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