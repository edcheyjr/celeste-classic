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
let score = 0
let GAME_OVER = false

window.onload = (e) => {
  const canvas = document.getElementById('canvas')
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext('2d')
  //game size

  let lastTime = 0

  const game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT)

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
    game.draw(ctx)
    game.update(deltatime)
    requestAnimationFrame(animate)
  }

  // intialize animation
  animate(0)
}
