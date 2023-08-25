/**
 * Level Generator|
 * ----------------
 * @param {number[]} level This will be a 1D array with all the values representational of the game objects
 * @param {number} rows Number of rows
 * @param {number} cols  Number of cols
 * @returns {any[][]}
 */
function levelGenerator(level, rows, cols) {
  const lastItemRowIndex = rows - 1
  const lastItemColIndex = cols - 1
  const level_2D = Array.from({ length: rows }, () =>
    new Array(cols).fill(null)
  ) // Create a 2D array filled with EMPTY (0)
  // all the game objects that will be used by the tiles class
  // and their sorces
  for (let i = 0; i < level.length; i++) {
    // // If the is one of check fo the last two cause empty is already set
    // const EMPTY = 0
    // const UNDERGROUND = 1
    // const SURFACE = 2
    const { col: x, row: y } = findColAndRowFor1DArr(i, rows)

    if (level[i] == UNDERGROUND) {
      // add underground
      const underGround = new Tile({
        src: 'assets/soil1.png',
        canvasWidth: CANVAS_WIDTH,
        canvasHeight: CANVAS_HEIGHT,
        width: 30,
        height: 30,
        x: x * lastItemColIndex * 2,
        y: y * lastItemRowIndex * 2,
        col: cols,
        row: rows,
      })
      level_2D[y][x] = underGround
    }
    if (level[i] == SURFACE) {
      // Add surface
      const surface = new Tile({
        src: 'assets/tiles.svg',
        canvasWidth: CANVAS_WIDTH,
        canvasHeight: CANVAS_HEIGHT,
        width: 30,
        height: 30,
        x: x * lastItemColIndex * 2,
        y: y * lastItemRowIndex * 2,
        col: cols,
        row: rows,
      })
      console.log('2DaRRAY', level_2D)
      level_2D[y][x] = surface
    }
    // Flowers
    // Grass
    // Any other item
  }

  return level_2D // return the array with the game objects
}