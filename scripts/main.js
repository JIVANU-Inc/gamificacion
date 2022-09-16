// CEXT.onInit = () => {
window.onload = () => {
    window.location.href = "#inicio";
    if (localStorage.getItem("cookiesMessage") === null) {
        loadCookiesMessage();
    }
    menuActiveClass();
    accesibility();
    // loadIndex();
    loadGameMenu(); // Para probar el juego
    window.setTimeout(fadeout, 300);
};

/**
 * Función para hacer que el header se mantenga fijo en la parte superior de la página 
 */
window.onscroll = () => {
    var header_navbar = document.querySelector(
        ".hero-section-wrapper-5 .header"
    );
    var sticky = header_navbar.offsetTop;

    if (window.pageYOffset > sticky) {
        header_navbar.classList.add("sticky");
    } else {
        header_navbar.classList.remove("sticky");
    }
};

/**
 * Efecto de fadeout al cargar la página
 */
function fadeout() {
    document.querySelector(".preloader").style.opacity = "0";
    document.querySelector(".preloader").style.display = "none";
}

/**
 * Función para establecer la clase active en el menú
 */
function menuActiveClass() {
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
}

/**
 * Función para gestionar la accesibilidad
 */
function accesibility() {
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
}

/**
 * Función para cargar el HTML con el mensaje de uso de cookies
 */
async function loadCookiesMessage() {
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
}

/**
 * Función para cargar el HTML con el contenido de la página de inicio
 */
async function loadIndex() {
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
}

/**
 * Función para cargar el HTML con el contenido de la página de documentos
 */
async function loadDocuments() {
    const feature = document.getElementById("feature");
    var documents_content = await fetch("./views/documentsView.html");
    var documents_content = await documents_content.text();
    feature.innerHTML = documents_content;
}

/**
 * Función para cargar el HTML con el contenido de el menú del juego
 */
async function loadGameMenu() {
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

}

/**
 * Función para cargar el HTML con el contenido del juego
 */
async function loadGame() {
    const feature = document.getElementById("feature");
    var game_content = await fetch("./views/gameView.html");
    var game_content = await game_content.text();
    feature.innerHTML = game_content;
}

/**
 * Función para cargar el HTML con el contenido de añadir preguntas
 */
async function loadAddQuestions() {
    const feature = document.getElementById("feature");
    var addQuestions_content = await fetch("./views/addQuestionsView.html");
    var addQuestions_content = await addQuestions_content.text();
    feature.innerHTML = addQuestions_content;
}

/**
 * Función para cargar el HTML con el contenido del historial de partidas
 */
async function loadHistory() {
    const feature = document.getElementById("feature");
    var history_content = await fetch("./views/historyView.html");
    var history_content = await history_content.text();
    feature.innerHTML = history_content;
    const volver = document.getElementById("volver");
    const tbody = document.getElementById("tbody");
    volver.addEventListener("click", () => {
        loadGameMenu();
    });
    try {
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
        console.log(error);
    }
}
// }