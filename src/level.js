const ROWS = 20
const COLS = 20

/** @constant EMPTY value 0 */
const EMPTY = 0
const UNDERGROUND = 1
const SURFACE = 2

/**
 * Example Level map
 * @type {number[]}
 * @constant level1_1D  */
const level1_1D = new Array(COLS * ROWS).fill(EMPTY) // Create a 1D array filled with EMPTY (0)

// for testing
level1_1D.fill(SURFACE, 0, 20) // Set the first row to SUFACE (1)
level1_1D.fill(UNDERGROUND, 355, 358)
level1_1D.fill(SURFACE, 352, 355)
level1_1D.fill(SURFACE, 360, 380) // Set the first row to SUFACE (1)
level1_1D.fill(UNDERGROUND, 380, 400) // Set the last row to UNDERGROUND (2)

//TOFIX 2D array might not be necessary
// const level1_2D = Array.from({ length: 20 }, () => new Array(20).fill(0)) // Create a 2D array filled with EMPTY (0)

// for (let i = 0; i < 20; i++) {
//   level1_2D[0][i] = 1 // Set the first row to SUFACE (1)
//   level1_2D[19][i] = 2 // Set the last row to UNDERGROUND (2)
// }

// function for level mapping each level
