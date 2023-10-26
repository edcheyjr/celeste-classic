class Spike extends Tile {
  /**
   * @param {object} params tiles parameter
   * @param {string } params.src  source of tile image
   * @param {number } params.canvasWidth Game widht
   * @param {number} params.canvasHeight Game height
   * @param {number} params.width width of the object
   * @param {number} params.height height of the object
   * @param {number} params.x x position in the canvas
   * @param {number} params.y y postion in the canvas
   * @param {number} params.disableRigidBody if the player should collided with the tile [set to false ] or not [else set to true]
   *
   */
  constructor(params) {
    super({
      ...params,
      src: params.src || 'assets/spike.svg',
    })
    this.isSpike = true
  }
  draw(ctx) {
    super.draw(ctx)
  }
  update(deltaTime) {
    super.update(deltaTime)
  }
}
