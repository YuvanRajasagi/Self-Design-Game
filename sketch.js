var attack, dead, hurt, hurtZ, rise, shoot, victory, walk, walkZ, bulletImg, bullet;
var healthBar, background1;
var zombieAttack,zombieDead, zombieHurt, zombieRise, zombieWalk;
var playerHurt, playerShot, playerVictory, playerWalk;
var player, zombie;
var bulletGroup, zombieGroup;
var x;
var score = 0;
var ground, backWall;

function preload(){
  attack = loadAnimation("images/attack.png");
  dead = loadAnimation("images/dead.png");
  hurt = loadImage("images/hurt.png");
  hurtZ = loadImage("images/hurtZ.png");
  rise = loadImage("images/rise.png");
  shoot = loadAnimation("images/shot.png");
  victory = loadImage("images/victory.png");
  walk = loadAnimation("images/walk.png");
  walkZ = loadImage("images/walkZ.png");
  healthBar = loadImage("images/health bar.png");
  background1 = loadImage("images/backround 1.jpg");
  bulletImg = loadImage("images/bullet.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  backWall = createSprite(width/6,height/6,800,400);
  backWall.addImage("backWall",background1);
  backWall.velocityX = 3;
  backWall.scale = 4;

  ground = createSprite(width/2,height - 100,width,10);
  ground.visible = true;

  player = createSprite(50,850);
  player.addAnimation("player",walk);
  player.scale = 0.7

  bulletGroup = new Group();
  zombieGroup = new Group();
}

function draw() {
  background("black");  
  drawSprites();

  if(frameCount %60 === 0){
    zombie = createSprite(750,850);
    zombie.y = random(50,350);
    zombie.addAnimation("zombie",attack);
    zombie.velocityY = 5;
    zombieGroup.add(zombie);
  }

  if(backWall.x > 800){
    backWall.x = 100;
  }

  player.addAnimation("player",walk);
  
  if(mouseIsPressed){
    if(mouseButton === LEFT){
      player.addAnimation("player",shoot);

      bullet = createSprite(80,320);
      bullet.addImage("bullet",bulletImg);
      bullet.scale = 0.8;
      bullet.velocityX = 3;
      bulletGroup.add(bullet);
      bullet.x = player.x + 40;
      bullet.y = player.y;
    }
  }

  for(var i = 0; i < zombieGroup.length; i ++){
    if(bulletGroup.isTouching(zombieGroup[i])){
      // zombieGroup.setVelocityXEach(0);
      tint(255,x);
      x = x - 0.5
      zombieGroup[i].addAnimation("zombie",dead); 
      // image(dead, zombieGroup[i].x, zombieGroup[i].y);
      zombieGroup[i].destroy();
      bulletGroup[i].destroy();
      score = score + 10;
    }
  }
  fill("white");
  text("Score: "+score, 400,50);

  if(zombieGroup.isTouching(player)){
    fill("white")
    text("Game Over", 300,200);
    zombieGroup.setVelocityXEach(0);
  }

  if(keyDown("RIGHT_ARROW")){
    player.x = player.x + 3;
  }

  if(keyDown("LEFT_ARROW")){
    player.x = player.x + -3;
  }

  if(keyWentDown("UP_ARROW") && player.y > 312.6) {
    player.velocityY = -16;
    touches = [];
  }
  player.velocityY = player.velocityY + 0.4;
  player.bounceOff(ground);
}