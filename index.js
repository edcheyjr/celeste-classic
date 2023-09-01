// global variables
const GRAVITY = 1
const CANVAS_WIDTH = (canvas.width = 760)
const CANVAS_HEIGHT = (canvas.height = 760)
const KEY_DOWN = 'ArrowDown'
const KEY_UP = 'ArrowUp'
const KEY_RIGHT = 'ArrowRight'
const KEY_LEFT = 'ArrowLeft'
const ENTER = 'Enter'
const SWIPE_UP = 'SwipeUp'
const SWIPE_DOWN = 'SwipeDown'
const SWIPE_RIGHT = 'SwipeRight'
const SWIPE_LEFT = 'SwipeLeft'
const KEY_Z = 'Z'
const KEY_X = 'X'
const KEY_C = 'C'

const TopSpeed = 1
let enemies = []
let score = 0
let GAME_OVER = false

window.onload = (e) => {
  const canvas = document.getElementById('canvas')
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext('2d')
  //game size

  let lastTime = 0

  // bg Image
  const bgImage = new Image()
  // #CBDBFC"
  bgImage.style.fill = '#847E87'
  bgImage.src = 'assets/background1-copy.svg'

  // new bg
  let bg = new Background(CANVAS_WIDTH, CANVAS_HEIGHT, bgImage)
  let newParticles = new Particles(CANVAS_WIDTH, CANVAS_HEIGHT)
  let levelObjs = levelGenerator(level1_1D, ROWS, COLS)
  console.log('levelObjs', levelObjs)
  let inputInstance = InputHandler.getInstance() //Input instance
  let player = new Player({
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
  })
  //    this.image = new Image()
  //     this.image.src = gameObj.src
  //     this.canvasWidth = gameObj.canvasWidth
  //     this.canvasHeight = gameObj.canvasHeight
  //     this.width = gameObj.width
  //     this.height = gameObj.height
  //     this.row = gameObj.row || 20
  //     this.col = gameObj.col || 20
  //     this.tileWidth = this.canvasWidth / row //should nbe 38 for now
  //     this.disableRigidbody = gameObj.disableRigidbody || false
  //     this.frame = 0 //use the first frame if animated
  //     this.isSpikes = false // spike tiles
  //     this.iscollided = false

  function animate(timestamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let deltatime = timestamp - lastTime
    lastTime = timestamp

    // draw & update bg
    bg.draw(ctx)
    bg.update(deltatime)
    // console.log('timestamp', timestamp)

    //TODO call level generator here lso might need to shift to tranditional for loop for performance
    levelObjs.map((row) => {
      row.map((tile) => {
        // check the tile to make sure it is not null
        if (tile) {
          tile.draw(ctx)
          tile.update(deltatime)
        }
      })
    })

    // Draw player
    player.draw(ctx)
    player.update(deltatime, inputInstance, levelObjs)

    // draw particles the last
    newParticles.draw(ctx)
    newParticles.update(deltatime)
    requestAnimationFrame(animate)
  }

  // intialize animation
  animate(0)

  // intialize a player animate player jumping from down and falling to ground before starting
  function initializePlayer() {}
}
