(function () {
    window.onload = () => {
        // Load the header and footer with ajax
        let ajax = new XMLHttpRequest();
        ajax.open("GET", "views/preloader.html", false);
        ajax.send();
        document.getElementById("preloader").innerHTML += ajax.responseText;
        ajax.open("GET", "views/header.html", false);
        ajax.send();
        document.getElementById("header").innerHTML += ajax.responseText;
        ajax.open("GET", "views/footer.html", false);
        ajax.send();
        document.getElementById("footer").innerHTML += ajax.responseText;

        // Navbar active class management
        let url = window.location.href;
        let file = url.split("/")[url.split("/").length - 1];
        switch (file) {
            case "" || "index.html":
                document.getElementById("index").classList.add("active");
                break;
            case "documents.html":
                document.getElementById("files").classList.add("active");
                break;
            case "game.html":
                document.getElementById("game").classList.add("active");
                break;
        }

        // Preloader
        window.setTimeout(fadeout, 300);

        // Accessibility
        document.styleSheets[0].cssRules[0].style.fontSize = "16px";
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

        var cont = document.getElementById("container");
        function changeSizeByBtn(size) {
            // Set value of the parameter as fontSize
            cont.style.fontSize = size;
        }
        function changeSizeBySlider() {
            var slider = document.getElementById("slider");

            // Set slider value as fontSize
            cont.style.fontSize = slider.value;
        }

        accesibility();
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
})();
