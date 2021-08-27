// Your code will go here

// Open up your console - if everything loaded properly you should see the version number
// corresponding to the latest version of ml5 printed to the console and in the p5.js canvas.
let player;
let backgroundImg;
let playerImg;
let obstcleImg;
let obstacles = [];
let wordClassifier;

function preload() {
  backgroundImg = loadImage("backgrond.jpeg");
  playerImg = loadImage("player.png");
  obstcleImg = loadImage("obstcle.png");

  let options = {
    probabilityThreshold: 0.85,
  };

  wordClassifier = ml5.soundClassifier("SpeechCommands18w", options);
}

function setup() {
  createCanvas(1000, 750);
  player = new Player();
  wordClassifier.classify (heardWord);
}

function heardWord(error, results) {
  console.log(results[0].label + " " + results[0].confidence);
  if (results[0].label == "up") {
    player.jump();
  }
}

function draw() {
  background(backgroundImg);
  player.show();
  player.move();
  for (let obs of obstacles) {
    obs.show();
    obs.move();

    if (player.collided(obs)) {
      console.log("GAME OVER!!");
      noLoop();
    }
  }

  if (random(1) < 0.008) {
    obstacles.push(new Obstcle());
  }
}

function keyPressed() {
  if (key == " ") {
    player.jump();
  }
}
