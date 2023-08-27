class Player {
  /**
   * ------------
   * Player class
   * --------------
   * @description this is the may blueprint for player object should be a singleton that is only one should ever exist also it should always intialize itself
   * @param {object} params player parameter
   * @param {string } params.src  source of tile image
   * @param {number | undefined} params.spriteWidth spriteWidth
   * @param {number | undefined} params.spriteHeight spriteHeight
   * @param {number} params.gameWidth Game width
   * @param {number} params.gameHeight Game height
   * @param {number} params.width width of the object
   * @param {number} params.height height of the object
   * @param {number} params.x x position in the game | canvas
   * @param {number} params.y y postion in the canvas
   * @param {number} params.gravity down force constantly acting on the player
   * @param {number} params.speed value which will be calcuated as the speed | acceleration in any give direction that the player directs
   * @param {number} params.jumpVelocity velocity at which the player can jump up before starting to fall
   * @param {number} params.dashVelocity velocity at which the player can double jump or dash left or right or up midair or on the ground which pressed a key e,g C
   * @param {number} params.climbingVelocity velocity at which the player climbs down or up a "mountain" this should alway be less that the gravity range[0 and 0.9]
   */
  constructor(params) {
    this.image = new Image()
    this.image.src = params.src
    this.spriteWidth = params.spriteWidth || this.image.width
    this.spriteHeight = params.spriteHeight || this.image.height
    this.canvasWidth = params.canvasWidth
    this.canvasHeight = params.canvasHeight
    this.width = params.width
    this.height = params.height
    this.gravity = params.gravity || 1
    this.speed = params.speed || 2
    this.x = params.x
    this.y = params.y
  }
  // restart player when game over
  restart() {}
  /**
   * Player Draw function
   *_____________________
   * @param {CanvasRenderingContext2D} ctx canvas rendering context 2D
   */
  draw(ctx) {
    // Draw a rectangle which will act as the rigidbody mesh also used to determine collisions
    ctx.save()
    ctx.fillStyle = '#a11ad1'
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.restore()
    // Draw the player here depending with the current animation playing
    // ANIMATIONS
    // blue hair represent dashing mode we active
    // idle animation
    // jump animation
    // walking / running in any direction
    // climbing
    // draw Tile
    //   ctx.drawImage(
    //     this.image,
    //     this.frame * this.spriteWidth,
    //     0,
    //     this.spriteWidth,
    //     this.spriteHeight,
    //     this.x,
    //     this.y,
    //     this.tileWidth,
    //     this.tileWidth
    //   )
  }
  /**
   * The player update  function
   * ---------------------------
   * _____________________________________________________________________________________________________________________
   * @param {number} deltaTime timeForAnother Animation loop to occur typicly with 16usec for computer on empty animation
   * @param {InputSingleton} input input class provide current input keys
   * @param {Tile[]} tiles array of all the tiles in the gamescreen //FIXME: potential shows the game do to the large number of tile anyway not bad as the tile are a fixed number always per level just make sure to clear all the tiles object before moving from one level to another
   *
   */
  update(deltaTime, input, tiles) {
    // deltaTime important in determine refresh rate of the player animations
    // The player should keep falling due to gravity
    this.y += this.gravity
    // Add a collusion detection which will determine the rigidbody which will be if the player and the tiles have collided and is not spikes
    this.#hitSideWalls()
    // player should collide with object with rigidBody
    for (let i = 0; i < tiles.length; i++) {
      this.#collusionDetectionObjectsWithRigidBody(tiles[i])
    }

    // also make sure to check if the player falls beyond canvas height restart the section
    // the player will also have some special movement jumping dashing and climbing down
    // a wall while holding dash also this will be dependent on the arrows <-|-> | DOWN | UP
    //
  }

  #asPlayerClimbedSuccessfully() {
    if (this.y > 0) {
      return true
    }
    return false
  }
  /**
   *  if the player as gone beyond side wall of the game screen reposition
   */
  #hitSideWalls() {
    if (this.x < 0) {
      this.x = 0
    }
    if (this.x > this.canvasWidth) {
      this.x = this.canvasWidth - this.width
    }
  }
  /**
   * this function check collusion of the player with other game objects with collision detection
   * ___________________________________________________________________
   * @param {Tile} tile tile object
   *
   */
  #collusionDetectionObjectsWithRigidBody(tile) {
    const playerRect = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
    const tileRect = {
      x: tile.x,
      y: tile.y,
      width: tile.width,
      height: tile.height,
    }
    console.log('disableRigidbody', tile.disableRigidbody)
    const isCollided = checkRectangleCollusion(playerRect, tileRect)
    // tile.setIsCollided(isCollided)

    if (isCollided && !tile.disableRigidbody) {
      // re-position the player to the top of the tile
      if (this.y >= tile.y) {
        this.y == tile.y - this.height
      }
      // also do the same fo the sides if the player hit tile on the side reposition the player just next to the tile
      // left
      if (this.x <= tile.x + tile.width) {
        this.x == tile.x + tile.width
      }
      // right
      if (this.x + this.width >= tile.x) {
        this.x = tile.x - this.width
      }
    }
    //TODO Check if its gameover move this to
    if (
      (isCollided && !tile.disableRigidbody && tile.isSpikes) ||
      this.#asPlayerFallen()
    ) {
      GAME_OVER = true //TODO use get and setter syntax also get this object from gameobjects
    }
  }
  // checks if the player as fallen beyond gamescreen
  #asPlayerFallen() {
    if (this.y > this.canvasHeight + this.height) {
      return true
    }
    return false
  }

  #handlePlayerMovements(input) {
    // TODO
  }
}

// Create a singleton for player class to ensure only one instance is currently in user
