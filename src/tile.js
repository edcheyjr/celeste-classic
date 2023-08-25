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
   * @param {object} gameObj tiles parameter
   * @param {string } gameObj.src  source of tile image
   * @param {string } gameObj.canvasWidth Game widht
   * @param {string } gameObj.canvasHeight Game height
   * @param {string } gameObj.width Game height
   * @param {number } gameObj.height Game height
   * @param {number} gameObj.row Number of tiles from 0 top of the screen to the bottom
   * @param {number} gameObj.col Number of tiles from 0 right of the screen to the left
   * @param {number } gameObj.x x position in the canvas
   * @param {number } gameObj.y y postion in the canvas
   *
   */
  constructor(gameObj) {
    this.image = new Image()
    this.image.src = gameObj.src
    this.spriteWidth = this.image.width || 16
    this.spriteHeight = this.image.height || 16
    this.canvasWidth = gameObj.canvasWidth
    this.canvasHeight = gameObj.canvasHeight
    this.width = gameObj.width
    this.height = gameObj.height
    this.row = gameObj.row || 20
    this.col = gameObj.col || 20
    this.tileWidth = this.canvasWidth / this.row //should nbe 38 for now
    this.disableRigidbody = gameObj.disableRigidbody || false
    this.frame = 0 //use the first frame if animated
    this.isSpikes = false // spike tiles
    this.iscollided = false
    // positions
    this.x = gameObj.x || 0 //todo
    this.y = gameObj.y || 0 //TODO
  }
  draw(ctx) {
    // Draw a rectangle which will act as the rigidbody mesh also used to determine collisions
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
  update(deltaTime) {
    // Add a collusion detection which will determine the igidbody which will be if the player and the tiles have collided and is not spikes
    //
  }
  // getRectParams
}
