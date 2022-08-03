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
        document.styleSheets[0].cssRules[0].style.fontSize = "16px";
        document.getElementById("outputRange").innerHTML =
            document.getElementById("myRange").value;
        document.getElementById("myRange").value = "16";
        document.getElementById("outputRange").innerHTML =
            document.getElementById("myRange").value;
        document.getElementById("themeButton").value = "light";
        document.getElementById("themeButton").innerHTML =
            '<i class="bi bi-brightness-high"></i> (Claro)';
        document
            .getElementById("themeButton")
            .classList.add("btn-outline-dark");
        document.getElementById("themeButton").classList.remove("btn-dark");
        document
            .getElementById("themeButton")
            .classList.remove("dark-to-light");
        document.getElementById("daltonicButton").value = "0";
        document.getElementById("daltonicButton").innerHTML =
            '<i class="bi bi-eyeglasses"></i> (Apagado)';
        document.getElementById("colorblind_css").href = "";
        // theme button
        document
            .getElementById("themeButton")
            .addEventListener("click", function () {
                if (document.getElementById("themeButton").value == "light") {
                    document.getElementById("themeButton").value = "dark";
                    document.getElementById("themeButton").innerHTML =
                        '<i class="bi bi-moon-fill"></i> (Oscuro)';
                    document
                        .getElementById("themeButton")
                        .classList.remove("btn-outline-dark");
                    document
                        .getElementById("themeButton")
                        .classList.add("btn-dark");
                    document
                        .getElementById("themeButton")
                        .classList.add("dark-to-light");
                    document.getElementById("theme").href =
                        "./estilos/style_dark.css";
                    document
                        .getElementById("modal_content")
                        .classList.add("modal-content-dark");
                    if (
                        document.getElementById("daltonicButton").value == "1"
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
                        document.getElementById("daltonicButton").value == "1"
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
        document
            .getElementById("daltonicButton")
            .addEventListener("click", function () {
                if (daltonicButton.value == "0") {
                    // enciende
                    document.getElementById("daltonicButton").value = "1";
                    document.getElementById("daltonicButton").innerHTML =
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
                    document.getElementById("daltonicButton").value = "0";
                    document.getElementById("daltonicButton").innerHTML =
                        '<i class="bi bi-eyeglasses"></i> (Apagado)';
                    document.getElementById("logo").src =
                        "./media/imagenes/logo.jpg";
                    document.getElementById("colorblind_css").href = "";
                }
            });
        // font size slider
        document.getElementById("myRange").addEventListener("input", () => {
            document.styleSheets[0].cssRules[0].style.fontSize =
                document.getElementById("myRange").value + "px";
            document.getElementById("outputRange").innerHTML =
                document.getElementById("myRange").value;
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
})();
