var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(320,500,50,60)
ghost.addImage("ghost",ghostImg)
ghost.scale = 0.4;

  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw() {
  background(200);
  if (gameState==="play"){


  if(tower.y > 400){
      tower.y = 300
    }
    if (keyDown("space")){

      ghost.velocityY=-10;
    }
    ghost.velocityY=ghost.velocityY+0.8
 

if(keyDown("LEFT_ARROW")&& ghost.x >= 100) {
  ghost.x=ghost.x-3;

}
if(keyDown("RIGHT_ARROW")&& ghost.x >= 100) {
  ghost.x=ghost.x +3;

}
spawnclimber();
if (climbersGroup.isTouching(ghost)){
ghost.velocityY=0;

}
if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
  ghost.destroy()
  gameState="end"
}
drawSprites();
  }
if (gameState==="end"){
 // background="black";
  stroke("yellow");
   fill("yellow");
    textSize(30); 
    text("Game Over", 230,250);

}


}

function spawnclimber(){
if (frameCount % 250 === 0) {

  var door = createSprite(200,-50);
  door.x=Math.round(random(120,400));
  door.addImage(doorImg);
  door.velocityY=1;
  door.lifetime = 800;
  doorsGroup.add(door);

  var climber = createSprite(200,10);
  climber.x=door.x;
  climber.addImage(climberImg);
  climber.scale = 0.5;
  climber.velocityY = 1;
  climber.lifetime = 800;
  climbersGroup.add(climber);

  var invisibleBlock = createSprite(200,15);
  invisibleBlock.x=door.x
  invisibleBlock.width=climber.width;
  invisibleBlock.height=2;
  invisibleBlock.velocityY=1;
  invisibleBlock.lifetime = 800;
  invisibleBlockGroup.add(invisibleBlock);



  ghost.depth=door.depth;
  ghost.depth =ghost.depth+1;
}
}
