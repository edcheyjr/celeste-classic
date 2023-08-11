const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// global variables

const CANVAS_WIDTH = (canvas.width = 700)
const CANVAS_HEIGHT = (canvas.height = 700)

//game size

let lastTime = 0

// bg Image
const bgImage = new Image()
bgImage.src = 'assets/background1-copy.svg'
bgImage.style.fill = '#847E87'

// new bg
let bg = new Background(CANVAS_WIDTH, CANVAS_HEIGHT, bgImage)
let newParticles = new Particles(CANVAS_WIDTH, CANVAS_HEIGHT)

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
