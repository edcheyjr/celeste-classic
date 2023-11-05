/**
 *
 * @param {string} value
 * @param {Array<string>} array
 * @returns
 */
function checkIfAValueExists(value, array) {
  return array.indexOf(value) > -1
}
// TODO calculate curve for a jump
function curveMovement() {}

/**
 * Index to (x,y) converter
 * @param {number} index current postion
 * @param {number} totRows totla number of Rows
 * @returns {{row:number, col:number}} return row and col values for the given index provided their is  a total number of rows to
 */
function findColAndRowFor1DArr(index, totRows) {
  const row = Math.floor(index / totRows)
  const col = index % totRows
  return { row, col }
}

/**
 * X Y collision return object {y:bool, x:bool}
 * @description collision in X or Y direction
 * _____________________________________
 *
 * @param {object} rect1 first rectangle params
 * @param {number} rect1.x x position
 * @param {number} rect1.y y position
 * @param {number} rect1.width width
 * @param {number} rect1.height height
 * @param {number} rect1.speedX speed for X direction
 * @param {number} rect1.speedY speed for Y direction
 * @param {object} rect2 second rectangle params
 * @param {number} rect2.x x position
 * @param {number} rect2.y y position
 * @param {number} rect2.width width
 * @param {number} rect2.height height
 * __________________________________
 *
 * @returns {{xMov:boolean, yMov:boolean}} object {y movement:bool, x movement:bool}
 */
function getCollisionDetection(rect1, rect2) {
  let offset = 5
  let X = false
  let Y = false
  const currentRect1Right = rect1.x
  const currentRect1Left = rect1.x + rect1.width
  const currentRect1Top = rect1.y
  const currentRect1Bottom = rect1.y + rect1.height

  const nextX = currentRect1Right
  const nextRect1Right = currentRect1Left

  //if I keep moving in my current X direction, will I collide with the rect2?
  if (
    nextRect1Right > rect2.x &&
    nextX < rect2.x + rect2.width &&
    currentRect1Bottom > rect2.y + offset &&
    currentRect1Top < rect2.y + rect2.height - offset
  ) {
    // collided from right or left
    X = true
  }
  //check Y movement
  if (
    currentRect1Left > rect2.x + offset &&
    currentRect1Right < rect2.x + rect2.width - offset &&
    currentRect1Bottom + rect1.speedY > rect2.y &&
    currentRect1Top + rect1.speedY < rect2.y + rect2.height
  ) {
    //collided from top or bottom
    Y = true
  }
  // console.log('X', X)
  return {
    xMov: X,
    yMov: Y,
  }
}

/**
 * Checks if two rectangle collide or not
 * _____________________________________
 *
 * @param {object} rect first rectangle params
 * @param {number} rect.x x position
 * @param {number} rect.y y position
 * @param {number} rect.width width
 * @param {number} rect.height height
 * @param {object} rect2 second rectangle params
 * @param {number} rect2.x x position
 * @param {number} rect2.y y position
 * @param {number} rect2.width width
 * @param {number} rect2.height height
 * __________________________________
 *
 * @returns {boolean}
 */

function checkRectangleCollision(rect, rect2) {
  if (
    rect.x > rect2.x + rect2.width ||
    rect.x + rect2.width < rect2.x ||
    rect.y > rect2.y + rect2.height ||
    rect.y + rect.height < rect2.y
  ) {
    // no collision
    return false
  } else {
    // collision detected
    return true
  }
}
/**
 * Checks for circle collision
 * ---------------------------
 * @description tacks 2 circle {Circle} objects and test for the collision
 * @example
 * const isCollided = checkCircleCollision(circle1, circle2)
 * @param {Circle} circle1
 * @param {Circle} circle2
 * @returns
 */
function checkCircleCollision(circle1, circle2) {
  const opp = circle1.x - circle2.x
  const adj = circle1.y - circle2.y
  const hypo = Math.sqrt(opp * opp + adj * adj)
  const sumRadii = circle1.radius + circle2.radius
  if (hypo < sumRadii) {
    return true
  } else if (hypo === sumRadii) {
    // collision
    console('touching')
    return true
  } else {
    return false
  }
}
/**
 * interpolation fxn
 * ___________________
 *
 * @param {object} A vector A
 * @param {number} A.x x point
 * @param {number} A.y y point
 *
 * @param {object} B  vector B
 * @param {number} B.x x point
 * @param {number} B.y y point
 * @param {number} t percentage difference between the positions
 * _________________
 *
 * @returns {int} position btwn postions A and B
 *
 */
function lerp(A, B, t) {
  return A + (B - A) * t
}

/**
 * Intersection fxn
 * ----------------
 * @description takes vectors {A} to {B} AND {C} to {D} and find where they intersect otherwise returns null if not co-ordinates
 * ___________________________________
 *
 * @param {object} A vector A
 * @param {number} A.x x point
 * @param {number} A.y y point
 *
 * @param {object} B  vector B
 * @param {number} B.x x point
 * @param {number} B.y y point
 *
 * @param {object} C vector C
 * @param {number} C.x x point
 * @param {number} C.y y point
 *
 * @param {object} D vector D
 * @param {number} D.x x point
 * @param {number} D.y y point
 * _____________________________________
 *
 * @returns {{x:number, y:number, offset:number} | null} with x,y point of intersect or null between x and y and the offset
 *
 *
 */
function getIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)

  if (bottom != 0) {
    const t = tTop / bottom
    const u = uTop / bottom
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      }
    }
  }
  return null
}
/**
 * Test for intersection
 *-----------------------
 * @description test if two polygon{Rectangle, Circle e.t.c} intersect and return a boolean between two polygon
 * ____________________________________________________________________________
 *
 * @param {number[]} poly1 polygon one
 * @param {number[]} poly2 polygon two
 * ______________________________________________
 *
 * @returns {bool} true | false depending if whether the two polygon intersect
 */
function polysIntersect(poly1, poly2) {
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      const touch = getIntersection(
        poly1[i],
        poly1[(i + 1) % poly1.length],
        poly2[j],
        poly2[(j + 1) % poly2.length]
      )
      if (touch) {
        return true
      }
    }
  }
  return false
}
