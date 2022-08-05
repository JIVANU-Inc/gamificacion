(function () {
    window.onload = () => {
        if (localStorage.getItem("cookiesMessage") === null) {
            loadCookiesMessage();
        }
        loadHeader();
        loadFooter();
        window.setTimeout(fadeout, 300);
    };

    // Preloader
    function fadeout() {
        document.querySelector(".preloader").style.opacity = "0";
        document.querySelector(".preloader").style.display = "none";
    }

    // Sticky menu
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

    // Accessibility
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
        // theme button
        themeButtonInput.addEventListener("click", () => {
            if (themeButtonInput.value == "light") {
                light2dark();
            } else {
                dark2light();
            }
            localStorage.setItem("accessibility", rangeInput.value + ";" + themeButtonInput.value + ";" + daltonicButtonInput.value);
        });
        // daltonic button
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
        // font size slider
        rangeInput.addEventListener("input", () => {
            rangeSelect();
            localStorage.setItem("accessibility", rangeInput.value + ";" + themeButtonInput.value + ";" + daltonicButtonInput.value);
        });
        // Ligth to dark
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
        // Dark to light
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
        // Daltonic on
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
        // Daltonic off
        function daltonic2off() {
            daltonicButtonInput.value = "0";
            daltonicButtonInput.innerHTML = '<i class="bi bi-eyeglasses"></i> (Apagado)';
            logo.src = "./media/imagenes/logo.jpg";
            colorblind_css.href = "";
        }
        // font size select
        function rangeSelect() {
            document.styleSheets[0].cssRules[0].style.fontSize = rangeInput.value + "px";
            rangeOutput.innerHTML = rangeInput.value;
        }
    }

    // Load cookies message with ajax request
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

    // Load header with ajax request
    async function loadHeader() {
        const header = document.getElementById("header");
        var header_content = await fetch("./views/header.html");
        var header_content = await header_content.text();
        header.innerHTML = header_content;

        // Navbar active class management
        let url = window.location.href;
        let file = url.split("/")[url.split("/").length - 1];
        if (file == "") {
            file = "index.html";
        }
        switch (file) {
            case "index.html":
                document.getElementById("index").classList.add("active");
                break;
            case "documents.html":
                document.getElementById("files").classList.add("active");
                break;
            case "game.html":
                document.getElementById("game").classList.add("active");
                break;
        }
        accesibility();
    }

    // Load footer with ajax request
    async function loadFooter() {
        const footer = document.getElementById("footer");
        var footer_content = await fetch("./views/footer.html");
        var footer_content = await footer_content.text();
        footer.innerHTML = footer_content;
    }
})();
