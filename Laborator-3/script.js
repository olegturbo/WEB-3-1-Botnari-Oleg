function calculateSum(a, b) {
    return a + b;
}

console.log("Exercițiul 1");
console.log("3 + 5 =", calculateSum(3, 5));
console.log("12 + 30 =", calculateSum(12, 30));
console.log("-4 + 10 =", calculateSum(-4, 10));

const student = {
    name: "Oleg",
    age: 20,
    grade: 9,
    introduce: function () {
        console.log("Sunt " + this.name + " și am " + this.age + " ani.");
    }
};

console.log("Exercițiul 2");
student.introduce();
student.grade = 10;
console.log("Noua valoare a proprietății grade:", student.grade);

const choices = ["piatra", "hartia", "foarfeca"];

const labels = {
    piatra: "✊ Piatra",
    hartia: "✋ Hârtia",
    foarfeca: "✌️ Foarfeca"
};

const winsAgainst = {
    piatra: "foarfeca",
    foarfeca: "hartia",
    hartia: "piatra"
};

const WINNING_SCORE = 5;

const gameScore = {
    player: 0,
    computer: 0,
    draws: 0,
    totalRounds: function () {
        return this.player + this.computer + this.draws;
    },
    displayScore: function () {
        const text = "Scor: Tu " + this.player + " – Calculator " + this.computer + " (egalități: " + this.draws + ")";
        alert(text);
        return text;
    },
    reset: function () {
        this.player = 0;
        this.computer = 0;
        this.draws = 0;
    }
};

let gameOver = false;

const choiceButtons = document.querySelectorAll("[data-alegere]");
const playerChoiceEl = document.getElementById("alegere-jucator");
const computerChoiceEl = document.getElementById("alegere-calculator");
const resultEl = document.getElementById("rezultat");
const playerScoreEl = document.getElementById("scor-jucator");
const computerScoreEl = document.getElementById("scor-calculator");
const drawsEl = document.getElementById("scor-egalitati");
const roundsEl = document.getElementById("runde");
const leaderEl = document.getElementById("conducere");
const resetButton = document.getElementById("btn-reset");

function getComputerChoice() {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "draw";
    }
    if (winsAgainst[playerChoice] === computerChoice) {
        return "player";
    }
    return "computer";
}

function updateScore(winner) {
    if (winner === "player") {
        gameScore.player++;
    } else if (winner === "computer") {
        gameScore.computer++;
    } else {
        gameScore.draws++;
    }
}

function getResultMessage(winner) {
    if (winner === "player") {
        return "Ai câștigat!";
    }
    if (winner === "computer") {
        return "Calculatorul a câștigat!";
    }
    return "Egalitate!";
}

function getLeaderMessage() {
    if (gameScore.player > gameScore.computer) {
        return "Conduci tu!";
    }
    if (gameScore.computer > gameScore.player) {
        return "Calculatorul conduce.";
    }
    return "Scorul este egal.";
}

function renderScore() {
    playerScoreEl.textContent = gameScore.player;
    computerScoreEl.textContent = gameScore.computer;
    drawsEl.textContent = gameScore.draws;
    roundsEl.textContent = "Runde jucate: " + gameScore.totalRounds();
    leaderEl.textContent = gameScore.totalRounds() > 0 ? getLeaderMessage() : "";
}

function checkFinalWinner() {
    if (gameScore.player >= WINNING_SCORE) {
        return "player";
    }
    if (gameScore.computer >= WINNING_SCORE) {
        return "computer";
    }
    return null;
}

function finishGame(finalWinner) {
    gameOver = true;
    choiceButtons.forEach(function (button) {
        button.disabled = true;
    });
    const message = finalWinner === "player"
        ? "Felicitări! Ai câștigat jocul!"
        : "Calculatorul a câștigat jocul. Mult succes data viitoare!";
    resultEl.textContent = message;
    setTimeout(function () {
        alert(message);
    }, 50);
}

function playRound(playerChoice) {
    if (gameOver) {
        return;
    }

    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);

    updateScore(winner);

    playerChoiceEl.textContent = labels[playerChoice];
    computerChoiceEl.textContent = labels[computerChoice];
    resultEl.textContent = getResultMessage(winner);
    renderScore();

    setTimeout(function () {
        gameScore.displayScore();
        const finalWinner = checkFinalWinner();
        if (finalWinner) {
            finishGame(finalWinner);
        }
    }, 50);
}

function resetGame() {
    gameScore.reset();
    gameOver = false;
    choiceButtons.forEach(function (button) {
        button.disabled = false;
    });
    playerChoiceEl.textContent = "–";
    computerChoiceEl.textContent = "–";
    resultEl.textContent = "Apasă un buton ca să începi.";
    renderScore();
}

choiceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        playRound(button.dataset.alegere);
    });
});

resetButton.addEventListener("click", resetGame);

renderScore();
