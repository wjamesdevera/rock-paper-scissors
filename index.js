const choiceImage = {
    'rock': 'assets/noun-fist-477918.svg',
    'scissors': 'assets/noun-scissors-477919.svg',
    'paper': 'assets/noun-wave-477912.svg',
};

const choices = ['rock', 'paper', 'scissors'];
const winningConditions = [
    ['rock', 'scissors'],
    ['paper', 'rock'],
    ['scissors', 'paper'],
];

const computerChoiceImage = document.querySelector('.computer-choice');
const btns = document.querySelectorAll('button');
const titleContainer = document.querySelector('.title-container');

computerChoiceImage.src = choiceImage['rock'];


btns.forEach(btn => btn.addEventListener('click', game));

function getComputerChoice() {
    let i = Math.floor(Math.random() * 3);
    return choices[i];
}

function playRound(playerSelection, computerSelection) {
    const winnerBanner = document.createElement('h2');
    winnerBanner.classList.add('winner-banner');
    if (titleContainer.contains(document.querySelector('.winner-banner'))) {
        titleContainer.removeChild(document.querySelector('.winner-banner'));
    }

    let isWin = checkWin(playerSelection, computerSelection);
    if (isWin === 'draw') {
        winnerBanner.textContent = "Draw!";
        titleContainer.insertBefore(winnerBanner, titleContainer.querySelector('img'));
    } else if (isWin === 'win') {
        winnerBanner.textContent = `You Win! ${toTitleCase(playerSelection)} beats ${toTitleCase(computerSelection)}`;
        titleContainer.insertBefore(winnerBanner, titleContainer.querySelector('img'));
    } else {
        winnerBanner.textContent = `You Lose! ${toTitleCase(computerSelection)} beats ${toTitleCase(playerSelection)}`;
        titleContainer.insertBefore(winnerBanner, titleContainer.querySelector('img'));
    }
}

function checkWin(playerSelection, computerSelection) {
    if (playerSelection.toLowerCase() === computerSelection.toLowerCase()) {
        return 'draw';
    }

    for (let i = 0; i < winningConditions.length; i++) {
        if (playerSelection.toLowerCase() == winningConditions[i][0] && computerSelection.toLowerCase() == winningConditions[i][1]) {
            return 'win';
        }
    }
    
    return 'lose';
}

function game(e) {
    e.stopPropagation();
    const playerSelection = this.id;
    const computerSelection = getComputerChoice();
    computerChoiceImage.src = choiceImage[computerSelection];
    playRound(playerSelection, computerSelection);
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
