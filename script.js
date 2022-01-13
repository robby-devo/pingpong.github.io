// alert("Hello");

var ball = document.querySelector(".ball");
let board = document.querySelector(".board");

let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");

// board ka bound nikalna hai
let boardBounds = board.getBoundingClientRect();
let x = true;
let y = true;
// console.log(boardBounds);
// user input

let leftPlayerLives = 3;
let rightPlayerLives = 3;
document.addEventListener("keydown", function (e) {
  if (e.key == "w") {
    movePaddle(leftPaddle, -window.innerHeight * 0.1);
  } else if (e.key == "s") {
    movePaddle(leftPaddle, window.innerHeight * 0.1);
  } else if (e.key == "ArrowDown") {
    movePaddle(rightPaddle, window.innerHeight * 0.1);
  } else if (e.key == "ArrowUp") {
    movePaddle(rightPaddle, -window.innerHeight * 0.1);
  }
});

function setColor(idx) {
  let allIcons = document.querySelectorAll(".fas.fa-circle");

  allIcons[idx].style.color = "#686de0";
}

function movePaddle(cPaddle, change) {
  let cPaddleBounds = cPaddle.getBoundingClientRect();
  if (
    cPaddleBounds.top + change >= boardBounds.top &&
    cPaddleBounds.bottom + change <= boardBounds.bottom
  ) {
    cPaddle.style.top = cPaddleBounds.top + change + "px";
  }
}

// user input end
// console.log(boardBound);
// kisi bhi element ki current top position nikalna hai toh ye use kro

// /request animation frame-jab bhi ek nya frame browser show krega ,toh iske andr koi function pass kroge toh wo ball ko move kr dega

// 144frames in 1sec
// 144images aisa lagega ek ke baad ek aayi ja rhi hai

// bottom mtlb ball ka bottom kitni door hai is page ke top se

// right hota hai ball ke right se body ke left side tak
// var y = 0;
// var x = 0;

function moveBall() {
  let ballcord = ball.getBoundingClientRect();
  console.log(ballcord);

  // agr iska top nikalna hai toh

  let ballTop = ballcord.top; /*value is in px*/
  let ballLeft = ballcord.left;
  let ballBottom = ballcord.bottom;
  let ballRight = ballcord.right;

  // handle vertical bound
  if (ballTop <= boardBounds.top || ballBottom >= boardBounds.bottom) {
    //   vertically outside
    y = !y;
  }

  // handle horizontal

  // x is horizontal,y is vertical

  // if (ballLeft <= boardBounds.left || ballRight >= boardBounds.right) {
  //   // horizontally outside
  //   x = !x;
  // }
  // left hit np
  // right hit np

  let leftPaddleBounds = leftPaddle.getBoundingClientRect();

  let rightPaddleBounds = rightPaddle.getBoundingClientRect();
  // this is for left paddle
  // ************collison code

  // check if collided with any players horizontal boundary

  let hasTouchedLeft = ballLeft < boardBounds.left;

  let hasTouchedRight = ballRight > boardBounds.right;

  if (hasTouchedLeft || hasTouchedRight) {
    if (hasTouchedLeft) {
      leftPlayerLives--;
      setColor(leftPlayerLives);
      if (leftPlayerLives == 0) {
        alert("Game Over Player 2 😈😈 Wins 💥💥");
        document.location.reload();
      } else {
        return resetGame();
      }
    } else {
      rightPlayerLives--;
      setColor(3 + rightPlayerLives);
      if (rightPlayerLives == 0) {
        alert("Game Over Player 1 😎😎 Wins 💥💥");
        document.location.reload();
      } else {
        return resetGame();
      }
    }
  }

  function resetGame() {
    ball.style.top = window.innerHeight * 0.45 + "px";

    ball.style.left = window.innerHeight * 0.45 + "px";
    requestAnimationFrame(moveBall);
  }

  if (
    ballLeft <= leftPaddleBounds.right &&
    ballRight >= leftPaddleBounds.left &&
    ballTop + 30 >= leftPaddleBounds.top &&
    ballBottom - 30 <= leftPaddleBounds.bottom
  ) {
    x = !x;
  }

  if (
    ballLeft <= rightPaddleBounds.right &&
    ballRight >= rightPaddleBounds.left &&
    ballTop + 30 >= rightPaddleBounds.top &&
    ballBottom - 30 <= rightPaddleBounds.bottom
  ) {
    x = !x;
  }
  //************ */ collison code

  // agr har bar move krna hai toh req animation use kro

  ball.style.top = y == true ? ballTop + 4 + "px" : ballTop - 4 + "px";

  ball.style.left = x == true ? ballLeft + 4 + "px" : ballLeft - 4 + "px";

  requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);
// moveBall();
