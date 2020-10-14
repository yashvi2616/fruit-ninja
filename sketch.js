    var sword, swordimg;
    var PLAY = 1;
    var END = 0;
    var gameState =1;
    var Fruit;
    var bomb,bombImage;
    var f1,f2,f3,f4;
    var score;
    var gameover;
    var knifeSound;
    var GameOverSound;


  function preload(){
    swordimg = loadImage ("sword.png");
    f1 = loadImage ("fruit1.png");
    f2 = loadImage ("fruit2.png");
    f3 = loadImage ("fruit3.png");
    f4 = loadImage ("fruit4.png");
    bombImage = loadImage ("alien1.png");
    gameover = loadImage ("gameover.png");
    knifeSound=loadSound("knifeSwooshSound.mp3");
    gameOverSound=loadSound("gameover.mp3")
    
  }

  function setup(){
    createCanvas(400,400); 
    sword = createSprite (200,200,10,10)
    sword.addImage (swordimg);
    sword.scale = 0.7;
    fruitGroup = new Group();
    bombGroup = new Group();
    score = 0;
  }

  function draw(){
    background ("lightblue");
    text ("score "+score, 350,20)
    if(gameState === PLAY){
       sword.y = World.mouseY;
       sword.x = World.mouseX;

       fruits(); 
       bomb();

       sword.visible = true;

       if(bombGroup.isTouching(sword)){
         gameState = END;
         gameOverSound.play();
         }
       } 


    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score+1
      knifeSound.play();
    }
  if (gameState===END){
    sword.x = 200;
    sword.y = 200;
    sword.addImage (gameover);
    fruitGroup.velocityX = 0;
    bombGroup.velocityX = 0;
    fruitGroup.destroyEach();
    bombGroup.destroyEach();
  }
    
  

    drawSprites();
    }
  function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(500,200,20,20);
    fruit.scale=0.2;
     
     r=Math.round(random(1,5));
    if (r == 1) {
      fruit.addImage(f1);
    } else if (r == 2) {
      fruit.addImage(f2);
    } else if (r == 3) {
      fruit.addImage(f3);
    } else {
      fruit.addImage(f4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX = -7;
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
    
     var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: fruit.x=1
              fruit.velocityX=(7+score/4)
              
              break;
              
      case 2: fruit.x=400
              fruit.velocityX=-(7+score/4);
              
              break;
              
      default: break;
  }
}
}

    function bomb(){
      if(World.frameCount%200===0){
      b = createSprite (400,200,20,20);
        b.addAnimation("moving", bombImage);
        b.y=Math.round(random(100,300))
        b.velocityX = -(8+score/10);
        b.setLifetime = 50;

        bombGroup.add(b);
      }
    }

