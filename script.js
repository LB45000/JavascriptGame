// Game state
let gameState = {
  players: 2,
  whoseTurn: 1,
  gameOver: false,
  winner: null
};

// Function to switch turns
function changePlayer() {
  // Generate random damage
  let damage = Math.floor(Math.random() * 20) + 10;
  let playerOneHealth = document.getElementById("playerOneHealth");
  let playerTwoHealth = document.getElementById("playerTwoHealth");
  let playerOneHealthNum = Number(playerOneHealth.innerHTML);
  let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);

  if (gameState.whoseTurn === 1) {
    playerTwoHealthNum -= damage;

    if (playerTwoHealthNum <= 0) {
      playerTwoHealth.innerHTML = 0;
      gameOver(1); // Player 1 wins
    } else {
      playerTwoHealth.innerHTML = playerTwoHealthNum;
      gameState.whoseTurn = 2; // Switch to player 2's turn
      document.getElementById("playerName").innerHTML = `Player ${gameState.whoseTurn}`;
      changeButtonAppearance();
      changeButtonStatuses();
    }
  } else if (gameState.whoseTurn === 2) {
    playerOneHealthNum -= damage;

    if (playerOneHealthNum <= 0) {
      playerOneHealth.innerHTML = 0;
      gameOver(2); // Player 2 wins
    } else {
      playerOneHealth.innerHTML = playerOneHealthNum;
      changeButtonAppearance();
      changeButtonStatuses();
      changePlayerOneSprite();
    }
  }
}

// Function to declare the winner and end the game
function gameOver(winner) {
  gameState.gameOver = true;
  gameState.winner = winner;
  document.getElementById("playerName").innerHTML = `Player ${winner} wins! Game Over`;
  document.getElementById("winningPlayer").innerHTML = `Player ${winner} wins!`;
  document.getElementById("playAgainButton").style.display = "block";
  document.getElementById("playerOneAttack").disabled = true;
  document.getElementById("playerTwoAttack").disabled = true;
}

// Player 1 attack function
function attackPlayerOne() {
  if (gameState.gameOver) {
    return; // Don't allow further actions if the game is over.
  }
  // Generate random damage
  let damage = Math.floor(Math.random() * 20) + 10;
  let playerOneHealth = document.getElementById("playerOneHealth");
  let playerOneHealthNum = Number(playerOneHealth.innerHTML);

  playerOneHealthNum -= damage;

  if (playerOneHealthNum <= 0) {
    playerOneHealth.innerHTML = 0;
    gameOver(2); // Player 2 wins
  } else {
    playerOneHealth.innerHTML = playerOneHealthNum;
    changeButtonAppearance();
    changePlayerTwoSprite();
    changeButtonStatuses();
  }
}

// Player 2 attack function
function attackPlayerTwo() {
  if (gameState.gameOver) {
    return; // Don't allow further actions if the game is over.
  }
  // Generate random damage
  let damage = Math.floor(Math.random() * 20) + 10;
  let playerTwoHealth = document.getElementById("playerTwoHealth");
  let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);

  playerTwoHealthNum -= damage;

  if (playerTwoHealthNum <= 0) {
    playerTwoHealth.innerHTML = 0;
    gameOver(1); // Player 1 wins
  } else {
    playerTwoHealth.innerHTML = playerTwoHealthNum;
    changeButtonAppearance();
    changePlayerOneSprite();
    changeButtonStatuses();
  }
}

// Function to change player two's sprite and status
function changePlayerTwoSprite() {
  let playerTwoSprite = document.getElementById("playerTwoSprite");
  let playerOneSprite = document.getElementById("playerOneSprite");

  playerTwoSprite.classList.remove("playerTwoAttack");
  playerTwoSprite.classList.add("idle");
  playerOneSprite.classList.remove("playerOneDamage");
  playerOneSprite.classList.add("idle");

  if (gameState.whoseTurn === 2) {
    // Animate the player
    animatePlayerTwo();
    // Change the button status
    changeButtonStatuses();
  }
}

// Function to change player one's sprite and status
function changePlayerOneSprite() {
  let playerOneSprite = document.getElementById("playerOneSprite");
  let playerTwoSprite = document.getElementById("playerTwoSprite");

  playerOneSprite.classList.remove("playerOneAttack");
  playerOneSprite.classList.add("idle");
  playerTwoSprite.classList.remove("playerTwoDamage");
  playerTwoSprite.classList.add("idle");

  if (gameState.whoseTurn === 1) {
    // Animate the player
    animatePlayerOne();
    // Change the button status
    changeButtonStatuses();
  }
}

// Change button statuses
function changeButtonStatuses() {
  const playerOneButton = document.getElementById("playerOneAttack");
  const playerTwoButton = document.getElementById("playerTwoAttack");

  if (gameState.whoseTurn === 1) {
    // Enable player 1 button and set button appearance
    playerOneButton.disabled = false;
    playerOneButton.classList.add("active");
    playerOneButton.classList.remove("inactive");
    playerTwoButton.classList.remove("active");
    playerTwoButton.classList.add("inactive");
  } else {
    // Enable player 2 button and set button appearance
    playerTwoButton.disabled = false;
    playerTwoButton.classList.add("active");
    playerTwoButton.classList.remove("inactive");
    playerOneButton.classList.remove("active");
    playerOneButton.classList.add("inactive");
  }
}

// Change button appearance
function changeButtonAppearance() {
  const playerOneButton = document.getElementById("playerOneAttack");
  const playerTwoButton = document.getElementById("playerTwoAttack");

  if (gameState.whoseTurn === 1) {
    // Player 1's turn
    playerOneButton.classList.remove("inactive");
    playerOneButton.classList.add("active");
    playerTwoButton.classList.remove("active");
    playerTwoButton.classList.add("attacked");
  } else {
    // Player 2's turn
    playerOneButton.classList.remove("active");
    playerOneButton.classList.add("attacked");
    playerTwoButton.classList.remove("inactive");
    playerTwoButton.classList.add("active");
  }
}

// Animate player 2 attacking
function animatePlayerTwo() {
  // Sprite frames
  let playerTwoFrames = [
    "./images/L_Idle.png",
    "./images/L_Attack.png"
  ];

  // Get sprites
  let playerTwoSprite = document.getElementById("playerTwoSprite");
  let playerOneSprite = document.getElementById("playerOneSprite");

  // Play damage sound
  let damageSound = document.getElementById("SFX_EnemyDamage");
  damageSound.play();

  // Show attack sprite for player 2
  playerTwoSprite.src = playerTwoFrames[1];
  playerTwoSprite.classList.remove("idle");
  playerTwoSprite.classList.add("playerTwoAttack");

  // Show player 1 taking damage
  playerOneSprite.classList.remove("idle");
  playerOneSprite.classList.add("playerOneDamage");

  // Reset after 0.35 seconds
  setTimeout(function () {
    playerOneSprite.classList.remove("playerOneDamage");
    playerOneSprite.classList.add("idle");

    playerTwoSprite.src = playerTwoFrames[0];
    playerTwoSprite.classList.remove("playerTwoAttack");
    playerTwoSprite.classList.add("idle");
  }, 350);
}

// Animate player 1 attacking
function animatePlayerOne() {
  // Sprite frames
  let playerOneFrames = [
    "./images/R_Idle.png",
    "./images/R_Attack.png"
  ];

  // Get sprites
  let playerOneSprite = document.getElementById("playerOneSprite");
  let playerTwoSprite = document.getElementById("playerTwoSprite");

  // Play damage sound
  let damageSound = document.getElementById("SFX_PlayerDamage");
  damageSound.play();

  // Show attack sprite for player 1
  playerOneSprite.src = playerOneFrames[1];
  playerOneSprite.classList.remove("idle");
  playerOneSprite.classList.add("playerOneAttack");

  // Show player 2 taking damage
  playerTwoSprite.classList.remove("idle");
  playerTwoSprite.classList.add("playerTwoDamage");

  // Reset after 0.35 seconds
  setTimeout(function () {
    playerTwoSprite.classList.remove("playerTwoDamage");
    playerTwoSprite.classList.add("idle");

    playerOneSprite.src = playerOneFrames[0];
    playerOneSprite.classList.remove("playerOneAttack");
    playerOneSprite.classList.add("idle");
  }, 350);
}


