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
  algorithmSelector.option("Noodles"); // Add more algorithms as options here
  algorithmSelector.changed(onAlgorithmChange);

  // Generate Art button
  let generateBtn = createButton("Generate Art");
  generateBtn.mousePressed(generateArt);

  drawBackground();

  // Initialize the default algorithm
  currentAlgorithm = new Noodles(paintingArea, colorPalette); // Set default algorithm
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
  let selectedAlgorithm = algorithmSelector.value();
  switch (selectedAlgorithm) {
    case "Noodles":
      currentAlgorithm = new Noodles(paintingArea, colorPalette);
      break;
    // Add cases for other algorithms as you create them
    default:
      currentAlgorithm = new Noodles(paintingArea, colorPalette); // Default to Noodles if no match found
  }
}

function keyReleased() {
  if (key === "s" || key === "S") {
    saveCanvas("FineArtFactory", "png");
  }
}
