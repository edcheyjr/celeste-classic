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
   * @param {number} params.vy y velocity
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
    this.gravity = params.gravity || 1 //TODO FUN FACT GRAVITY FOR EARTH
    this.gravitySpeed = this.gravity * 0.9807
    this.acceleration = params.acceleration || 1
    this.speed = 0
    this.collided = false //check collusion in the y direction
    this.Xcollided = false // check collusion in x direction
    this.vx = 0 //TODO if we are going for a friction on surface also
    this.friction = params.friction || 1 //TODO if we are going for a friction on surface also
    this.x = params.x
    this.vy = 0
    this.jumpVelocity = 20
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
    // Draw a tile which will act as the rigidbody mesh also used to determine collisions
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
    //player on air
    this.#playerOnAir()
    // move left and right
    this.x += this.speed
    // Add a collision detection which will determine the rigidbody which will be if the player and the tiles have collided and is not spikes
    this.#hitSideWalls()
    // player should collide with object with rigidBody
    // TODO: On^2 which more often never be not be a O of ROWS*COLS^2 is not that bad for know level generation will have to evolve to be more optimized later.
    tiles.forEach((tileRow) => {
      if (tileRow.length > 0) {
        tileRow.forEach((tile) => {
          if (tile) {
            this.#collisionDetectionObjectsWithRigidBody(tile)
          }
        })
      }
    })
    // added input handling function
    this.#handlePlayerMovements(input)
  }

  #asPlayerClimbedSuccessfully() {
    if (this.y < 0) {
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
   * this function check collision of the player with other game objects with collision detection
   * ____________________________________________________________________________________________
   *
   * @param {Tile} tile tile object
   *
   */
  #collisionDetectionObjectsWithRigidBody(tile) {
    const { isCollided, collisionDirections } = this.#asCollidedWithATile(tile)

    // do collision checks only if the tile has not disabled rigidbody
    if (!tile.disableRigidBody) {
      // check y direction collision if true don't check x if not then proceed and check for x direction collusion
      if (collisionDirections.yMov) {
        this.collided = true
      }
      if (collisionDirections.xMov) {
        this.Xcollided = collisionDirections.xMov // set x collusion to true
      }
    }
    if (this.Xcollided) {
      // if it collided remain in the same position
      console.log('asdasda')
      this.Xcollided = false
      this.x = this.x - this.speed
    }

    //TODO Check if its gameover may move this to game.js
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
    if (this.y > CANVAS_WIDTH) {
      return true
    }
    return false
  }

  #playerOnAir() {
    //TODO: if the player is collided with the tiles sides the activate the gravity but only half or less
    //if the player is not collided with any tiles or reach end of the canvas or fallen or successful jumpover to the next section then they are on air thus activate gravity
    if (
      !this.#asPlayerFallen() &&
      !this.collided &&
      !this.#asPlayerClimbedSuccessfully()
    ) {
      this.vy += this.gravitySpeed
    } else {
      // set velocity y to 0
      this.vy = 0
    }
    // vertical movement can be the speed of gravity or 0
    this.y += this.vy
    this.collided = false
  }

  /**
   * Input handle movement function
   * @param {InputSingleton} input
   */
  #handlePlayerMovements(input) {
    // handle moving right up down left <- ^ -> jump pressing Z up and down to do nothing for now

    // case one when moving right and not collided
    if (
      (input.checkIfAKeyExists(KEY_RIGHT) ||
        input.checkIfAKeyExists(SWIPE_RIGHT)) &&
      !this.Xcollided
    ) {
      this.speed = 5
    }
    // case one when moving left and not collided
    else if (
      (input.checkIfAKeyExists(KEY_LEFT) ||
        input.checkIfAKeyExists(SWIPE_LEFT)) &&
      !this.Xcollided
    ) {
      this.speed = -5
    } else {
      // speed to zero no key input and not collided
      this.speed = 0
    }
    if (
      (input.checkIfAKeyExists(KEY_X) || input.checkIfAKeyExists(SWIPE_UP)) &&
      this.collided &&
      !this.#asPlayerFallen() &&
      !this.#asPlayerClimbedSuccessfully()
    ) {
      // console.log('X', this.Xcollided)
      //Simple Jump
      this.collided = false
      this.vy -= this.jumpVelocity
    }

    // will help in directing angle of jump on vertical walls i.e if the player touch a vertical wall they will jump at an angle 45
    // handle special movement such as dash climb and double jump
    // the player will also have some special movement jumping dashing and climbing down
    // Dash will require  up and down and right for directing the direction of the dash which if executed after a jump will result in a double jump with the second jump dependant on the direction
  }

  /**
   * Quick check to check if the player as collided with any tile and also the in which direction x or y
   * _________________________________________________________________
   *
   * @param {Tile} tile tile object
   * ________________________________________________________________
   *
   * @returns {{isCollided:boolean,collisionDirections:{ xMov: boolean;yMov: boolean;}}}
   *
   */
  #asCollidedWithATile(tile) {
    const playerRect = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      speedX: this.speed,
      speedY: this.vy,
    }
    const tileRect = {
      x: tile.x,
      y: tile.y,
      width: tile.tileWidth,
      height: tile.tileWidth,
    }

    const isCollided = checkRectangleCollision(playerRect, tileRect)
    const collisionDirections = getCollisionDetection(playerRect, tileRect)
    return { isCollided, collisionDirections } // return results
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
