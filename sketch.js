var bg, ground;
var monkey, monkey_running, monkey_stop;
var banana, bananaImage, obstacle, obstacleImage;
var foodgroup, obsgroup;
var score;
var survivalTime = 0;

var gameState = "play";

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  bananaImage = loadImage("banana.png");
  obsImage = loadImage("obstacle.png");
 monkey_stop = loadAnimation("sprite_2.png");
}



function setup() {
  createCanvas(400, 400);

  score = 0;


  bg = createSprite(200, 200, 400, 400);
  

  monkey = createSprite(50, 350, 40, 40)
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stopping", monkey_stop);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;

  foodgroup = new Group();
  obsgroup = new Group();
}


function draw() {
  background(220);
    
  
  if (gameState === "play") {
 
   survivalTime = Math.ceil(frameCount / frameRate());
  
    if(ground.x<0) {
    ground.x=ground.width/2;
  }
    
    if (keyDown("space") && monkey.y>=300) {
      monkey.velocityY = -15;
    }
    

    monkey.velocityY = monkey.velocityY + 0.8;

   
  foodcommand();

  obstaclescommand();
    
     
    if (foodgroup.isTouching(monkey)) {
      score = score + 5;
      foodgroup.destroyEach();
    }
    if (obsgroup.isTouching(monkey)) {
      gameState = "end";
    }
  }
  
  if (gameState === "end"){
    ground.velocityX = 0;
      obsgroup.setVelocityXEach(0);
      foodgroup.setVelocityXEach(0) ;
      obsgroup.setLifetimeEach(-1);
      foodgroup.setLifetimeEach(-1);
    monkey.changeAnimation("stopping", monkey_stop);
    }
  
   monkey.collide(ground);
  
  
  drawSprites();
  fill("blue")
    textSize(15);
    text("Score :" + score, 250, 50);
    text("Survival time: " + survivalTime, 50, 50); 
}
 
function foodcommand() {
  if (frameCount % 120 == 0) {
    banana = createSprite(600, 200, 40, 40);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    Math.round(random(216, 336));
    banana.velocityX = -4;
    foodgroup.add(banana);
  }
}

function obstaclescommand() {
  if (frameCount % 120 === 0) {
    var obstacle = createSprite(400, 350, 10, 40);
    obstacle.addImage(obsImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
    obsgroup.add(obstacle);
  }
}
