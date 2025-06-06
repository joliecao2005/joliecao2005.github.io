const fruits = document.querySelectorAll(".fruit");
const chooseAnotherButton = document.getElementById("choose-another");
const prompt = document.getElementById("prompt");
const displayArea = document.getElementById("display-area");
const verseText = document.getElementById("verse");
const backgroundMusic = document.getElementById("background-music");
const muteToggleButton = document.getElementById("mute-toggle");
const popSound = document.getElementById("pop-sound");
const cutSound = document.getElementById("cut-sound");

backgroundMusic.play();
backgroundMusic.loop = true;

let isMuted = false;
let fruitSelected = false;

fruits.forEach((fruit) => {
  fruit.addEventListener("click", function () {
    if (fruitSelected) return; // Prevent choosing more than one fruit

    fruitSelected = true;

    popSound.play();
    // Clone the fruit and display it on the right
    const displayedFruit = fruit.cloneNode(true);

    // Hide the selected fruit from the grid
    fruit.style.display = "none";

    displayedFruit.style.width = "70%"; // Enlarge it a bit
    displayedFruit.style.maxwidth = "180px";
    displayedFruit.style.height = "auto";
    displayedFruit.style.cursor = "pointer";
    displayedFruit.dataset.state = "whole"; // Initialize state
    displayedFruit.classList.add("displayed-fruit");
    displayedFruit.onclick = toggleCut;

    displayArea.innerHTML = ""; // Clear previous content
    displayArea.appendChild(displayedFruit); // Move to display area

    prompt.style.display = "block";
    prompt.textContent = "Click to cut";

    chooseAnotherButton.style.display = "block";
  });
});

function toggleCut() {
  cutSound.play();

  this.src = this.dataset.cut;
  this.dataset.state = "cut";
  this.classList.remove("displayed-fruit"); // Remove previous styling class
  this.classList.add("cut-fruit"); // Add new styling class for consistency

  // Show the associated verse
  verseText.textContent = this.dataset.verse;
  verseText.style.opacity = 1; // Fade in the text
  verseText.style.display = "block"; // Make sure it's displayed

  prompt.textContent = "Start Again";
}

chooseAnotherButton.addEventListener("click", function () {
  location.reload(); // Reload the page to reset
});

muteToggleButton.addEventListener("click", function () {
  isMuted = !isMuted;
  backgroundMusic.muted = isMuted;
  popSound.muted = isMuted;
  cutSound.muted = isMuted;

  // Toggle icon
  muteToggleButton.src = isMuted ? "unmute-icon.png" : "mute-icon.png";
});
