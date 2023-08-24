const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// global variables
const GRAVITY = 1
const CANVAS_WIDTH = (canvas.width = 760)
const CANVAS_HEIGHT = (canvas.height = 760)

//game size

let lastTime = 0

// bg Image
const bgImage = new Image()
bgImage.src = 'assets/background1-copy.svg'
bgImage.style.fill = '#847E87'

// new bg
let bg = new Background(CANVAS_WIDTH, CANVAS_HEIGHT, bgImage)
let newParticles = new Particles(CANVAS_WIDTH, CANVAS_HEIGHT)

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
let tile = new Tile({
  src: 'asset/tiles.svg',
  canvasWidth: CANVAS_WIDTH,
  canvasHeight: CANVAS_HEIGHT,
  width: 30,
  height: 30,
  x: 100,
  y: 200,
  col: 20,
  row: 20,
})

function animate(timestamp) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  let deltatime = timestamp - lastTime
  lastTime = timestamp

  // draw & update bg
  bg.draw(ctx)
  bg.update(deltatime)
  // console.log('timestamp', timestamp)

  // draw particles the last
  newParticles.draw(ctx)
  newParticles.update(deltatime)
  requestAnimationFrame(animate)
}

// intialize animation
animate(0)

// intialize a player animate player jumping from down and falling to ground before starting
function initializePlayer() {}
