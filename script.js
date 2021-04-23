// Global Variables
let lives = 4
let score = 0
let turtle = 76
let intervalId = 0
const cells = document.querySelectorAll('.grid div')
const start = document.querySelector('#start')
const reset = document.querySelector('#reset')
const livesDisplay = document.querySelector('.livesDisplay')
const scoreDisplay = document.querySelector('.scoreDisplay')
const splash = document.querySelector('.audio2')
const width = 9
const audioPlayer = document.querySelector('#audio')
let plasticBottlePosition = [63, 65, 67, 69]
let plasticBagPosition = [55, 57]
let sodaCanPosition = [51, 53]
let starFishPosition = [29, 28]
let crabPosition = [22]
let whalePosition = [10, 13, 16]
let seaWeedPosition = [18, 25]
console.log(splash)


livesDisplay.innerHTML = lives
scoreDisplay.innerHTML = score
// To create index
// for (let index = 0; index < width ** 2; index++) {
//   // grid.appendChild(div)
//   // cells[index].innerHTML = index
// }
// Positioning turtle at the starting point 
cells[76].classList.add('little-turtle')
// Add eventListernet to each cell
// cells.forEach((cell) => {
//   start.addEventListener('click', () => {
//     // ! Check if the player 
//     if (cell.classList.contains('crab')) {
//       score += 100
//       cell.classList.remove('crab')
//       cell.classList.replace('')
//     }
//   })
// })
// Add a click event to my start button
start.addEventListener('click', () => {
  // ? This stops you from creating multiple set intervals
  if (intervalId !== 0) {
    return
  }
  audioPlayer.src = './sound/frogger-music.mp3'
  audioPlayer.play()

  // Tutle is moving
  document.addEventListener('keyup', (event) => {
    // ? Get the keyboard character typed from event.key
    const key = event.key
    audioPlayer.src = './sound/sound-frogger-hop.wav'
    audioPlayer.play()
    if (turtle === 76){
      splash.play()
    }

    cells[turtle].classList.add('little-turtle')
    if (key === 'ArrowDown' && !(turtle > (width ** 2) - width - 1)) {
      cells[turtle].classList.remove('little-turtle')
      turtle += width
      cells[turtle].classList.add('little-turtle')
      // ? 'ArrowLeft' moves turtle left -- but only if he's not on the left column!
    } else if (key === 'ArrowLeft' && !(turtle % width === 0)) {
      cells[turtle].classList.remove('little-turtle')
      turtle -= 1
      cells[turtle].classList.add('little-turtle')
      // ? 'ArrowRight' moves turtle right -- but only if he's not on the right column!
    } else if (key === 'ArrowRight' && !(turtle % width === width - 1)) {
      cells[turtle].classList.remove('little-turtle')
      turtle += 1
      cells[turtle].classList.add('little-turtle')
      // ? 'ArrowUp' moves turtle up -- but only if he's not in the top row!
    } else if (key === 'ArrowUp' && !(turtle < width)) {
      cells[turtle].classList.remove('little-turtle')
      turtle -= width
      cells[turtle].classList.add('little-turtle')

    }
    checkCrabCollision()
    checkSeaWeedCollision()
    checkPlasticBottleCollision()
    checkPlasticBagCollision()
    checkSodaCanCollision()
    checkShoreCollision()

    // if (cells[turtle].classList.contains('crab')){
    //   score += 200 
    //   cells[turtle].classList.remove('little-turtle')
    //   cells.classList.remove('crab')
    //   cells.classList.add('pink-bubble')
    // }
  }
  )
  // Turtle meets crab
  function checkCrabCollision() {
    if (cells[turtle].classList.contains('crab')) {
      const collisionHappened = turtle
      cells[turtle].classList.add('rainbow')
      setTimeout(() => {
        cells[collisionHappened].classList.remove('rainbow')
      }, 1000)
      score += 200
      audioPlayer.src = './sound/sound-frogger-coin-in.wav'
      audioPlayer.play()
      scoreDisplay.innerHTML = score
      cells[turtle].classList.remove('little-turtle')
      cells[turtle].classList.remove('crab')
    }
  }
  function checkSeaWeedCollision() {
    if (cells[turtle].classList.contains('sea-weed')) {
      const collisionHappened = turtle
      cells[turtle].classList.add('pink-bubble')
      setTimeout(() => {
        cells[collisionHappened].classList.remove('pink-bubble')
      }, 1000)
      score += 100
      audioPlayer.src = './sound/sound-frogger-coin-in.wav'
      audioPlayer.play()
      scoreDisplay.innerHTML = score
      cells[turtle].classList.remove('little-turtle')
      cells[turtle].classList.remove('sea-weed')
    }
  }
  function checkPlasticBottleCollision() {
    if (cells[turtle].classList.contains('plastic-bottle')) {
      const collisionHappened = turtle
      cells[turtle].classList.add('skeleton')
      setTimeout(() => {
        cells[collisionHappened].classList.remove('skeleton')
      }, 1000)
      loosingLives()
      cells[turtle].classList.remove('little-turtle')
      cells[turtle].classList.remove('plastic-bottle')

      // cells[turtle].classList.remove('little-turtle')
      cells[76].classList.add('little-turtle')
      turtle = 76
    }
  }
  function checkPlasticBagCollision() {
    if (cells[turtle].classList.contains('plastic-bag')) {
      const collisionHappened = turtle
      cells[turtle].classList.add('skeleton')
      setTimeout(() => {
        cells[collisionHappened].classList.remove('skeleton')
      }, 1000)
      loosingLives()
      cells[turtle].classList.remove('little-turtle')
      cells[turtle].classList.remove('plastic-bag')

      // cells[turtle].classList.remove('little-turtle')
      cells[76].classList.add('little-turtle')
      turtle = 76
    }
  }
  function checkSodaCanCollision() {
    if (cells[turtle].classList.contains('soda-can')) {
      const collisionHappened = turtle
      cells[turtle].classList.add('cloud')
      setTimeout(() => {
        cells[collisionHappened].classList.remove('cloud')
      }, 1000)
      score -= 100
      audioPlayer.src = './sound/sound-frogger-squash.wav'
      audioPlayer.play()
      scoreDisplay.innerHTML = score
      cells[turtle].classList.remove('little-turtle')
      cells[turtle].classList.remove('soda-can')
    }
  }
  function checkShoreCollision() {
    if (turtle === 1 || turtle === 3 || turtle === 5 || turtle === 7 && lives < 4 ){
      cells[turtle].classList.remove('little-turtle')
      cells[76].classList.add('little-turtle')
      turtle = 76 
    } else if (turtle === 0 || turtle === 2 || turtle === 4 || turtle === 6 || turtle === 8) {
      const collisionHappened = turtle
      cells[turtle].classList.add('skeleton')
      setTimeout(() => {
        cells[collisionHappened].classList.remove('skeleton')
      }, 1000)
      loosingLives()
    }
  }

  function loosingLives() {
    removeTurtle(turtle)
    addTurtle(turtle = 76)
    audioPlayer.src = './sound/sound-frogger-squash.wav'
    audioPlayer.play()
    setTimeout(wait, 500)
    function wait() {
      // lives[lives - 1]
      lives--
      livesDisplay.innerHTML = lives
      scoreDisplay.innerHTML = score
      if (lives === 0) {
        gameOver()
        resetGame()

      }
    }
  }
  function removeTurtle() {
    cells[turtle].classList.remove('little-turtle')
  }
  function addTurtle() {
    cells[turtle].classList.add('little-turtle')
  }
  function gameOver() {
    console.log('game over')
  }
  if (turtle === 1 || turtle === 3 || turtle === 5 || turtle === 7) {
    loosingLives()
  }

  // Plastic Bottles
  plasticBottlePosition.forEach(bottle => {
    setInterval(() => {
      if (bottle >= 62 && bottle < (width * (width - 1))) {
        cells[bottle].classList.remove('plastic-bottle')
        bottle = bottle += 1
        cells[bottle].classList.add('plastic-bottle')
      }
      if (bottle > 71) {
        cells[bottle].classList.remove('plastic-bottle')
        bottle = 62
      }

    }, 1000)
  })
  // Plastic Bags
  plasticBagPosition.forEach(bag => {
    setInterval(() => {
      if (bag > 61) {
        cells[bag].classList.remove('plastic-bag')
        bag = 53
        return
      }
      // if (bag >= 53 && bag < (width * (width - 1))) {
      cells[bag].classList.remove('plastic-bag')
      bag += 1
      cells[bag].classList.add('plastic-bag')
      // }


    }, 1000)
  })
  // Plastic Object to define 
  sodaCanPosition.forEach(can => {
    setInterval(() => {
      if (can >= 47 && can < (width * (width - 1))) {
        cells[can].classList.remove('soda-can')
        can -= 2
        cells[can].classList.add('soda-can')

      } else if (can < 54) {
        cells[can].classList.remove('soda-can')
        can = 53

      }
    }, 1000)
  })
  // Couple of star-fish
  starFishPosition.forEach((star, index) => {
    setInterval(() => {
      if (star === turtle) {
        cells[turtle].classList.remove('little-turtle')
        turtle += 1
        cells[turtle].classList.add('little-turtle')
        if (turtle === 36) {
          loosingLives()
        }
        // if (turtle < 27) {
        //   lives -= 1
        //   cells[turtle].classList.remove('little-turtle')
        //   cells[76].classList.add('little-turtle')
        //   turtle = 76
        // }
      }
      if (star > 26 && star < (width * (width - 1))) {
        cells[star].classList.remove('star-fish')
        star += 1
        cells[star].classList.add('star-fish')
        // if (turtle + 1 === star) {
        //   cells[turtle].classList.remove('little-turtle')
        //   turtle += 2
        //   return cells[turtle].classList.add('little-turtle')
        // }
        // } else {
        //   cells[star].classList.add('star-fish')
        // }
        // cells[star].classList.add('star-fish')
      }
      if (star > 35) {
        cells[star].classList.remove('star-fish')
        star = 27
        cells[star].classList.add('star-fish')
        // } else if (index === 1 && star > 35) {
        //   cells[star].classList.remove('star-fish')
        //   star = 28
        //   cells[star].classList.add('star-fish')
      }


    }, 2000)
  })
  // Here are the crabs
  crabPosition.forEach(crab => {
    setInterval(() => {
      if (crab >= 18 && crab < (width * (width - 1))) {
        cells[crab].classList.remove('crab')
        crab += 2
        cells[crab].classList.add('crab')
      }
      if (crab >= 27) {
        cells[crab].classList.remove('crab')
        crab = 18
      }
    }, 1000)
  })
  // Sea-weed same line with crab
  seaWeedPosition.forEach(weed => {
    setInterval(() => {
      if (weed >= 18 && weed < (width * (width - 1))) {
        cells[weed].classList.remove('sea-weed')
        weed = weed += 2
        cells[weed].classList.add('sea-weed')
      }
      if (weed > 27) {
        cells[weed].classList.remove('sea-weed')
        weed = 18
      }
    }, 1000)
  })

  // BLUE Whales Floating in the Ocean
  setInterval(() => {
    for (let index = 0; index < whalePosition.length; index++) {
      cells[whalePosition[index]].classList.remove('whale1')
      cells[whalePosition[index] + 1].classList.remove('whale2')
      whalePosition[index] -= 1
      cells[whalePosition[index]].classList.add('whale1')
      cells[whalePosition[index] + 1].classList.add('whale2')
      if (whalePosition[index] === turtle || whalePosition[index] - 1 === turtle) {
        console.log(whalePosition, turtle)
        cells[turtle].classList.remove('little-turtle')
        turtle -= 1
        cells[turtle].classList.add('little-turtle')
        if (turtle < 9) {
          lives -= 1
          loosingLives()
          cells[turtle].classList.remove('little-turtle')
          cells[76].classList.add('little-turtle')
          turtle = 76

        }
      }
      if (whalePosition[index] < 9) {
        cells[whalePosition[index] + 1].classList.remove('whale2')
        cells[whalePosition[index]].classList.remove('whale1')
        whalePosition[index] = 17
      }
    }
  }, 1000)
})
// Reset Game
reset.addEventListener('click', () => {
  resetGame()
})

function resetGame() {
  lives = 4
  score = 0
  livesDisplay.innerHTML = `Your lives are ${lives}`
  scoreDisplay.innerHTML = `Your score is ${score}`

  intervalId = 0
  // cells[molePosition].classList.remove('mole')
  clearInterval(intervalId)
  alert(`Game Over your score is ${score}`)
}




