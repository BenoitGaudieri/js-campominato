// Il computer deve generare 16 numeri casuali tra 1 e 100 (numeri vietati).
// In seguito deve chiedere all’utente di inserire un numero alla volta, sempre compreso tra 1 e 100. L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati (numeri vietati), la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
// BONUS:
// All’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 =>  tra 1 e 80
// con difficoltà 2=> tra 1 e 50

// UTILITY FUNCTIONS
/**
 * Generate 16 random unique numbers
 */
function randomNumbers(min, max) {
    var output = [];
    var candidate = 0;
    for (var i = 0; i < 16; i++) {
        candidate = Math.floor(Math.random() * Math.floor(max - min)) + min;
        while (output.includes(candidate)) {
            candidate = Math.floor(Math.random() * Math.floor(max - min)) + min;
        }
        output.push(candidate);
    }
    return output;
}
/**
 * Sort numbers with array.sort(sortNumber)
 */
function sortNumber(a, b) {
    return a - b;
}

// Standard difficulty
var diffCoeff = 100;

// Difficulty setting
function difficultySet() {
    var difficulty = "";
    while (
        difficulty != "facile" &&
        difficulty != "medio" &&
        difficulty != "difficile"
    ) {
        difficulty = prompt(
            "A che livello di difficoltà vuoi giocare? \nFacile\nMedio\nDifficile"
        ).toLowerCase();
        console.log(difficulty);
    }
    switch (difficulty) {
        case "facile":
            diffCoeff = 100;
            break;
        case "medio":
            diffCoeff = 80;
            break;
        case "difficile":
            diffCoeff = 50;
            break;
    }
}

// Generate mines and sort for easier debug
function generateMines() {
    // Global var
    mines = randomNumbers(1, diffCoeff);
    mines.sort(sortNumber);
    console.log(mines);
}

function gameOn() {
    var gameOver = false;
    var counter = 0;
    var playerGuess = [];

    generateMines();
    // Main logic
    while (!gameOver) {
        var playerChoise = parseInt(
            prompt("Scegli un numero da 1 a " + diffCoeff)
        );
        while (playerGuess.includes(playerChoise) || isNaN(playerChoise)) {
            playerChoise = parseInt(
                prompt(
                    "Numero non valido!\nScegli un numero da 1 a " + diffCoeff
                )
            );
        }
        if (mines.includes(playerChoise)) {
            console.log("Hai perso!");
            gameOver = true;
        } else {
            counter += 1;
            playerGuess.push(playerChoise);
        }
        if (playerGuess.length == diffCoeff - 16) {
            console.log("HAI VINTO!");
            gameOver = true;
        }
    }
    console.log(
        "Hai scelto il numero giusto " +
            counter +
            " volte. \nLe bombe erano: " +
            mines
    );
}

function startGame() {
    difficultySet();
    gameOn();
}

var startButton = document.getElementById("start");

startButton.addEventListener("click", function () {
    startGame();
});

var mineField = document.getElementById("js-mine-field");
var mineDiv = "";

for (var i = 1; i < 101; i++) {
    mineDiv += `<div class='mine red'><span>${i}</span></div>`;
}
mineField.innerHTML = mineDiv;

var mineElement = document.getElementsByClassName("mine");
// mineElement.addEventListener("click", function () {
//     console.log("boh");
// });

for (var i = 0; i < mineElement.length; i++) {
    mineElement[i].addEventListener("click", superHot);
}

function superHot() {
    var wrong = randomNumbers(1, 100);
    var pick = "";
    pick = parseInt(this.innerText);
    if (!wrong.includes(pick)) {
        this.className = "mine green";
    } else {
        mineField.innerHTML = "<span class='too-much'>GAME OVER</span>";
    }
}
