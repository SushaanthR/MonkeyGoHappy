var monkey, bananagrp, bg, obs, stonegrp, invground;

var monkeyimg, bananaimg, bgimg, obsimg, collided;

var score, gamestate, PLAY, END, col;

function preload() {

  monkeyimg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bgimg = loadImage("jungle.jpg");

  bananaimg = loadImage("banana.png");

  obsimg = loadImage("stone.png");
  
  //im pretty sure this is to stop movement in end state
  collided = loadImage("Monkey_05.png");

}

function setup() {
  createCanvas(600, 400);

  bg = createSprite(200, 150);
  bg.addImage("bgimg", bgimg);
  bg.scale =1.2
  
  invground=createSprite(20,400,1160,20     );
  
  monkey = createSprite(80, 340);
  monkey.addAnimation("collided",collided);
  monkey.addAnimation("monkeyimg", monkeyimg);

  
  monkey.scale = 0.13;


  score = 0;


  gamestate = 1;
  PLAY = 1;
  END = 0;


  bananagrp = createGroup();
  stonegrp = createGroup();


  speed = -8;

 
  col = 0;
}

function draw() {
  background(220);


 
  if (gamestate === PLAY) {
    
    monkey.changeAnimation("monkeyimg");

  
    bg.velocityX = -5;

    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }

    
    if (keyWentDown("space")&&monkey.collide(invground)){
      monkey.velocityY = -20;
    }

   
    monkey.velocityY = monkey.velocityY + 1;

    bananas();
    obstacles();

   
   

  }  


  if (gamestate === END) {
    bg.velocityX = 0;

    stonegrp.setVelocityXEach(0);
    stonegrp.setLifetimeEach(-5);

    bananagrp.setVelocityXEach(0);
    bananagrp.setLifetimeEach(-5);

    monkey.velocityY = 0;
    
    monkey.changeAnimation("collided",collided);

  }

 
  if (keyWentDown("r") && gamestate === END) {
    stonegrp.destroyEach();
    bananagrp.destroyEach();
    score = 0;
    gamestate = PLAY;
    speed = -6;
    monkey.scale = 0.13;
    col = 0;
  }

  
  if (monkey.isTouching(bananagrp)) {
    bananagrp.destroyEach();
    speed = speed - 0.5;
    monkey.scale = monkey.scale + 0.02;
    score = score + 20;
    col=0;
    

  }
  if (col === 2) {
    gamestate = END;
  }
  score = score + Math.round((getFrameRate() / 30));
  score.visible=true;

  if (stonegrp.isTouching(monkey)) {
     stonegrp.destroyEach();
    monkey.scale = 0.13;
    score = score - 100;
    col=col+1;
  }
  
  invground.visible=false;
  monkey.collide(invground);
  
  drawSprites();
  
  fill("Black");
  textSize(22);
  stroke("white");
  strokeWeight(2);
  text("Score "+score,5,25);
}
function obstacles(){
  if (frameCount%80===0){
    var obstacles = createSprite(width,360);
    obstacles.addImage("obsimg",obsimg);
    obstacles.scale = 0.18;
    obstacles.velocityX=-8;
    obstacles.lifetime=130;
    stonegrp.add(obstacles);
  }
}
function bananas(){
  if (frameCount%125===0){
    var banana = createSprite(width+30,random(220,350));
    banana.addImage("bananaimg",bananaimg);
    banana.scale=0.06;
    banana.velocityX=-8;
    banana.lifetime=130;
    bananagrp.add(banana);
  }
}