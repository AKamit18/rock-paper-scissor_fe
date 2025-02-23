// Initialize variables
let playerScore = 0;
let computerScore = 0;
let moves = 0;

// Get DOM elements
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const resultDisplay = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const movesLeftDisplay = document.getElementById('moves-left');
const restartButton = document.getElementById('restart');

// Game Over Pop-up elements
const gameOverPopup = document.getElementById('game-over-popup');
const finalScoreDisplay = document.getElementById('final-score');
const closePopupButton = document.getElementById('close-popup');

// Add event listeners to buttons
document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));
restartButton.addEventListener('click', restartGame);
closePopupButton.addEventListener('click', closePopup);

// Main game function
function playGame(playerChoice) {
  if (moves >= 10) return; // Stop the game after 10 moves

  const computerChoice = getComputerChoice();
  const winner = determineWinner(playerChoice, computerChoice);

  // Update UI
  playerChoiceDisplay.textContent = `Your choice: ${playerChoice}`;
  computerChoiceDisplay.textContent = `Computer's choice: ${computerChoice}`;
  resultDisplay.textContent = `Result: ${winner}`;

  // Update scores
  if (winner === 'You win!') playerScore++;
  else if (winner === 'Computer wins!') computerScore++;

  moves++;
  movesLeftDisplay.textContent = `Moves left: ${10 - moves}`;
  scoreDisplay.textContent = `Score: Player ${playerScore} - ${computerScore} Computer`;

  // End game after 10 moves
  if (moves === 10) {
    showGameOverPopup();
    disableButtons();
  }
}

// Generate computer's choice
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Determine the winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 'It\'s a tie!';
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'You win!';
  }
  return 'Computer wins!';
}

// Disable buttons after game ends
function disableButtons() {
  document.getElementById('rock').disabled = true;
  document.getElementById('paper').disabled = true;
  document.getElementById('scissors').disabled = true;
}

// Show Game Over Pop-up
function showGameOverPopup() {
  finalScoreDisplay.textContent = `Final Score: Player ${playerScore} - ${computerScore} Computer`;
  gameOverPopup.style.display = 'flex';
}

// Close Game Over Pop-up and restart game
function closePopup() {
  gameOverPopup.style.display = 'none';
  restartGame();
}

// Restart the game
function restartGame() {
  playerScore = 0;
  computerScore = 0;
  moves = 0;
  playerChoiceDisplay.textContent = 'Your choice: ';
  computerChoiceDisplay.textContent = 'Computer\'s choice: ';
  resultDisplay.textContent = 'Result: ';
  scoreDisplay.textContent = 'Score: Player 0 - 0 Computer';
  movesLeftDisplay.textContent = 'Moves left: 10';

  // Re-enable buttons
  document.getElementById('rock').disabled = false;
  document.getElementById('paper').disabled = false;
  document.getElementById('scissors').disabled = false;
}