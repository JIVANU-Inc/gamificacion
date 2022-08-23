// Load game menu with ajax request
async function loadGameMenu() {
    const gameMenu = document.getElementById("gameMenu");
    var gameMenu_content = await fetch("./views/gameMenu.html");
    var gameMenu_content = await gameMenu_content.text();
    gameMenu.innerHTML = gameMenu_content;
}

loadGameMenu();