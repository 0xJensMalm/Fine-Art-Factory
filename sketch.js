const CANVAS_WIDTH = 794;
const CANVAS_HEIGHT = 1123;
const PAINTING_WIDTH = 566;
const PAINTING_HEIGHT = 880;

// Art properties
let numStrokes = 350; // Depending on your new algorithms, this might still be relevant or can be removed

// UI Elements
let algorithmSelector;
let currentAlgorithm;

// Core objects
let frameImage;
let paintingArea;
let resetButton;
let saveButton;

let algorithms = ["HommageADurer", "RisouGrid", "PaleOrb", "Bleed"];

function preload() {
  frameImage = loadImage("frame.svg"); // Ensure this path is correct
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  imageMode(CENTER);
  rectMode(CENTER);

  paintingArea = createGraphics(PAINTING_WIDTH, PAINTING_HEIGHT);

  // Algorithm selection dropdown
  algorithmSelector = createSelect();
  algorithms.forEach((alg) => algorithmSelector.option(alg));
  algorithmSelector.changed(onAlgorithmChange);
  algorithmSelector.position(10, 10); // Position at the top-left corner

  // Generate Art button
  let generateBtn = createButton("Generate Art");
  generateBtn.mousePressed(generateArt);
  generateBtn.position(160, 10); // Adjust this position based on the actual width of your selector
  resetButton = createButton("Reset");
  resetButton.position(260, 10); // Adjust the position as needed
  resetButton.mousePressed(resetCanvas);
  saveButton = createButton("Save");
  saveButton.position(310, 10); // Adjust the position as needed
  saveButton.mousePressed(saveCanvasImage);

  drawBackground();

  // Initialize with the first algorithm as default
  currentAlgorithm = instantiateAlgorithm(algorithms[0]);
}

function draw() {
  image(paintingArea, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

function drawBackground() {
  clear();
  image(
    frameImage,
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
}

function generateArt() {
  if (currentAlgorithm) {
    currentAlgorithm.generateArt();
  } else {
    console.error("No algorithm is currently selected.");
  }
}

function onAlgorithmChange() {
  currentAlgorithm = instantiateAlgorithm(algorithmSelector.value());
}

function instantiateAlgorithm(name) {
  switch (name) {
    case "HommageADurer":
      return new HommageADurer(paintingArea); // Adjusted to match the new constructor
    // Add cases for other algorithms as needed
    case "RisouGrid":
      return new RisouGrid(paintingArea);
    case "PaleOrb":
      return new PaleOrb(paintingArea);
    case "Bleed":
      return new Bleed(paintingArea);
    default:
      console.error("Unknown algorithm:", name);
      return null;
  }
}

function resetCanvas() {
  paintingArea.clear(); // Clear the paintingArea
  drawBackground(); // Redraw the background
}

function saveCanvasImage() {
  // Save the canvas image as a PNG file
  saveCanvas("FineArtFactory", "png");
}
