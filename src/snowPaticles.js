class Particle extends Rectangle {
  constructor(rectParams) {
    super(
      rectParams.canvasWidth,
      rectParams.canvasHeight,
      rectParams.width,
      rectParams.width,
      rectParams.color
    )
    this.canvasWidth = rectParams.canvasWidth
    this.canvasHeight = rectParams.canvasHeight

    this.width = rectParams.width
    this.y = Math.random() * this.canvasHeight
    this.x = Math.floor(-this.canvasWidth / 2) // start somwhere half the canvas width in left side of the screen
    this.angle = 0
    this.angleSpeed = Math.random() * 0.2
    this.curve = Math.random() * 5
    this.minSpeed = 1
    this.speedDiff = 8
    this.speed =
      Math.random() * (this.minSpeed + this.speedDiff) + this.minSpeed
    this.x
  }
  draw(ctx) {
    super.draw(ctx)
  }
  update(deltaTime) {
    //TODO: Move this to helper function if required else where calcuating curve and angle speed migth need it when calculating jump
    this.x = this.x + this.speed
    this.y += this.curve * Math.sin(this.angle)
    this.angle += this.angleSpeed

    //if out of canvas reset position
    if (this.x > this.canvasWidth + this.width) {
      this.x = -this.width
    }
  }
}

class Particles {
  constructor(canvasWidth, canvasHeight, maxWidth = 8, minWidth = 1) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.noOfParticles = 25
    this.particles = []
    this.maxWidth = maxWidth
    this.minWidth = minWidth
    this.y = Math.random() * canvasHeight
    this.#_intializeParticles()
  }
  draw(ctx) {
    this.particles.forEach((particle) => {
      particle.draw(ctx)
    })
  }
  update(deltaTime) {
    // X position will be update according to the new behaviour
    this.particles.forEach((particle) => {
      particle.update(deltaTime)
    })
  }

  #_intializeParticles() {
    for (let i = 0; i < this.noOfParticles; i++) {
      let randomWidth = Math.random() * this.maxWidth + this.minWidth
      this.particles.push(
        new Particle({
          canvasWidth: this.canvasWidth,
          canvasHeight: this.canvasHeight,
          width: randomWidth,
          height: randomWidth,
          color: 'hsl(192, 100%, 93%,1)',
        })
      )
    }
  }
}
