class BrushStroke {
  constructor(params) {
    // Params can be either a path or individual properties
    if (Array.isArray(params)) {
      // If params is an array, assume it's a path
      this.path = params;
      this.color = arguments[1];
      this.size = arguments[2];
    } else {
      // If params is an object, extract properties
      this.position = params.position;
      this.color = params.color;
      this.size = params.size;
      this.direction = params.direction;
      this.bendiness = params.bendiness;
      this.length = params.length;
      this.path = [];
      this.create(); // Automatically generate path if needed
    }
  }

  create() {
    // Generate path based on direction and bendiness if not provided
    let currentPoint = this.position.copy();
    for (let i = 0; i < this.length; i++) {
      this.path.push(currentPoint.copy());
      let step = p5.Vector.fromAngle(
        this.direction + random(-this.bendiness, this.bendiness)
      );
      step.setMag(1);
      currentPoint.add(step);
    }
  }

  display(pGraphics) {
    pGraphics.push();
    pGraphics.stroke(this.color);
    pGraphics.strokeWeight(this.size);
    pGraphics.noFill();
    pGraphics.beginShape();
    for (let p of this.path) {
      pGraphics.vertex(p.x, p.y);
    }
    pGraphics.endShape();
    pGraphics.pop();
  }
}
