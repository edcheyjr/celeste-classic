// TODO:  Refactor later to add QuadTree Instead of this 2D Array and ID Array This to easy spactial traversal and creation
// TODO:  of new Level and also optimize on performance

const ROWS = 20
const COLS = 20

// Level design representation of the assets
const EMPTY = 0
const UNDERGROUND = 1
const SURFACE = 2
const SPIKE = 3

/**
 * Example Level map
 * @type {number[]}
 * @constant level1_1D  */
const level1_1D = new Array(COLS * ROWS).fill(EMPTY) // Create a 1D array filled with EMPTY (0)

// for testing
level1_1D.fill(SURFACE, 0, 20) // Set the first row to SUFACE (1)
level1_1D.fill(SURFACE, 209, 210) // Set the first row to SUFACE (1)
level1_1D.fill(SURFACE, 229, 230) // Set the first row to SUFACE (1)
level1_1D.fill(SURFACE, 249, 250) // Set the first row to SUFACE (1)
level1_1D.fill(SURFACE, 269, 270) // Set the first row to SUFACE (1)
level1_1D.fill(SURFACE, 289, 290) // Set the first row to SUFACE (1)
level1_1D.fill(SURFACE, 309, 310) // Set the first row to SUFACE (1)
level1_1D.fill(SURFACE, 329, 330) // Set the first row to SUFACE (1)
level1_1D.fill(SURFACE, 349, 350) // Set the first row to SUFACE (1)

// level1_1D.fill(SURFACE, 224, 225) // Set the first row to SUFAzCE (1)
// level1_1D.fill(SURFACE, 247, 245) // Set the first row to SUFACE (1)
// level1_1D.fill(SURFACE, 267, 265) // Set the first row to SUFACE (1)
// level1_1D.fill(SURFACE, 287, 285)
level1_1D.fill(UNDERGROUND, 355, 358)
level1_1D.fill(SURFACE, 352, 355)
level1_1D.fill(SURFACE, 360, 380) // Set the first row to SUFACE (1)
level1_1D.fill(UNDERGROUND, 380, 400) // Set the last row to UNDERGROUND (2)
level1_1D.fill(SPIKE, 345, 350) //Spike

//TOFIX 2D array might not be necessary
// const level1_2D = Array.from({ length: 20 }, () => new Array(20).fill(0)) // Create a 2D array filled with EMPTY (0)

// for (let i = 0; i < 20; i++) {
//   level1_2D[0][i] = 1 // Set the first row to SUFACE (1)
//   level1_2D[19][i] = 2 // Set the last row to UNDERGROUND (2)
// }

// function for level mapping each level
