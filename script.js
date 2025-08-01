let currentPlayer = 0;
let totalPlayers = 2;

const playerContainer = document.getElementById("players");
const turnInfo = document.getElementById("turnInfo");
const playerCountDropdown = document.getElementById("playerCount");
const sound = document.getElementById("rollSound");

// On page load
window.onload = () => {
  setupPlayers(totalPlayers);
  updateTurnInfo();
};

playerCountDropdown.addEventListener("change", () => {
  totalPlayers = parseInt(playerCountDropdown.value);
  currentPlayer = 0;
  setupPlayers(totalPlayers);
  updateTurnInfo();
});

function setupPlayers(count) {
  playerContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.src = "images/dice.png"; // Default image
    img.classList.add("dice");
    img.id = "player-" + i;
    playerContainer.appendChild(img);
  }
}

function rollDice() {
  const currentDice = document.getElementById("player-" + currentPlayer);
  currentDice.classList.add("rolling");

  sound.currentTime = 0;
  sound.play();

  setTimeout(() => {
    const roll = Math.floor(Math.random() * 6) + 1;
    currentDice.src = "images/dice" + roll + ".png";
    currentDice.classList.remove("rolling");

    // Wait a bit so player sees result, then reset back to default image
    setTimeout(() => {
      currentDice.src = "images/dice.png";

      // Move to next player
      currentPlayer = (currentPlayer + 1) % totalPlayers;
      updateTurnInfo();
    }, 1200); // Shows result for 1.2 sec

  }, 800); // Animation duration
}

function updateTurnInfo() {
  turnInfo.textContent = "Player " + (currentPlayer + 1) + "'s turn";
}