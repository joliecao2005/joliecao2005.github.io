// document.addEventListener("DOMContentLoaded", function () {
const fruits = document.querySelectorAll(".fruit");
console.log(fruits);
const chooseAnotherButton = document.querySelector("#pick-another");
console.log(chooseAnotherButton);
const prompt = document.querySelector("#prompt");
console.log(prompt);
const displayArea = document.getElementById("display-area"); // Reference to display area

fruits.forEach((fruit) => {
  fruit.addEventListener("click", function () {
    // Hide all fruits except the selected one
    fruits.forEach((f) => (f.style.display = "none")); // Hide the other fruits

    // Clone the selected fruit and add it to the display area
    // const displayedFruit = fruit.cloneNode(true);

    fruit.style.display = "block"; // Display the selected fruit only
    fruit.style.width = "300px"; // Make the selected fruit larger
    fruit.style.gridColumnStart = 1; // Position it in the center
    fruit.style.gridColumnEnd = 4;

    // Clear previous content and append the cloned fruit
    // displayArea.innerHTML = "";
    // displayArea.appendChild(displayedFruit);

    document.body.style.backgroundImage =
      "url('https://img.freepik.com/premium-vector/garden-wood-table-icon-cartoon-garden-wood-table-vector-icon-web-design-isolated-white-background_98402-49702.jpg?semt=ais_hybrid&w=740')";

    // Set the onclick event to toggle cutting the fruit
    fruit.onclick = toggleFruit;

    // Display the "Choose Another Fruit" button
    chooseAnotherButton.style.display = "block";
    prompt.style.display = "block";
    prompt.textContent = "Click to cut";
  });
});
function toggleFruit() {
  if (this.dataset.state === "cut") {
    this.src = this.dataset.whole;
    this.dataset.state = "whole";
    prompt.textContent = "Click to cut";
  } else {
    this.src = this.dataset.cut;
    this.dataset.state = "cut";
    prompt.textContent = "Click to uncut";
  }
}

chooseAnotherButton.addEventListener("click", resetFruit);

function resetFruit() {
  fruits.forEach((fruit) => {
    fruit.style.display = "block";
    fruit.style.width = "";
    fruit.style.gridColumnStart = "";
    fruit.style.gridColumnEnd = "";
    fruit.dataset.state = "whole";
    fruit.src = fruit.dataset.whole; // Reset to the whole fruit image
  });
  chooseAnotherButton.style.display = "none";
  document.body.style.backgroundImage = "none";
}
// });
