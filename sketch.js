var pong;
var playerPaddle;
var computerPaddle;
var score=0;
var comScore=0; 
var gameState="serve";
var count=2;
var up;
var down;

function setup(){
  createCanvas(400, 400, windowWidth/2, windowHeight/2);
  pong=createSprite(200,200,10,10);
  playerPaddle=createSprite(380,200,15,100);
  computerPaddle=createSprite(20,200,15,100);
  up = createSprite(0, 0, 1000, 3);
  down = createSprite(0,400, 1000, 3);
}

function draw() {
  createEdgeSprites();
  background("black");  
  pong.shapeColor="white";
  playerPaddle.shapeColor="white";
  computerPaddle.shapeColor="white";
  up.shapeColor = "black";
  down.shapeColor = "black";
  
  up.depth = playerPaddle.depth;
  playerPaddle.depth = up.depth + 1;
  
  down.depth = playerPaddle.depth;
  playerPaddle.depth = down.depth + 1;
  
  up.depth = computerPaddle.depth;
  computerPaddle.depth = up.depth + 1;
  
  down.depth = computerPaddle.depth;
  computerPaddle.depth = down.depth + 1;
  
  textFont("TimesNewRoman");
  if(pong.x > 400 && gameState === "play"){
    comScore = comScore+1;
    pong.y=200;
    pong.x=200;
    computerPaddle.y=200;
    playerPaddle.y=200;
    pong.setVelocity(0,0);
    gameState = "serve";
  }
  if(gameState == "serve"){
    background("black");
    stroke("white");
    textSize(25);
    fill("white");
    text(comScore, 50, 205);
    textSize(25);
    fill("white");
    text(score,340, 205);
    textSize(25);
    textAlign("CENTER,TOP");
    fill("white");
    text("Press SPACE to start",85,20);
  }
  if(keyDown("SPACE") && gameState == "serve"){
    background("black");
    gameState = "play";
    pong.velocityX=random(-4,-8);
    pong.velocityY=random(3,6);
  }
  if(gameState == "play"){
    pong.visible=true;
    drawLine();
    textSize(25);
    fill("white");
    text("    "+score, 200,20);
    textSize(25);
    fill("white");
    text("  "+comScore,150,20);
    computerPaddle.y= pong.y;
    playerPaddle.y=World.mouseY;
  }

  if (comScore == 5 && comScore === score){
    background("black");
    textAlign(CENTER,CENTER);
    textSize(50);
    fill("WHITE");
    text("GAME OVER!",200,200);
    textSize(40);
    fill("white");
    text("Its A Draw!", 210, 50);
    textAlign(CENTER,BOTTOM);
    textSize(30);
    fill("white");
    text("Press 'r' to restart", 200,380);
    pong.visible=false;
    gameState = "over";
  }
  if (comScore == 5 && comScore > score){
    gameState = "over";
    background("black");
    textAlign(CENTER,CENTER);
    textSize(50);
    fill("WHITE");
    text("GAME OVER!",200,200);
    textSize(40);
    fill("white");
    text("You Lost!", 210, 50);
    textAlign(CENTER,BOTTOM);
    textSize(30);
    fill("white");
    text("Press 'r' to restart", 200,380);
    pong.visible=false;
  }
  if (score === 5 && comScore < score){
    background("black");
    textAlign(CENTER,CENTER);
    textSize(50);
    fill("WHITE");
    text("GAME OVER!",200,200);
    textSize(40);
    fill("white");
    text("You Won!", 210, 50);
    textAlign(CENTER,BOTTOM);
    textSize(30);
    fill("white");
    text("Press 'r' to restart", 200,380);
    pong.visible=false;
    gameState = "over";
    }
  if(gameState == "over"){
    computerPaddle.y=200;
    playerPaddle.y=200;
    computerPaddle.velocityY=0; 
    playerPaddle.velocityY=0;
  }
  if (keyDown("r") && gameState == "over"){
    gameState = "serve";
    comScore=0;
    score=0;
    pong.x=200;
    pong.y=200;
    pong.visible=true;
  }
  if(comScore == 5 && gameState == "play"){
    playSound("sound://category_retro/retro_game_medium_fall_3.mp3", false);
    if(World.seconds>count){
    stopSound("sound://category_retro/retro_game_medium_fall_3.mp3");
  }
  }
  pong.bounceOff(playerPaddle);
  pong.bounceOff(computerPaddle);
  pong.bounceOff(up);
  pong.bounceOff(down);
  drawSprites();
}
function drawLine(){
    for (var i=0; i<400; i=i+20){
    stroke("white");
    line(200,i,200,i+10);
  }
}
