class Player {
  /**
   * --------------
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
   * @param {number} params.friction a opposite force that causes drag and  ulimate stops items for ever moving in one direction
   * @param {number} params.acceleration value which will be calcuated as the acceleration in any give direction that the player directs
   * @param {number} params.jumpVelocity velocity at which the player can jump up before starting to fall
   * @param {number} params.dashVelocity velocity at which the player can double jump or dash left or right or up midair or on the ground which pressed a key e,g C
   * @param {number} params.climbingVelocity velocity at which the player climbs down or up a "mountain" this should alway be less that the gravity range[0 and 0.9]
   */
  constructor(params) {
    const minimum = 1
    this.image = new Image()
    this.image.src = params.src
    this.spriteWidth = params.spriteWidth || this.image.width
    this.spriteHeight = params.spriteHeight || this.image.height
    this.canvasWidth = params.canvasWidth
    this.canvasHeight = params.canvasHeight
    this.width = params.width
    this.height = params.height
    this.gravity = params.gravity || 1 //TODO FUN FACT GRAVITY FOR EARTH
    this.gravitySpeed = this.gravity * 9.807
    this.acceleration = params.acceleration || 1
    this.speed = 0
    this.jumpVelocity = 15
    this.friction = params.friction || 1
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
    ctx.fillStyle = 'gold'
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
   * @param {Tile[][]} tiles tiles objects 2D Array
   */
  update(deltaTime, input, tiles) {
    // deltaTime important in determine refresh rate of the player animations
    // The player should keep falling due to gravity
    this.y += this.gravitySpeed

    // The player move from left or right
    this.x += this.speed
    // Add a collusion detection which will determine the rigidbody which will be if the player and the tiles have collided and is not spikes
    this.#hitSideWalls()
    // player should collide with object with rigidBody
    // TODO: On^2 which more often never be not be a O of ROWS*COLS^2 is not that bad for know level generation will have to evolve to be more optimized later.
    tiles.forEach((tileRow) => {
      if (tileRow.length > 0) {
        tileRow.forEach((tile) => {
          if (tile) {
            this.#collusionDetectionObjectsWithRigidBody(tile)
          }
        })
      }
    })
    // added input handling function
    this.#handlePlayerMovements(input)
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
    if (this.x >= CANVAS_WIDTH - this.width) {
      this.x = CANVAS_WIDTH - this.width
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
    // console.log('disableRigidbody', tile)
    const isCollided = checkRectangleCollusion(playerRect, tileRect)
    // console.log('isCollided', isCollided)
    // tile.setIsCollided(isCollided)

    if (isCollided && !tile.disableRigidBody) {
      // re-position the player to the top of the tile
      if (this.y + this.height >= tile.y) {
        // console.log('y change')
        this.y == tile.y - this.height
        // add same acting force on the opposite direction //TODO one can argue why not just set gravity to zero well maybe i'll do that
        this.y -= this.gravitySpeed
      }
      // also do the same fo the sides if the player hit tile on the side reposition the player just next to the tile
      // // left
      if (this.x <= tile.x + tile.width && this.y == tile.y) {
        this.x == tile.x + tile.width
      }
      // right
      if (this.x + this.width >= tile.x && this.y == tile.y) {
        this.x = tile.x - this.width
      }
    }
    // also make sure to check if the player falls beyond canvas height restart the section
    //TODO Check if its gameover move this to
    if (
      (isCollided && !tile.disableRigidbody && tile.isSpikes) ||
      this.#asPlayerFallen()
    ) {
      GAME_OVER = true //TODO use get and setter syntax also get this object from gameobjects
      // Restart section
    }
  }
  // checks if the player as fallen beyond gamescreen
  #asPlayerFallen() {
    if (this.y > this.canvasHeight + this.height) {
      return true
    }
    return false
  }

  /**
   *
   * @param {InputSingleton} input
   */
  #handlePlayerMovements(input) {
    // handle moving right up down left <- ^ -> jump pressing Z up and down to do nothing for now
    //left right inputs
    if (
      input.keys.indexOf(KEY_RIGHT) > -1 ||
      input.keys.indexOf(SWIPE_RIGHT) > -1
    ) {
      this.speed = 5
    } else if (
      input.keys.indexOf(KEY_LEFT) > -1 ||
      input.keys.indexOf(SWIPE_LEFT) > -1
    ) {
      this.speed = -5
    } else {
      this.speed = 0
    }
    // will help in directing angle of jump on vertical walls i.e if the player touch a vertical wall they will jump at an angle 45
    // handle special movement such as dash climb and double jump
    // the player will also have some special movement jumping dashing and climbing down
    // Dash will require  up and down and right for directing the direction of the dash which if executed after a jump will result in a double jump with the second jump dependant on the direction
  }
}

//TODO Coyote time
/**
 * Coyote Time A brief delay between an action and the consequences of that action that has no physical cause and exists only for comedic or gameplay purposes.
 *
 *  + = is the coyote valid area with a limited time to execute an action before physics catches up with you
 *  _ = is overlap boxes over the real tiles which help add extra pixel of vaild ground // added on all except the ones at the end of the canvas which should be exact to prevent overlap
 *      _______
 *  +++|+++++++|+++
 *     | |---| |
 *     | |---| |
 *     |+++++++|
 *
 */
