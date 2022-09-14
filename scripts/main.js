// Se ejecuta una vez cuando se carga la página
window.onload = () => {
    // Cargo el mensaje de cookies
    if (localStorage.getItem("cookiesMessage") === null) {
        loadCookiesMessage();
    }
    // Cargo el header
    loadHeader();
    // Cargo el footer
    loadFooter();
    // Cargo el efecto de fadeout
    window.setTimeout(fadeout, 300);
};

/**
 * Efecto de fadeout al cargar la página
 */
function fadeout() {
    document.querySelector(".preloader").style.opacity = "0";
    document.querySelector(".preloader").style.display = "none";
}

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
 * Función para gestionar la accesibilidad
 */
function accesibility() {
    // Elementos del DOM
    const rangeInput = document.getElementById("myRange");
    const rangeOutput = document.getElementById("outputRange");
    const themeButtonInput = document.getElementById("themeButton");
    const daltonicButtonInput = document.getElementById("daltonicButton");
    const colorblind_css = document.getElementById("colorblind_css");
    const theme = document.getElementById("theme");
    const logo = document.getElementById("logo");
    const modal_content = document.getElementById("modal_content");
    // No existe la cookie de accesibility en el LocalStorage
    if (localStorage.getItem("accessibility") === null) {
        // Valores por defecto: fontSize = 16px | theme = light | daltonic = 0 (off)
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
    } else { // Existe la cookie de accesibility en el LocalStorage
        // Resacatamos los valores de la cookie de accesibility
        let CookiesInfo = localStorage.getItem("accessibility").split(";");
        // Asignamos los valores a los elementos del DOM
        document.styleSheets[0].cssRules[0].style.fontSize = rangeInput.value + "px";
        rangeOutput.innerHTML = rangeInput.value;
        rangeInput.value = CookiesInfo[0]; // fontSize
        rangeOutput.innerHTML = CookiesInfo[0]; // fontSize
        themeButtonInput.value = CookiesInfo[1]; // theme
        if (CookiesInfo[1] === "light") { // theme = light
            dark2light();
        }
        if (CookiesInfo[1] === "dark") { // theme = dark
            light2dark();
        }
        daltonicButtonInput.value = CookiesInfo[2]; // daltonic
        if (CookiesInfo[2] === "0") { // daltonic = 0 (off)
            daltonic2off();
        }
        if (CookiesInfo[2] === "1") { // daltonic = 1 (on)
            daltoninc2on();
        }
    }
    // Rango para cambiar el tamaño de la fuente
    rangeInput.addEventListener("input", () => {
        rangeSelect();
        localStorage.setItem("accessibility", rangeInput.value + ";" + themeButtonInput.value + ";" + daltonicButtonInput.value);
    });
    // Botón para cambiar el tema [light/dark]
    themeButtonInput.addEventListener("click", () => {
        if (themeButtonInput.value == "light") {
            light2dark();
        } else {
            dark2light();
        }
        localStorage.setItem("accessibility", rangeInput.value + ";" + themeButtonInput.value + ";" + daltonicButtonInput.value);
    });
    // Botón para cambiar el modo daltonico [on/off]
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
    // Función para cambiar el tamaño de la fuente
    function rangeSelect() {
        document.styleSheets[0].cssRules[0].style.fontSize = rangeInput.value + "px";
        rangeOutput.innerHTML = rangeInput.value;
    }
    // Función para cambiar el tema de claro a oscuro
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
    // Función para cambiar el tema de oscuro a claro
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
    // Función para cambiar el modo daltonico a on
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
    // Función para cambiar el modo daltonico a off
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
    // Elementos del DOM
    const cookiesMessage = document.getElementById("cookiesMessage");
    // Petición AJAX
    var cookies_message_content = await fetch(
        "./views/cookiesMessage.html"
    );
    // Cargamos el contenido del mensaje de cookies
    var cookies_message_content = await cookies_message_content.text();
    // Cargamos el mensaje de cookies
    cookiesMessage.innerHTML = cookies_message_content;
    // Añadimos el evento para aceptar las cookies
    document.getElementById("close").addEventListener("click", () => {
        // Eliminamos el mensaje de cookies
        document.getElementById("cookiesMessage").style.display = "none";
        // Creamos la cookie para que no se vuelva a mostrar
        localStorage.setItem("cookiesMessage", "true");
    });
}

/**
 * Función para cargar el HTML con el header
 */
async function loadHeader() {
    window.location.href = "#inicio";
    loadIndex();
    // Elementos del DOM
    const header = document.getElementById("header");
    // Petición AJAX
    var header_content = await fetch("./views/header.html");
    // Cargamos el contenido del header
    var header_content = await header_content.text();
    // Cargamos el header
    header.innerHTML = header_content;
    // Elementos del DOM
    const indexMenuButton = document.getElementById("index");
    const documentsMenuButton = document.getElementById("documents");
    const gameMenuButton = document.getElementById("game");
    // Añadimos el evento para poner clase active al botón del menú
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
        loadGame();
    });
    // Cargamos los eventos de accesibilidad
    accesibility();
}

/**
 * Función para cargar el HTML con el footer
  */
async function loadFooter() {
    // Elementos del DOM
    const footer = document.getElementById("footer");
    // Petición AJAX
    var footer_content = await fetch("./views/footer.html");
    // Cargamos el contenido del footer
    var footer_content = await footer_content.text();
    // Cargamos el footer
    footer.innerHTML = footer_content;
}

/**
 * Función para cargar el HTML con el contenido de la página de inicio
 */
async function loadIndex() {
    // Elementos del DOM
    const feature = document.getElementById("feature");
    // Petición AJAX
    var index_content = await fetch("./views/indexView.html");
    // Cargamos el contenido del index
    var index_content = await index_content.text();
    // Cargamos el index
    feature.innerHTML = index_content;
}

/**
 * Función para cargar el HTML con el contenido de la página de documentos
 */
async function loadDocuments() {
    // Elementos del DOM
    const feature = document.getElementById("feature");
    // Petición AJAX
    var documents_content = await fetch("./views/documentsView.html");
    // Cargamos el contenido de los documentos
    var documents_content = await documents_content.text();
    // Cargamos los documentos
    feature.innerHTML = documents_content;
}

/**
 * Función para cargar el HTML con el contenido de el menú del juego
 */
async function loadGame() {
    // Elementos del DOM
    const feature = document.getElementById("feature");
    // Petición AJAX
    var menu_content = await fetch("./views/gameMenu.html");
    // Cargamos el contenido del juego
    var menu_content = await menu_content.text();
    // Cargamos el juego
    feature.innerHTML = menu_content;
}