class InputSingleton {
  constructor() {
    if (InputSingleton._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.")
    }
    this.keys = []
    this.touchY = ''
    this.touchX = ''
    this.touchTreshold = 30
    this.rightTouchTreshold = 60

    //keypress events
    window.addEventListener('keydown', (e) => {
      if (
        (e.key == KEY_DOWN ||
          e.key == KEY_UP ||
          e.key == KEY_LEFT ||
          e.key == KEY_RIGHT) &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key)
      } else if (e.key == ENTER && GAME_OVER) {
        restartGame()
      }
    })
    window.addEventListener('keyup', (e) => {
      if (
        e.key === KEY_DOWN ||
        e.key == KEY_UP ||
        e.key == KEY_LEFT ||
        e.key == KEY_RIGHT
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1)
      }
    })

    // Touch events
    window.addEventListener('touchstart', (e) => {
      // console.log('change touches', e.changedTouches[0])
      this.touchY = e.changedTouches[0].pageY
      this.touchX = e.changedTouches[0].pageX
    })
    window.addEventListener('touchmove', (e) => {
      // console.log(e)
      const swipeYDistance = e.changedTouches[0].pageY - this.touchY
      const swipeXDistance = e.changedTouches[0].pageX - this.touchX
      if (
        swipeYDistance < -this.touchTreshold &&
        this.keys.indexOf(SWIPE_UP) === -1
      ) {
        this.keys.push(SWIPE_UP)
      } else if (
        swipeYDistance > this.touchTreshold &&
        this.keys.indexOf(SWIPE_DOWN) === -1
      ) {
        this.keys.push(SWIPE_DOWN)
        // swipe down to restart the game probably to remove also to add other keys namely X, Z , C
        if (GAME_OVER) {
          restartGame()
        }
      } else if (
        swipeXDistance < this.rightTouchTreshold &&
        this.keys.indexOf(SWIPE_RIGHT) === -1
      ) {
        this.keys.push(SWIPE_RIGHT)
      } else if (
        swipeXDistance < -this.rightTouchTreshold &&
        this.keys.indexOf(SWIPE_LEFT) === -1
      ) {
        this.keys.push(SWIPE_LEFT)
      }
    })
    window.addEventListener('touchend', (e) => {
      console.log('keys', this.keys)
      // clean up keys
      this.keys.splice(this.keys.indexOf(SWIPE_UP), 1)
      this.keys.splice(this.keys.indexOf(SWIPE_DOWN), 1)
      this.keys.splice(this.keys.indexOf(SWIPE_RIGHT), 1)
      this.keys.splice(this.keys.indexOf(SWIPE_LEFT), 1)
    })
  }
}

class InputHandler {
  constructor() {
    throw new Error('Use InputHandler.getInstance()')
  }
  /**
   * get Input Instance
   * @description ensure that only one InputHandler is used
   * _____________________
   * ____________________
   * @returns {InputSingleton} input singleton class
   */
  static getInstance() {
    if (!InputSingleton.instance) {
      InputSingleton.instance = new InputSingleton()
    }
    return InputSingleton.instance
  }
}
