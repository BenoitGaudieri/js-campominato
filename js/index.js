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

/**
 * Generate 16 random numbers
 */
function randomNumbers(min, max) {
    var output = [];
    for (var i = 0; i < 16; i++) {
        output.push(Math.floor(Math.random() * Math.floor(max - min)) + min);
    }
    return output;
}
var mines = randomNumbers(1, 100);
var gameOver = false;
var counter = 0;
var playerGuess = [];

while (!gameOver) {
    var playerChoise = parseInt(prompt("Scegli un numero da 1 a 100"));
    while (playerGuess.includes(playerChoise)) {
        playerChoise = parseInt(
            prompt("Hai già scelto quel numero! \nScegli un numero da 1 a 100")
        );
    }
    if (mines.includes(playerChoise)) {
        gameOver = true;
    } else {
        counter += 1;
        playerGuess.push(playerChoise);
    }
    if (playerGuess.length == 84) {
        console.log("HAI VINTO!");
        break;
    }
}
console.log(
    "Hai scelto il numero giusto " +
        counter +
        " volte. \nLe bombe erano: " +
        mines.sort()
);
