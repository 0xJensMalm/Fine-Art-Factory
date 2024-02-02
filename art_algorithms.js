class Noodles {
  constructor(paintingArea, colorPalette) {
    this.paintingArea = paintingArea;
    this.colorPalette = colorPalette;
    this.sizeRange = [50, 80]; // Moved inside the algorithm
    this.bendinessRange = [2, 100]; // Moved inside the algorithm
    this.length = 100; // Length of each stroke
  }

  generateStrokes(numStrokes) {
    let strokes = [];
    for (let i = 0; i < numStrokes; i++) {
      strokes.push(this.generateBrushStroke());
    }
    //console.log("Noodles generated strokes:", strokes.length); // Confirm stroke generation
    return strokes;
  }

  generateBrushStroke() {
    let position = createVector(
      random(this.paintingArea.width),
      random(this.paintingArea.height)
    );
    let color = random(this.colorPalette).color; // Assuming colorPalette is an array of { color, name } objects
    let size = random(this.sizeRange[0], this.sizeRange[1]);
    let direction = random(TWO_PI);
    let bendiness = int(random(this.bendinessRange[0], this.bendinessRange[1]));

    let stroke = new BrushStroke(
      position,
      color,
      size,
      direction,
      bendiness,
      this.length
    );
    stroke.create(); // Ensure the path is generated
    //console.log("Generated BrushStroke with length:", stroke.path.length); // Log the length of the path
    return stroke;
  }
}

// More algorithms can be added here following a similar pattern
