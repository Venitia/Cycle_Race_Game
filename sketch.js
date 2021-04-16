
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, ObstacleGroup
var ground, invisibleGround;
var survivalTime;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  monkey_collided = loadAnimation("sprite_1.png");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600, 400);
  monkey= createSprite(100,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.15;
  
  ground = createSprite(1200,235,600,10);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(0,235,600,10);
  invisibleGround.visible = false;
  
  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false
  
  survivalTime = 0;
}


function draw() {
  clear();
   
  stroke("black");
  textSize(15);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("SURVIVAL TIME:"+survivalTime,30,30);
  
 if(gameState === PLAY) {
  
  survivalTime = Math.ceil(frameCount/frameRate());
  
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
       
    }
   
    monkey.velocityY = monkey.velocityY + 0.5
   
  spawnFood();
  spawnObstacles();
  
   if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    }
  
  if(ObstacleGroup.isTouching(monkey)){
     gameState = END;
  }
 }
  else if (gameState === END) {
    monkey.changeAnimation("collided",monkey_collided);
    ObstacleGroup.velocityX = 0;
    FoodGroup.velocityX = 0;
    ObstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    ObstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0); 
    frameCount = 0;
   }
   
   monkey.collide(invisibleGround);
   drawSprites();
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,210,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
    obstacle.lifetime = 200;
    
    ObstacleGroup.add(obstacle);
  }
}

 
function spawnFood() {
  if (frameCount % 200 === 0) {
    var banana = createSprite(600,235,40,10);
    banana.y = Math.round(random(40,100));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}






