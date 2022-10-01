CEXT.onInit = () => {
    window.onload = () => {
        window.location.href = "#inicio";
        if (localStorage.getItem("cookiesMessage") === null) {
            loadCookiesMessage();
        }
        menuActiveClass();
        accesibility();
        loadIndex();
        // window.setTimeout(fadeout, 300);
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
            console.log(error);
        }
    }

    /**
     * Efecto de fadeout al cargar la página
     */
    // function fadeout() {
    //     try {
    //         document.querySelector(".preloader").style.opacity = "0";
    //         document.querySelector(".preloader").style.display = "none";
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            // const addQuestionsButton = document.getElementById("preguntas");
            const historyButton = document.getElementById("historial");
            gameButton.addEventListener("click", () => {
                loadGame();
            });
            // addQuestionsButton.addEventListener("click", () => {
            //     loadAddQuestions();
            // });
            historyButton.addEventListener("click", () => {
                loadHistory();
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Función para cargar el HTML con el contenido del juego
     */
    async function loadGame() {
        try {
            newGame();
            // let partidaNum = null;
            // let estado = await CEXT.getGlobalStatus();
            // if (estado) {
            //     if (confirm("Hay una partida guardada\n¿Desea continuarla?")) {
            //         partidaNum = await CEXT.getNumAttempts();
            //         const feature = document.getElementById("feature");
            //         var game_content = await fetch("./views/gameView.html");
            //         var game_content = await game_content.text();
            //         feature.innerHTML = game_content;
            //         alert("Continuando partida");
            //     } else {
            //         newGame();
            //     }
            // } else {
            //     newGame();
            // }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Función para cargar un juego nuevo
     */
    async function newGame() {
        try {
            CEXT.starNewAttemp();
            const feature = document.getElementById("feature");
            var game_content = await fetch("./views/gameView.html");
            var game_content = await game_content.text();
            feature.innerHTML = game_content;
            let waitForPressResolve;
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
                    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
                }
                return arr;
            }
            shuffle(preguntas);
            function waitForPress() {
                return new Promise(resolve => waitForPressResolve = resolve);
            }
            function btnResolver(e) {
                if (e.target.id == "boton1" && e.target.classList.contains("correcto")) {
                    puntuacion.innerHTML = parseInt(puntuacion.innerHTML) + 1;
                } else if (e.target.id == "boton1") {
                    puntuacion.innerHTML = parseInt(puntuacion.innerHTML);
                }
                if (e.target.id == "boton2" && e.target.classList.contains("correcto")) {
                    puntuacion.innerHTML = parseInt(puntuacion.innerHTML) + 1;
                } else if (e.target.id == "boton2") {
                    puntuacion.innerHTML = parseInt(puntuacion.innerHTML);
                }
                if (e.target.id == "boton3" && e.target.classList.contains("correcto")) {
                    puntuacion.innerHTML = parseInt(puntuacion.innerHTML) + 1;
                } else if (e.target.id == "boton3") {
                    puntuacion.innerHTML = parseInt(puntuacion.innerHTML);
                }
                if (e.target.id == "boton4" && e.target.classList.contains("correcto")) {
                    puntuacion.innerHTML = parseInt(puntuacion.innerHTML) + 1;
                } else if (e.target.id == "boton4") {
                    puntuacion.innerHTML = parseInt(puntuacion.innerHTML);
                }
                if (waitForPressResolve) waitForPressResolve();
            }
            async function doIt() {
                boton1.addEventListener('click', e => { btnResolver(e) });
                boton2.addEventListener('click', e => { btnResolver(e) });
                boton3.addEventListener('click', e => { btnResolver(e) });
                boton4.addEventListener('click', e => { btnResolver(e) });
                for (let i = 0; i < 15; i += 1) {
                    pregunta.innerHTML = preguntas[i][0];
                    respuesta1.innerHTML = preguntas[i][1][0][0];
                    if (preguntas[i][1][0][1] == "true") {
                        boton1.classList.add("correcto");
                    } else {
                        boton1.classList.remove("correcto");
                    }
                    respuesta2.innerHTML = preguntas[i][1][1][0];
                    if (preguntas[i][1][1][1] == "true") {
                        boton2.classList.add("correcto");
                    } else {
                        boton2.classList.remove("correcto");
                    }
                    respuesta3.innerHTML = preguntas[i][1][2][0];
                    if (preguntas[i][1][2][1] == "true") {
                        boton3.classList.add("correcto");
                    } else {
                        boton3.classList.remove("correcto");
                    }
                    respuesta4.innerHTML = preguntas[i][1][3][0];
                    if (preguntas[i][1][3][1] == "true") {
                        boton4.classList.add("correcto");
                    } else {
                        boton4.classList.remove("correcto");
                    }
                    await waitForPress();
                }
                boton1.removeEventListener('click', btnResolver);
                boton2.removeEventListener('click', btnResolver);
                boton3.removeEventListener('click', btnResolver);
                boton4.removeEventListener('click', btnResolver);
                alert(`Has tenido bien ${puntuacion.innerHTML} de 15 preguntas.\nHas conseguido ${Math.floor(parseInt(puntuacion.innerHTML) * 6.6)} puntos`);
                CEXT.setGlobalPoints(Math.floor(parseInt(puntuacion.innerHTML) * 6.6));
                CEXT.setGlobalStatus(true);
                CEXT.setAttempStatus(CEXT.getCurrentAttemp(), true);
                CEXT.setAttempPoints(CEXT.getCurrentAttemp(), Math.floor(parseInt(puntuacion.innerHTML) * 6.6));
                loadGameMenu();
            }
            doIt();
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Función para cargar el HTML con el contenido de añadir preguntas
     */
    // async function loadAddQuestions() { // TODO: Acabar
    //     const feature = document.getElementById("feature");
    //     var addQuestions_content = await fetch("./views/addQuestionsView.html");
    //     var addQuestions_content = await addQuestions_content.text();
    //     feature.innerHTML = addQuestions_content;
    // }

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
            let numPartidas = CEXT.getNumAttemps();
            if (numPartidas == 0 || numPartidas == null) {
                texto = "No hay partidas registradas";
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
}