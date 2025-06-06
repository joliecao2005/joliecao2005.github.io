const fruits = document.querySelectorAll(".fruit");
const chooseAnotherButton = document.getElementById("choose-another");
const prompt = document.getElementById("prompt");
const displayArea = document.getElementById("display-area");
const verseText = document.getElementById("verse");
const backgroundMusic = document.getElementById("background-music");
console.log(backgroundMusic);
const muteToggleButton = document.getElementById("mute-toggle");
const muteIcon = document.getElementById("mute-icon");
console.log(muteIcon);
const popSound = document.getElementById("pop-sound");
const cutSound = document.getElementById("cut-sound");

let isMuted = false;
backgroundMusic.play();
backgroundMusic.loop = true;

let fruitSelected = false;

muteToggleButton.addEventListener("click", function () {
  isMuted = !isMuted;
  backgroundMusic.muted = isMuted;
  popSound.muted = isMuted;
  cutSound.muted = isMuted;

  // Toggle icon
  muteToggleButton.querySelector("img").src = isMuted
    ? "https://img.icons8.com/metro/26/high-volume.png"
    : "https://img.icons8.com/ios-filled/50/mute--v1.png";
});

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
  chooseAnotherButton.style.display = "block";
  prompt.style.display = "none";
}

chooseAnotherButton.addEventListener("click", function () {
  location.reload(); // Reload the page to reset
});
