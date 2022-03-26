(function () {
    let myRange = document.getElementById("myRange");
    let themeButton = document.getElementById("themeButton");
    let daltonicButton = document.getElementById("daltonicButton");

    window.onload = () => {
        // Preloader
        window.setTimeout(fadeout, 300);
        // Accessibility
        document.body.style.fontSize = "16px";

        myRange.value = "16";
        themeButton.value = "light";
        themeButton.innerHTML = '<i class="bi bi-brightness-high"></i> (Claro)';
        themeButton.classList.add("btn-outline-dark");
        themeButton.classList.remove("btn-dark");
        themeButton.classList.remove("dark-to-light");
        daltonicButton.value = "0";
        daltonicButton.innerHTML = '<i class="bi bi-eyeglasses"></i> (Apagado)';
    };

    function fadeout() {
        document.querySelector(".preloader").style.opacity = "0";
        document.querySelector(".preloader").style.display = "none";
    }

    // sticky menu
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

    // accessibility
    themeButton.addEventListener("click", function () {
        if (themeButton.value == "light") {
            themeButton.value = "dark";
            themeButton.innerHTML = '<i class="bi bi-moon-fill"></i> (Oscuro)';
            themeButton.classList.remove("btn-outline-dark");
            themeButton.classList.add("btn-dark");
            themeButton.classList.add("dark-to-light");
            document.getElementById("theme").href = "./css/style_dark.css";
            document
                .getElementById("modal_content")
                .classList.add("modal-content-dark");
        } else {
            themeButton.value = "light";
            themeButton.innerHTML =
                '<i class="bi bi-brightness-high"></i> (Claro)';
            themeButton.classList.add("btn-outline-dark");
            themeButton.classList.remove("btn-dark");
            themeButton.classList.remove("dark-to-light");
            document.getElementById("theme").href = "./css/style.css";
        }
    });

    daltonicButton.addEventListener("click", function () {
        if (daltonicButton.value == "0") {
            daltonicButton.value = "1";
            daltonicButton.innerHTML =
                "<i class='bi bi-sunglasses'></i> (Encendido)";
            document.getElementById("logo").src =
                "./assets/img/logo/logo_colorblind.jpg";
            document.getElementById("colorblind_css").href = "./css/style_colorblind.css";
        } else {
            daltonicButton.value = "0";
            daltonicButton.innerHTML =
                '<i class="bi bi-eyeglasses"></i> (Apagado)';
            document.getElementById("logo").src = "./assets/img/logo/logo.jpg";
            document.getElementById("colorblind_css").href = "";
        }
    });
})();
