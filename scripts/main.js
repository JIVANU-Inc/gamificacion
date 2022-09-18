// CEXT.onInit = () => {
window.onload = () => {
    window.location.href = "#inicio";
    if (localStorage.getItem("cookiesMessage") === null) {
        loadCookiesMessage();
    }
    menuActiveClass();
    accesibility();
    // loadIndex();
    loadGameMenu(); // ! Test
    window.setTimeout(fadeout, 300);
};

/**
 * Función para hacer que el header se mantenga fijo en la parte superior de la página 
 */
window.onscroll = () => {
    try {
        var header_navbar = document.querySelector(
            ".hero-section-wrapper-5 .header"
        );
        var sticky = header_navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
        } else {
            header_navbar.classList.remove("sticky");
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * Efecto de fadeout al cargar la página
 */
function fadeout() {
    try {
        document.querySelector(".preloader").style.opacity = "0";
        document.querySelector(".preloader").style.display = "none";
    } catch (error) {
        console.error(error);
    }
}

/**
 * Función para establecer la clase active en el menú
 */
function menuActiveClass() {
    try {
        const indexMenuButton = document.getElementById("index");
        const documentsMenuButton = document.getElementById("documents");
        const gameMenuButton = document.getElementById("game");
        indexMenuButton.addEventListener("click", () => {
            indexMenuButton.classList.add("active");
            documentsMenuButton.classList.remove("active");
            gameMenuButton.classList.remove("active");
            loadIndex();
        });
        documentsMenuButton.addEventListener("click", () => {
            indexMenuButton.classList.remove("active");
            documentsMenuButton.classList.add("active");
            gameMenuButton.classList.remove("active");
            loadDocuments();
        });
        gameMenuButton.addEventListener("click", () => {
            indexMenuButton.classList.remove("active");
            documentsMenuButton.classList.remove("active");
            gameMenuButton.classList.add("active");
            loadGameMenu();
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Función para gestionar la accesibilidad
 */
function accesibility() {
    try {
        const rangeInput = document.getElementById("myRange");
        const rangeOutput = document.getElementById("outputRange");
        const themeButtonInput = document.getElementById("themeButton");
        const daltonicButtonInput = document.getElementById("daltonicButton");
        const colorblind_css = document.getElementById("colorblind_css");
        const theme = document.getElementById("theme");
        const logo = document.getElementById("logo");
        const modal_content = document.getElementById("modal_content");
        if (localStorage.getItem("accessibility") === null) {
            document.styleSheets[0].cssRules[0].style.fontSize = "16px";
            rangeInput.value = "16";
            rangeOutput.innerHTML = rangeInput.value;
            themeButtonInput.value = "light";
            themeButtonInput.innerHTML = '<i class="bi bi-brightness-high"></i> (Claro)';
            themeButtonInput.classList.add("btn-outline-dark");
            themeButtonInput.classList.remove("btn-dark");
            themeButtonInput.classList.remove("dark-to-light");
            daltonicButtonInput.value = "0";
            daltonicButtonInput.innerHTML = '<i class="bi bi-eyeglasses"></i> (Apagado)';
            colorblind_css.href = "";
            localStorage.setItem("accessibility", "16;light;0");
        } else {
            let CookiesInfo = localStorage.getItem("accessibility").split(";");
            document.styleSheets[0].cssRules[0].style.fontSize = rangeInput.value + "px";
            rangeOutput.innerHTML = rangeInput.value;
            rangeInput.value = CookiesInfo[0];
            rangeOutput.innerHTML = CookiesInfo[0];
            themeButtonInput.value = CookiesInfo[1];
            if (CookiesInfo[1] === "light") {
                dark2light();
            }
            if (CookiesInfo[1] === "dark") {
                light2dark();
            }
            daltonicButtonInput.value = CookiesInfo[2];
            if (CookiesInfo[2] === "0") {
                daltonic2off();
            }
            if (CookiesInfo[2] === "1") {
                daltoninc2on();
            }
        }

        rangeInput.addEventListener("input", () => {
            rangeSelect();
            localStorage.setItem("accessibility", rangeInput.value + ";" + themeButtonInput.value + ";" + daltonicButtonInput.value);
        });

        themeButtonInput.addEventListener("click", () => {
            if (themeButtonInput.value == "light") {
                light2dark();
            } else {
                dark2light();
            }
            localStorage.setItem("accessibility", rangeInput.value + ";" + themeButtonInput.value + ";" + daltonicButtonInput.value);
        });

        daltonicButtonInput.addEventListener("click", () => {
            if (daltonicButton.value == "0") {
                // enciende
                daltoninc2on();
            } else {
                // apaga
                daltonic2off();
            }
            localStorage.setItem("accessibility", rangeInput.value + ";" + themeButtonInput.value + ";" + daltonicButtonInput.value);
        });

        function rangeSelect() {
            document.styleSheets[0].cssRules[0].style.fontSize = rangeInput.value + "px";
            rangeOutput.innerHTML = rangeInput.value;
        }

        function light2dark() {
            themeButtonInput.value = "dark";
            themeButtonInput.innerHTML = '<i class="bi bi-moon-fill"></i> (Oscuro)';
            themeButtonInput.classList.remove("btn-outline-dark");
            themeButtonInput.classList.add("btn-dark");
            themeButtonInput.classList.add("dark-to-light");
            theme.href = "./estilos/style_dark.css";
            modal_content.classList.add("modal-content-dark");
            if (daltonicButtonInput.value == "1") {
                // claro
                colorblind_css.href = "./estilos/style_colorblind_dark.css";
            } else {
                // oscuro
                colorblind_css.href = "";
            }
        }

        function dark2light() {
            themeButtonInput.value = "light";
            themeButtonInput.innerHTML =
                '<i class="bi bi-brightness-high"></i> (Claro)';
            themeButtonInput.classList.add("btn-outline-dark");
            themeButtonInput.classList.remove("btn-dark");
            themeButtonInput.classList.remove("dark-to-light");
            theme.href = "./estilos/style.css";
            if (daltonicButtonInput.value == "1") {
                // claro
                colorblind_css.href = "./estilos/style_colorblind.css";
            } else {
                // oscuro
                colorblind_css.href = "";
            }
            modal_content.classList.remove("modal-content-dark");
        }

        function daltoninc2on() {
            daltonicButtonInput.value = "1";
            daltonicButtonInput.innerHTML = "<i class='bi bi-sunglasses'></i> (Encendido)";
            logo.src = "./media/imagenes/logo_colorblind.jpg";
            if (themeButtonInput.value == "light") {
                // claro
                colorblind_css.href = "./estilos/style_colorblind.css";
            } else {
                // oscuro
                colorblind_css.href = "./estilos/style_colorblind_dark.css";
            }
        }

        function daltonic2off() {
            daltonicButtonInput.value = "0";
            daltonicButtonInput.innerHTML = '<i class="bi bi-eyeglasses"></i> (Apagado)';
            logo.src = "./media/imagenes/logo.jpg";
            colorblind_css.href = "";
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * Función para cargar el HTML con el mensaje de uso de cookies
 */
async function loadCookiesMessage() {
    try {
        const cookiesMessage = document.getElementById("cookiesMessage");
        var cookies_message_content = await fetch(
            "./views/cookiesMessage.html"
        );
        var cookies_message_content = await cookies_message_content.text();
        cookiesMessage.innerHTML = cookies_message_content;
        document.getElementById("close").addEventListener("click", () => {
            document.getElementById("cookiesMessage").style.display = "none";
            localStorage.setItem("cookiesMessage", "true");
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Función para cargar el HTML con el contenido de la página de inicio
 */
async function loadIndex() {
    try {
        const feature = document.getElementById("feature");
        const indexMenuButton = document.getElementById("index");
        const documentsMenuButton = document.getElementById("documents");
        const gameMenuButton = document.getElementById("game");
        var index_content = await fetch("./views/indexView.html");
        var index_content = await index_content.text();
        feature.innerHTML = index_content;
        const documentsCard = document.getElementById("documentosCard");
        const juegoCard = document.getElementById("juegoCard");
        documentsCard.addEventListener("click", () => {
            indexMenuButton.classList.remove("active");
            documentsMenuButton.classList.add("active");
            gameMenuButton.classList.remove("active");
            loadDocuments();
        });
        juegoCard.addEventListener("click", () => {
            indexMenuButton.classList.remove("active");
            documentsMenuButton.classList.remove("active");
            gameMenuButton.classList.add("active");
            loadGameMenu();
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Función para cargar el HTML con el contenido de la página de documentos
*/
async function loadDocuments() {
    try {
        const feature = document.getElementById("feature");
        var documents_content = await fetch("./views/documentsView.html");
        var documents_content = await documents_content.text();
        feature.innerHTML = documents_content;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Función para cargar el HTML con el contenido de el menú del juego
 */
async function loadGameMenu() {
    try {
        const feature = document.getElementById("feature");
        var menu_content = await fetch("./views/gameMenu.html");
        var menu_content = await menu_content.text();
        feature.innerHTML = menu_content;
        const gameButton = document.getElementById("jugar");
        const addQuestionsButton = document.getElementById("preguntas");
        const historyButton = document.getElementById("historial");
        gameButton.addEventListener("click", () => {
            loadGame();
        });
        addQuestionsButton.addEventListener("click", () => {
            loadAddQuestions();
        });
        historyButton.addEventListener("click", () => {
            loadHistory();
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Función para cargar el HTML con el contenido del juego
 */
async function loadGame() {
    try {
        let partidaNum = null;
        // let estado = await CEXT.getGlobalStatus();
        let estado = false; // ! Test
        if (estado) {
            if (confirm("Hay una partida guardada\n¿Desea continuarla?")) {
                // partidaNum = await CEXT.getNumAttempts();
                partidaNum = 1; // ! Test
                alert(partidaNum);
                const feature = document.getElementById("feature");
                var game_content = await fetch("./views/gameView.html");
                var game_content = await game_content.text();
                feature.innerHTML = game_content;
                alert("Continuando partida");
            } else {
                newGame();
            }
        } else {
            newGame();
        }
    } catch (error) {
        console.error(error);
    }
}

var flag = 0;

/**
 * Función para agregar los eventos a los botones del juego
 * @param {number} flag
 * @param {Array} element
 * @param {HTML element} puntuacion 
 * @param {HTML element} boton1 
 * @param {HTML element} boton2 
 * @param {HTML element} boton3 
 * @param {HTML element} boton4 
 * @param {HTML element} pregunta
 * @param {HTML element} respuesta1
 * @param {HTML element} respuesta2
 * @param {HTML element} respuesta3
 * @param {HTML element} respuesta4
 */
function seleccion(flag, element, puntuacion, boton1, boton2, boton3, boton4, pregunta, respuesta1, respuesta2, respuesta3, respuesta4) {
    boton1.addEventListener("click", () => {
        if (element[1][0][1] == "true") {
            puntuacion.innerHTML = parseInt(puntuacion.innerHTML) + 1;
        }
        flag++;
    });
    boton2.addEventListener("click", () => {
        if (element[1][1][1] == "true") {
            puntuacion.innerHTML = parseInt(puntuacion.innerHTML) + 1;
        }
        flag++;
    });
    boton3.addEventListener("click", () => {
        if (element[1][2][1] == "true") {
            puntuacion.innerHTML = parseInt(puntuacion.innerHTML) + 1;
        }
        flag++;
    });
    boton4.addEventListener("click", () => {
        if (element[1][3][1] == "true") {
            puntuacion.innerHTML = parseInt(puntuacion.innerHTML) + 1;
        }
        flag++;
    });
    if (flag < 15) {
        getQuestion(flag, element, puntuacion, boton1, boton2, boton3, boton4, pregunta, respuesta1, respuesta2, respuesta3, respuesta4);
    }
}

/**
 * Función para obtener una pregunta
 * @param {Integer} flag 
 * @param {HTML element} pregunta 
 * @param {HTML element} respuesta1 
 * @param {HTML element} respuesta2 
 * @param {HTML element} respuesta3 
 * @param {HTML element} respuesta4 
 */
function getQuestion(flag, puntuacion, boton1, boton2, boton3, boton4, pregunta, respuesta1, respuesta2, respuesta3, respuesta4) {
    getXML().then((data) => {
        seleccion(flag, data[flag], puntuacion, boton1, boton2, boton3, boton4, pregunta, respuesta1, respuesta2, respuesta3, respuesta4);
        pregunta.innerHTML = data[flag][0];
        respuesta1.innerHTML = data[flag][1][0][0];
        respuesta2.innerHTML = data[flag][1][1][0];
        respuesta3.innerHTML = data[flag][1][2][0];
        respuesta4.innerHTML = data[flag][1][3][0];
    }).catch((error) => {
        console.log(error);
    });
}

/**
 * Función para cargar un juego nuevo
 */
async function newGame() {
    try {
        const feature = document.getElementById("feature");
        var game_content = await fetch("./views/gameView.html");
        var game_content = await game_content.text();
        feature.innerHTML = game_content;
        const pregunta = document.getElementById("pregunta");
        const puntuacion = document.getElementById("puntuacion");
        const respuesta1 = document.getElementById("respuesta1");
        const respuesta2 = document.getElementById("respuesta2");
        const respuesta3 = document.getElementById("respuesta3");
        const respuesta4 = document.getElementById("respuesta4");
        const boton1 = document.getElementById("boton1");
        const boton2 = document.getElementById("boton2");
        const boton3 = document.getElementById("boton3");
        const boton4 = document.getElementById("boton4");
        getQuestion(flag, puntuacion, boton1, boton2, boton3, boton4, pregunta, respuesta1, respuesta2, respuesta3, respuesta4);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Función para cargar el HTML con el contenido de añadir preguntas
 */
async function loadAddQuestions() { // TODO: Acabar
    const feature = document.getElementById("feature");
    var addQuestions_content = await fetch("./views/addQuestionsView.html");
    var addQuestions_content = await addQuestions_content.text();
    feature.innerHTML = addQuestions_content;
}

/**
 * Función para cargar el archivo XML con las preguntas
 * @returns Array con las preguntas mezcladas
 */
async function getXML() {
    try {
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
    } catch (error) {
        console.error(error);
    }
}

/**
 * Función para cargar el HTML con el contenido del historial de partidas
 */
async function loadHistory() {
    try {
        const feature = document.getElementById("feature");
        var history_content = await fetch("./views/historyView.html");
        var history_content = await history_content.text();
        feature.innerHTML = history_content;
        const volver = document.getElementById("volver");
        const tbody = document.getElementById("tbody");
        volver.addEventListener("click", () => {
            loadGameMenu();
        });
        let texto = "";
        let numPartidas = CEXT.getNumAttemp();
        if (numPartidas == 0 || numPartidas == null) {
            alert("No hay partidas registradas");
        } else {
            for (let i = 1; i <= numPartidas; i++) {
                texto += `<tr><td>${i}</td><td>${CEXT.getAttempPoints(i)}</td></tr>`;
            }
        }
        tbody.innerHTML = texto;
    } catch (error) {
        console.error(error);
    }
}
// }