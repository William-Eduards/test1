/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, currentScore, currentPlayer, diceDOM, gameON;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gameON) {
        // 1. Random Number generated
        var dice = Math.floor(Math.random() * 6) + 1;
        // 2. displaying dice number
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";
        // 3. update total score if the rolled number was not 1
        if (dice !== 1) {
            //add score
            currentScore += dice;
            document.querySelector(
                "#current-" + currentPlayer
            ).textContent = currentScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gameON) {
        // Add current score to a global score
        scores[currentPlayer] += currentScore;
        // Update the UI
        document.querySelector("#score-" + currentPlayer).textContent =
            scores[currentPlayer];
        // Check if player won the game
        if (scores[currentPlayer] >= 100) {
            document.querySelector("#name-" + currentPlayer).textContent =
                "The winner";
            diceDOM.style.display = "none";
            document
                .querySelector(".player-" + currentPlayer + "-panel")
                .classList.remove("active");
            document
                .querySelector(".player-" + currentPlayer + "-panel")
                .classList.add("winner");
            gameON = false;
        } else {
            // next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //next player
    currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
    currentScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    //switching the active class
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    currentPlayer = 0;
    currentScore = 0;
    gameON = true;
    diceDOM = document.querySelector(".dice");
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".dice").style.display = "none";
    document.getElementById("name-0").textContent = "PLayer 1";
    document.getElementById("name-1").textContent = "PLayer 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}

//next version coming soon
