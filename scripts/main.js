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

        // No existe la cookie de accesibility en el LocalStorage
        if (localStorage.getItem("accessibility") === null) {
            // Valores por defecto: fontSize = 16px | theme = light | daltonic = 0 (off)
            rangeInput.value = "16";
            rangeOutput.innerHTML = rangeInput.value;
            themeButtonInput.value = "light";
            themeButtonInput.innerHTML = '<i class="bi bi-brightness-high"></i> (Claro)';
            themeButtonInput.classList.add("btn-outline-dark");
            themeButtonInput.classList.remove("btn-dark");
            themeButtonInput.classList.remove("dark-to-light");
            daltonicButtonInput.value = "0";
            daltonicButtonInput.innerHTML = '<i class="bi bi-eyeglasses"></i> (Apagado)';
            document.getElementById("colorblind_css").href = "";
            localStorage.setItem("accessibility", "16;light;0");
        } else { // Existe la cookie de accesibility en el LocalStorage
            let CookiesInfo = [];
            CookiesInfo = localStorage.getItem("accessibility").split(";");
            rangeInput.value = CookiesInfo[0];
            rangeOutput.innerHTML = CookiesInfo[0];
            themeButtonInput.value = CookiesInfo[1];
            if (CookiesInfo[1] === "light") {
                themeButtonInput.innerHTML = '<i class="bi bi-brightness-high"></i> (Claro)';
                themeButtonInput.classList.add("btn-outline-dark");
                themeButtonInput.classList.remove("btn-dark");
                themeButtonInput.classList.remove("dark-to-light");
            }
            if (CookiesInfo[1] === "dark") {
                themeButtonInput.innerHTML = '<i class="bi bi-brightness-high"></i> (Oscuro)';
                themeButtonInput.classList.add("btn-dark");
                themeButtonInput.classList.remove("btn-outline-dark");
                themeButtonInput.classList.remove("light-to-dark");
            }
            daltonicButtonInput.value = CookiesInfo[2];
            if (CookiesInfo[2] === "0") {
                daltonicButtonInput.innerHTML = '<i class="bi bi-eyeglasses"></i> (Apagado)';
                document.getElementById("colorblind_css").href = "";
            }
            if (CookiesInfo[2] === "1") {
                daltonicButtonInput.innerHTML = '<i class="bi bi-eyeglasses"></i> (Encendido)';
                document.getElementById("colorblind_css").href = "css/colorblind.css";
            }
        }

        // theme button
        themeButtonInput.addEventListener("click", function () {
            if (themeButtonInput.value == "light") {
                themeButtonInput.value = "dark";
                themeButtonInput.innerHTML =
                    '<i class="bi bi-moon-fill"></i> (Oscuro)';
                themeButtonInput.classList.remove("btn-outline-dark");
                themeButtonInput.classList.add("btn-dark");
                themeButtonInput.classList.add("dark-to-light");
                document.getElementById("theme").href =
                    "./estilos/style_dark.css";
                document
                    .getElementById("modal_content")
                    .classList.add("modal-content-dark");
                if (
                    daltonicButtonInput.value == "1"
                ) {
                    // claro
                    document.getElementById("colorblind_css").href =
                        "./estilos/style_colorblind_dark.css";
                } else {
                    // oscuro
                    document.getElementById("colorblind_css").href = "";
                }
            } else {
                document.getElementById("themeButton").value = "light";
                document.getElementById("themeButton").innerHTML =
                    '<i class="bi bi-brightness-high"></i> (Claro)';
                document
                    .getElementById("themeButton")
                    .classList.add("btn-outline-dark");
                document
                    .getElementById("themeButton")
                    .classList.remove("btn-dark");
                document
                    .getElementById("themeButton")
                    .classList.remove("dark-to-light");
                document.getElementById("theme").href =
                    "./estilos/style.css";
                if (
                    daltonicButtonInput.value == "1"
                ) {
                    // claro
                    document.getElementById("colorblind_css").href =
                        "./estilos/style_colorblind.css";
                } else {
                    // oscuro
                    document.getElementById("colorblind_css").href = "";
                }
            }
        });
        // daltonic button
        daltonicButtonInput.addEventListener("click", function () {
            if (daltonicButton.value == "0") {
                // enciende
                daltonicButtonInput.value = "1";
                daltonicButtonInput.innerHTML =
                    "<i class='bi bi-sunglasses'></i> (Encendido)";
                document.getElementById("logo").src =
                    "./media/imagenes/logo_colorblind.jpg";
                if (
                    document.getElementById("themeButton").value == "light"
                ) {
                    // claro
                    document.getElementById("colorblind_css").href =
                        "./estilos/style_colorblind.css";
                } else {
                    // oscuro
                    document.getElementById("colorblind_css").href =
                        "./estilos/style_colorblind_dark.css";
                }
            } else {
                // apaga
                daltonicButtonInput.value = "0";
                daltonicButtonInput.innerHTML =
                    '<i class="bi bi-eyeglasses"></i> (Apagado)';
                document.getElementById("logo").src =
                    "./media/imagenes/logo.jpg";
                document.getElementById("colorblind_css").href = "";
            }
        });
        // font size slider
        rangeInput.addEventListener("input", () => {
            document.styleSheets[0].cssRules[0].style.fontSize =
                rangeInput.value + "px";
            document.getElementById("outputRange").innerHTML =
                rangeInput.value;
        });
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

    const CrearItem = (actividad) => {

        let item = {
          actividad: actividad,
          estado: false
        }
      
        CookiesInfo.push(item);
      
        return item;
      
      }
})();
