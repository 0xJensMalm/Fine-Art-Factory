// Constants for canvas and painting dimensions
const CANVAS_WIDTH = 794;
const CANVAS_HEIGHT = 1123;
const PAINTING_WIDTH = 566;
const PAINTING_HEIGHT = 880;

// Art properties
let numStrokes = 150;

// UI Elements
let algorithmSelector;
let currentAlgorithm;

// Core objects
let frameImage;
let paintingArea;
let brushStrokes = [];
let resetButton;
let saveButton;

// Color palette
let colorPalette = [
  { color: "#3a3736", name: "Charcoal" },
  { color: "#a24925", name: "Burnt Sienna" },
  { color: "#678ca2", name: "Sky Blue" },
  { color: "#cca83f", name: "Gold" },
  { color: "#680E0A", name: "Deep Red" },
  { color: "#D5F1EA", name: "Pale Turquoise" },
  { color: "#F7C519", name: "Sun Yellow" },
];

let algorithms = ["Noodles", "FlowField"];

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
  paintingArea.clear();
  brushStrokes.forEach((stroke) => stroke.display(paintingArea));
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
  brushStrokes = currentAlgorithm.generateStrokes(numStrokes); // Use the current algorithm to generate strokes
  console.log("Generated art with strokes count:", brushStrokes.length); // Log the count of generated strokes
}

function onAlgorithmChange() {
  currentAlgorithm = instantiateAlgorithm(algorithmSelector.value());
}
function instantiateAlgorithm(name) {
  switch (name) {
    case "Noodles":
      return new Noodles(paintingArea, colorPalette);
    case "FlowField":
      return new FlowField(paintingArea, colorPalette);
    // Add new cases here as you create more algorithms
    default:
      console.error("Unknown algorithm:", name);
      return null;
  }
}

function resetCanvas() {
  // Clear the canvas and reset any necessary variables
  paintingArea.clear(); // Clear the paintingArea
  brushStrokes = []; // Clear the array of brush strokes
  drawBackground(); // Redraw the background
}

function saveCanvasImage() {
  // Save the canvas image as a PNG file
  saveCanvas("FineArtFactory", "png");
}
