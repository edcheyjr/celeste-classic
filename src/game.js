// game intialization
class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.width = width
    this.height = height
    // bg Image
    this.bgImage = new Image()
    // #CBDBFC"
    this.bgImage.style.fill = '#847E87'
    this.bgImage.src = 'assets/background1-copy.svg'
    this.bg = new Background(width, height, this.bgImage)
    this.snowParticles = new Particles(width, height)
    this.enemies = []
    this.gameObjects = []
    this.enemyType = [] //TODO NOT YET DETERMINED
    this.isReady = false // change this state only when all intial object are loaded to various object data holders enemy for this instance this will be done like will game is loading
    this.player = new Player({
      src: '', //TODO add the player sprite here
      spriteWidth: 12, //TODO REPLACE
      spriteHeight: 12, //TODO REPLACE
      gameWidth: CANVAS_WIDTH,
      gameHeight: CANVAS_HEIGHT,
      width: 30,
      height: 50,
      x: 100,
      y: 100,
      gravity: GRAVITY,
      speed: 2,
    }) //New player
    this.levels = {}
    this.level1 = levelGenerator(level1_1D, ROWS, COLS)
    this.input = InputHandler.getInstance() //Input instance
    this.#initGameObjects() //initialize game objects
  }
  /**
   * The update  function
   * ---------------------------
   * _____________________________________________________________________________________________________________________
   * @param {number} deltaTime timeForAnother Animation loop to occur typicly with 16usec for computer on empty animation
   */
  update(deltaTime) {
    if (!this.isReady) {
      //  Initialization
      // fixed object not to be called at runtime can be called here and executed
      this.isReady = true
      this.gameObjects.forEach((obj) => obj.update(deltaTime))
    } else {
      // active bg
      this.bg.update(deltaTime)
      // other objects
      this.player.update(deltaTime, this.input, this.level1)
      // particles
      this.snowParticles.update(deltaTime)
    }
  }
  draw() {
    this.isReady && this.bg.draw(this.ctx)
    this.isReady && this.gameObjects.forEach((obj) => obj.draw(this.ctx))
    this.isReady && this.player.draw(this.ctx)
    this.isReady && this.snowParticles.draw(this.ctx)
  }

  #initGameObjects() {
    //NOTE: order is important

    // add all the tiles and player and other objects to gameObjects
    this.level1.map((row) => {
      row.map((tile) => {
        // check the tile to make sure it is not null
        if (tile) {
          this.gameObjects.push(tile)
        }
      })
    })
  }
}
