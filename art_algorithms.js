class Noodles {
  constructor(paintingArea, colorPalette) {
    this.paintingArea = paintingArea;
    this.colorPalette = colorPalette;
    this.sizeRange = [5, 80];
    this.bendinessRange = [0.1, 3];
    this.length = 100;
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
    let length = this.length;

    // Update to match the new BrushStroke constructor
    let strokeParams = {
      position: position,
      color: color,
      size: size,
      direction: direction,
      bendiness: bendiness,
      length: length,
    };

    let stroke = new BrushStroke(strokeParams);
    return stroke;
  }
}

class FlowField {
  constructor(paintingArea, colorPalette) {
    this.paintingArea = paintingArea;
    this.colorPalette = colorPalette;
    // Parameters for flow field complexity and flow strength
    this.noiseScale = 0.02; // Adjust for more or less detailed flow
    //this.flowStrength = TWO_PI; // Adjust for stronger or subtler flow direction changes
    this.strokeLength = 400; // Length of each stroke in the flow field

    this.flowStrengthMin = TWO_PI * 0.6; // Minimum flow strength
    this.flowStrengthMax = TWO_PI * 1.2; // Maximum flow strength

    this.lineThicknessMin = 0.5; // Minimum line thickness
    this.lineThicknessMax = 3; // Maximum line thickness

    this.flowStrength = random(this.flowStrengthMin, this.flowStrengthMax);
    this.lineThickness = random(this.lineThicknessMin, this.lineThicknessMax);
  }

  generateStrokes(numStrokes) {
    let strokes = [];
    for (let i = 0; i < numStrokes; i++) {
      strokes.push(this.generateBrushStroke());
    }
    return strokes;
  }

  generateBrushStroke() {
    // Start at a random position within the painting area
    let position = createVector(
      random(this.paintingArea.width),
      random(this.paintingArea.height)
    );
    let color = random(this.colorPalette).color; // Pick a random color from the palette
    let size = this.lineThickness; // Use the line thickness variable
    let path = [];

    // Generate the path based on the flow field
    for (let i = 0; i < this.strokeLength; i++) {
      let angle =
        noise(position.x * this.noiseScale, position.y * this.noiseScale) *
        this.flowStrength;
      let direction = p5.Vector.fromAngle(angle);
      position.add(direction); // Move the position along the direction
      path.push(position.copy());

      // Keep the stroke within the painting area
      position.x = constrain(position.x, 0, this.paintingArea.width);
      position.y = constrain(position.y, 0, this.paintingArea.height);
    }

    return new BrushStroke(path, color, size); // Note: BrushStroke class might need adjustments to accept a path
  }
}
