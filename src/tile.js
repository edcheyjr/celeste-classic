/**
 * update collusion
 * most of the foreground item will be a child of this or use this directly
 * if collides with the player inform the player or
 * the game it as collide and if the tile is a spike will help result to game over.
 * Also help create a rigid body and also will help for tiles that require expire time
 * all item draw on the level will extend the tile class
 *
 */
class Tile {
  /**
   * @param {object} params tiles parameter
   * @param {string } params.src  source of tile image
   * @param {number } params.canvasWidth Game widht
   * @param {number} params.canvasHeight Game height
   * @param {number} params.width width of the object
   * @param {number} params.height height of the object
   * @param {number} params.row Number of tiles from 0 top of the screen to the bottom
   * @param {number} params.col Number of tiles from 0 right of the screen to the left
   * @param {number} params.x x position in the canvas
   * @param {number} params.y y postion in the canvas
   * @param {number} params.disableRigidBody if the player should collided with the tile [set to false ] or not [else set to true]
   *
   */
  constructor(params) {
    this.image = new Image()
    this.image.src = params.src
    this.spriteWidth = this.image.width || 16
    this.spriteHeight = this.image.height || 16
    this.canvasWidth = params.canvasWidth
    this.canvasHeight = params.canvasHeight
    this.width = params.width
    this.height = params.height
    this.row = params.row || 20
    this.col = params.col || 20
    this.tileWidth = this.canvasWidth / this.row //should nbe 38 for now
    this.disableRigidbBody = params.disableRigidBody || false
    this.frame = 0 //use the first frame if animated
    this.isSpikes = false // spike tiles
    this.iscollided = false
    // this.player = params.player
    // positions
    this.x = params.x || 0 //todo
    this.y = params.y || 0 //TODO
    this.getIsCollided = () => this.iscollided
  }
  /**
   * draw function
   * _____________
   * @param {CanvasRenderingContext2D} ctx context rendering 2D
   */
  draw(ctx) {
    //TODO Coyote valid rectangle after basic input controls
    // Draw a rectangle which will act as the rigidbody mesh also used to determine collisions P.S only helps for visualization all computation happen at Players class
    ctx.save()
    ctx.strokeStyle = '#fff230'
    ctx.strokeRect(this.x, this.y, this.tileWidth, this.tileWidth)
    ctx.restore()

    // draw Tile
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.tileWidth,
      this.tileWidth
    )
  }

  /**
   * update function
   * @param {number} deltaTime
   */
  update(deltaTime) {
    // Any required updates especially tempPlatform
  }
}
