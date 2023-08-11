class Background {
  constructor(canvasWidth, canvasHeight, bgImage) {
    this.x = 0
    this.y = 0
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.bgImage = bgImage
    this.totalRectangles = 20
    this.rectangles = []
    this.rectMaxSpeed = 15
    this.rectMinSpeed = 3
    this.rectSpeed = Math.random() * this.rectMaxSpeed + this.rectMinSpeed
    this.#_intializeRectangles()
  }
  draw(ctx) {
    // draw moving items heres
    this.rectangles.forEach((rectangle) => {
      rectangle.draw(ctx)
    })

    // still items
    ctx.drawImage(
      this.bgImage,
      this.x,
      this.y,
      this.canvasWidth,
      this.canvasHeight
    )
  }

  update(deltaTime) {
    // update
    this.rectangles.forEach((rectangle) => {
      rectangle.update(deltaTime, this.rectSpeed)
    })
  }
  #_intializeRectangles() {
    for (let i = 0; i < this.totalRectangles; i++) {
      let randomWidth = Math.floor(Math.random() * 150 + 80)
      let randomRectSpeed =
        Math.random() * this.rectMaxSpeed + this.rectMinSpeed

      let randomHeight = Math.floor(Math.random() * 50 + 15)
      this.rectangles.push(
        new Rectangle(
          this.canvasWidth,
          this.canvasHeight,
          randomWidth,
          randomHeight,
          '#1c2a4d',
          randomRectSpeed
        )
      )
    }
  }
}
