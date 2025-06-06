// My choice of concept is fun learning website with a game theme. It reveals a bible verse for people to read and memorize, also a way to have a daily reminder. It engages users with playful interaction with peaceful and lovely sound experience as well. There is background music, which is soft but uplifting enough. The sound effects of popping and cutting sound during interaction enhance the smoothness of the experience. On the other hand, there is an option to mute the sounds.
const fruits = document.querySelectorAll(".fruit");
console.log(fruits);
// This is the Start again button for reset all. The users can choose another fruit when they finish one round
const chooseAnotherButton = document.getElementById("choose-another");
// This is the prompt at the bottom at the page. It will be changed according to the interaction
const prompt = document.getElementById("prompt");
// Display area is for the empty space on the right where one fruit is ultimately chosen.
const displayArea = document.getElementById("display-area");
const verseText = document.getElementById("verse");
const backgroundMusic = document.getElementById("background-music");
console.log(backgroundMusic);
const muteToggleButton = document.getElementById("mute-toggle");
const muteIcon = document.getElementById("mute-icon");
console.log(muteIcon);
const popSound = document.getElementById("pop-sound");
const cutSound = document.getElementById("cut-sound");
const copyrightButton = document.getElementById("copyright");
console.log(copyrightButton);

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
    ? "https://img.icons8.com/ios-filled/50/mute--v1.png"
    : "https://img.icons8.com/metro/26/high-volume.png";
});

fruits.forEach((fruit) => {
  fruit.addEventListener("click", function () {
    if (fruitSelected) return; // Prevent choosing more than one fruit. Only one fruit can be picked per round. For this simple little game, only only bible verse is shown, so they should start again if they wish to pick another fruit.

    fruitSelected = true;

    popSound.play(); // Sound effect plays accordingly
    const displayedFruit = fruit.cloneNode(true);

    // Hide the selected fruit from the bowl
    fruit.style.display = "none";

    displayedFruit.style.width = "70%";
    displayedFruit.style.maxwidth = "180px";
    displayedFruit.style.height = "auto";
    displayedFruit.style.cursor = "pointer";
    displayedFruit.dataset.state = "whole";
    displayedFruit.classList.add("displayed-fruit"); // Add the styling for displayed fruits. There were certain ways I did the styling to maintain the sizing and positions (placement)
    displayedFruit.onclick = toggleCut;

    displayArea.innerHTML = "";
    displayArea.appendChild(displayedFruit);

    prompt.style.display = "block";
    prompt.textContent = "Click to cut"; //The prompt changes when action is taken
  });
});

function toggleCut() {
  cutSound.play();

  this.src = this.dataset.cut;
  this.dataset.state = "cut";
  this.classList.remove("displayed-fruit"); // Remove previous styling class
  this.classList.add("cut-fruit"); // Again styling

  // Show the verse
  verseText.textContent = this.dataset.verse;
  verseText.style.opacity = 1; // Fade in the text because it's in the sky so the transition is better and suitable to reveal the text
  verseText.style.display = "block"; // Make sure it's displayed
  chooseAnotherButton.style.display = "block";
  prompt.style.display = "none";
}

chooseAnotherButton.addEventListener("click", function () {
  location.reload(); // Reload the page
});
