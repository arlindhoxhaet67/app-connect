/*
 * Filename: complexCode.js
 * 
 * Description: This code demonstrates a complex simulation of a multi-agent system. It models a flock of birds
 * using the Boids algorithm, which simulates the behaviors of individuals within a group.
 */

// Constants
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const BOID_COUNT = 100;
const MAX_SPEED = 3;
const MAX_FORCE = 0.1;
const SEPARATION_DISTANCE = 30;
const ALIGNMENT_DISTANCE = 50;
const COHESION_DISTANCE = 80;
const DESIRED_SEPARATION = 25;
const BOID_RADIUS = 5;

// Boid class
class Boid {
  constructor(x, y, vx, vy) {
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector();

    this.id = Math.floor(Math.random() * 1000); // Generate a unique ID for each Boid
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  flock(boids) {
    const flockingForce = this.calculateFlockingForce(boids);
    this.applyForce(flockingForce);
  }

  calculateFlockingForce(boids) {
    let separationForce = createVector();
    let alignmentForce = createVector();
    let cohesionForce = createVector();

    let separationCount = 0;
    let alignmentCount = 0;
    let cohesionCount = 0;

    for (let i = 0; i < boids.length; i++) {
      const otherBoid = boids[i];
      const distance = this.position.dist(otherBoid.position);

      if (otherBoid.id !== this.id) {
        if (distance < SEPARATION_DISTANCE) {
          separationForce.add(this.calculateSeparationForce(otherBoid, distance));
          separationCount++;
        }

        if (distance < ALIGNMENT_DISTANCE) {
          alignmentForce.add(otherBoid.velocity);
          alignmentCount++;
        }

        if (distance < COHESION_DISTANCE) {
          cohesionForce.add(otherBoid.position);
          cohesionCount++;
        }
      }
    }

    if (separationCount > 0) {
      separationForce.div(separationCount);
      separationForce.setMag(MAX_SPEED);
      separationForce.sub(this.velocity);
      separationForce.limit(MAX_FORCE);
    }

    if (alignmentCount > 0) {
      alignmentForce.div(alignmentCount);
      alignmentForce.setMag(MAX_SPEED);
      alignmentForce.sub(this.velocity);
      alignmentForce.limit(MAX_FORCE);
    }

    if (cohesionCount > 0) {
      cohesionForce.div(cohesionCount);
      cohesionForce.sub(this.position);
      cohesionForce.setMag(MAX_SPEED);
      cohesionForce.sub(this.velocity);
      cohesionForce.limit(MAX_FORCE);
    }

    return separationForce.add(alignmentForce).add(cohesionForce);
  }

  calculateSeparationForce(otherBoid, distance) {
    const desiredSeparation = BOID_RADIUS + otherBoid.radius + DESIRED_SEPARATION;
    const diff = p5.Vector.sub(this.position, otherBoid.position);
    diff.normalize();
    diff.div(distance / desiredSeparation);
    return diff;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(MAX_SPEED);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  borders() {
    if (this.position.x < -BOID_RADIUS) this.position.x = SCREEN_WIDTH + BOID_RADIUS;
    if (this.position.y < -BOID_RADIUS) this.position.y = SCREEN_HEIGHT + BOID_RADIUS;
    if (this.position.x > SCREEN_WIDTH + BOID_RADIUS) this.position.x = -BOID_RADIUS;
    if (this.position.y > SCREEN_HEIGHT + BOID_RADIUS) this.position.y = -BOID_RADIUS;
  }

  render() {
    // Render boid shape
    fill(255);
    noStroke();
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading() + HALF_PI);
    beginShape();
    vertex(0, -BOID_RADIUS * 2);
    vertex(-BOID_RADIUS, BOID_RADIUS * 2);
    vertex(BOID_RADIUS, BOID_RADIUS * 2);
    endShape(CLOSE);
    pop();
  }
}

// Setup function
function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  const boids = [];
  
  for (let i = 0; i < BOID_COUNT; i++) {
    const x = random(SCREEN_WIDTH);
    const y = random(SCREEN_HEIGHT);
    const vx = random(-MAX_SPEED, MAX_SPEED);
    const vy = random(-MAX_SPEED, MAX_SPEED);
    boids.push(new Boid(x, y, vx, vy));
  }
}

// Draw function
function draw() {
  background(0);

  for (let i = 0; i < boids.length; i++) {
    const currentBoid = boids[i];
    currentBoid.run(boids);
  }
}

// Execute the code
setup();
draw();
