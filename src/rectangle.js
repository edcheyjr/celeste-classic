class Rectangle {
  constructor(
    canvasWidth,
    canvasHeight,
    width = 100,
    height = 25,
    color = '#fff',
    speed = 5,
    y = Math.floor(Math.random() * canvasHeight),
    x
  ) {
    this.canvasHeight = canvasHeight
    this.canvasWidth = canvasWidth
    this.width = width
    this.height = height
    this.x = x || Math.floor(Math.random() * (this.canvasWidth / 2))
    this.y = y || canvasHeight / 2 - height / 2
    this.color = color
    this.speed = speed
  }
  draw(ctx) {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.restore()
  }
  update(deltaTime, newSpeed) {
    // if out of canvas reset postion
    if (this.x > this.canvasWidth + this.width) {
      if (newSpeed) {
        this.speed = newSpeed
      }
      this.x = -this.width
    }
    this.x = Math.floor(this.x + this.speed)
  }
}
