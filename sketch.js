// Constants for canvas and painting dimensions
const CANVAS_WIDTH = 794;
const CANVAS_HEIGHT = 1123;
const PAINTING_WIDTH = 566;
const PAINTING_HEIGHT = 880;

// Art properties
let numStrokes = 150;
let sizeRange = [50, 80];
let bendinessRange = [2, 1000];

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

  let generateBtn = createButton("Generate Art");
  generateBtn.mousePressed(generateArt); // Ensure this is correctly calling generateArt

  drawBackground();
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
  brushStrokes = []; // Clear existing strokes
  for (let i = 0; i < numStrokes; i++) {
    brushStrokes.push(generateBrushStroke());
  }
}

function generateBrushStroke() {
  let position = createVector(random(PAINTING_WIDTH), random(PAINTING_HEIGHT));
  let color = random(colorPalette).color; // Assuming colorPalette is an array of color strings
  let size = random(sizeRange[0], sizeRange[1]);
  let direction = random(TWO_PI);
  let bendiness = int(random(bendinessRange[0], bendinessRange[1]));

  let stroke = new BrushStroke(position, color, size, direction, bendiness);
  stroke.create(); // Make sure the path is generated
  return stroke;
}

function keyReleased() {
  if (key === "s" || key === "S") {
    saveCanvas("FineArtFactory", "png");
  }
}
