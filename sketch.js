var trex,t_run,ground,ground_img,invisbleGround,cloud_img,Ob1,Ob2,Ob3,Ob4,Ob5,Ob6,gameState,ObstaclesGroup,CloudsGroup,trex_collided,gameOver,restart,gO_img,r_img;

var PLAY = 1;
var END = 0;
var score;

function preload(){
t_run =loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_img = loadImage("ground2.png");
  cloud_img = loadImage("cloud.png");
   Ob1 = loadImage("obstacle1.png");
   Ob2 = loadImage("obstacle2.png");
   Ob3 = loadImage("obstacle3.png");
   Ob4 = loadImage("obstacle4.png");
   Ob5 = loadImage("obstacle5.png");
   Ob6 = loadImage("obstacle6.png");
   trex_collided = loadAnimation("trex_collided.png");
  gO_img = loadImage("gameOver.png");
  r_img = loadImage("restart.png");
  
}


function setup() {
  createCanvas(800,300);
  trex = createSprite(50,250);
  trex.scale = 0.5;
  trex.addAnimation("run",t_run);
  trex.addAnimation("collide",trex_collided)
  ground = createSprite(200,280,800,20); 
  ground.addImage(ground_img);
  ground.x = ground.width / 2;
  ground.velocityX = -5;
  
  invisibleGround = createSprite(200,285,800,5);
  invisibleGround.visible = false;
  
  score = 0;
  
  gameState = PLAY;
  
  gameOver = createSprite(300,150);
  gameOver.addImage(gO_img);
  gameOver.scale = 0.5;
  
  restart = createSprite(300,200);
  restart.addImage(r_img);
  restart.scale = 0.5;
  
  ObstaclesGroup = new Group();
   CloudsGroup = new Group();
}

function draw() {
  background(255);
  
   text ("Score : " + score,20,30);
  
  if(gameState === PLAY){
  
    score = score + Math.round(getFrameRate()/60);
    
    console.log (score);
    
    if(ground.x < 0){
    ground.x = ground.width / 2;
     }
  
  //console.log(trex.y);
  
  if(keyDown("space") && trex.y >= 250){
     trex.velocityY = -10;
  
    }
    
    trex.velocityY = trex.velocityY + 0.8;
  
  gameOver.visible = false;
  restart.visible = false;
  
  spawnClouds();
  spawnObstacles();
    
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
     // playSound("die.mp3");
    } 
    
    
  } else if(gameState === END){
    
   //set velocity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
   ObstaclesGroup.setLifetimeEach(-1);
   CloudsGroup.setLifetimeEach(-1); 
    
  trex.changeAnimation("collide",trex_collided);
    
  gameOver.visible = true;
  restart.visible = true;
  
   if(mousePressedOver(restart)){
   reset();
   } 
  }
  
 trex.collide(invisibleGround); 
  
  drawSprites();
 
}

function spawnClouds(){
 if(frameCount % 100 === 0){
    var cloud = createSprite(800,200);
   cloud.velocityX = -3;
   cloud.addImage(cloud_img);
   var rand = random(130,200);
   cloud.y = rand;
   cloud.depth = trex.depth - 1;
   cloud.lifeTime = 267;
   CloudsGroup.add(cloud);
    }

}

function spawnObstacles(){
if(frameCount % 60 === 0) {
  var obstacles  = createSprite(800,265);
  
  var ran = Math.round( random(1,6));
   console.log(ran);
  switch(ran)
  {
    case 1: obstacles.addImage(Ob1);
      break;
     
    case 2: obstacles.addImage(Ob2);
      break;  
      
    case 3: obstacles.addImage(Ob3);
      break;
      
    case 4: obstacles.addImage(Ob4);
      break;
      
    case 5: obstacles.addImage(Ob5);
      break;
      
    case 6: obstacles.addImage(Ob6);
      break;
      
      default:
      break;
    
  }
  obstacles.velocityX = -4;
  obstacles.scale = 0.5;
  ObstaclesGroup.add(obstacles);
  obstacles.lifetime = 200;
   }
  
}

function reset(){
    score = 0;
    gameState = PLAY;
   ObstaclesGroup.destroyEach();
   CloudsGroup.destroyEach();
   gameOver.visible = false;
   restart.visible = false;
   trex.changeAnimation("run",t_run);
}