class Level1 extends Phaser.Scene {

    constructor() {
        super("Level1");
    }

    preload() {

         this.load.image("coke", "assets/coke.png");



    }


    reachCoke() {

    this.physics.pause();

    this.cameras.main.fadeOut(1000,255,255,255);

    this.time.delayedCall(1000,()=>{

        this.scene.start("MessageScene",{

    message:
`These 6 months together have been the best thing ever for me love. Meeting you has ong made my life so much better.`,
nextScene:"Level2",
   
   photo:"photo1"

});
    });

}

    create() {

       


      this.input.addPointer(4);

        const width = this.scale.width;
const height = this.scale.height;
        // =========================
// CREATE PLAYER TEXTURE
// =========================

const g = this.make.graphics({x:0,y:0,add:false});

// Hair (back)
g.fillStyle(0x2B1B17);
g.fillRoundedRect(3,2,24,22,6);

// Face
g.fillStyle(0xFFD8BE);
g.fillCircle(15,15,9);

// Hair fringe
g.fillStyle(0x1E1A1A);
g.fillRoundedRect(5,2,20,10,4);

// Eyes
g.fillStyle(0x222222);
g.fillCircle(11,15,1.3);
g.fillCircle(19,15,1.3);

// Smile
g.lineStyle(1.5,0xAA5555);
g.beginPath();
g.arc(15,18,3,0,Math.PI,false);
g.strokePath();

// Hoodie
g.fillStyle(0xFF7EB6);
g.fillRoundedRect(4,24,22,18,4);

// Hoodie strings
g.lineStyle(1,0xffffff);
g.lineBetween(13,25,13,31);
g.lineBetween(17,25,17,31);

// Arms
g.fillStyle(0xFFD8BE);
g.fillRoundedRect(1,25,4,14,2);
g.fillRoundedRect(25,25,4,14,2);

// Legs
g.fillStyle(0x5B3A29);
g.fillRect(8,42,5,8);
g.fillRect(17,42,5,8);

// Shoes
g.fillStyle(0xffffff);
g.fillRect(7,49,6,2);
g.fillRect(17,49,6,2);

g.generateTexture("girl",30,52);

g.destroy();

        // =========================
         // BACKGROUND
        // =========================

          const bg = this.add.graphics();

        bg.fillGradientStyle(
         0xFFF8FC, // top left
         0xFFF8FC, // top right
         0xFFDDEE, // bottom left
         0xFFDDEE, // bottom right
         1
);

bg.fillRect(0, 0, 3000, 600);


     // =========================
// CLOUDS
// =========================

for(let i = 0; i < 8; i++){

    let cloud = this.add.container(

        Phaser.Math.Between(100, 2900),

        Phaser.Math.Between(60, 220)

    );

    cloud.add([

        this.add.circle(-30,0,22,0xffffff,0.75),

        this.add.circle(0,-8,28,0xffffff,0.75),

        this.add.circle(30,0,22,0xffffff,0.75),

        this.add.circle(0,10,18,0xffffff,0.75)

    ]);

    this.tweens.add({

        targets: cloud,

        x: cloud.x + Phaser.Math.Between(120,250),

        duration: Phaser.Math.Between(12000,18000),

        yoyo:true,

        repeat:-1,

        ease:"Sine.easeInOut"

    });

}

        // World size
        this.physics.world.setBounds(0, 0, 1800, 600);

        // Ground
        this.ground = this.add.rectangle(
            900,
            575,
            1800,
            50,
            0x8FD16A
        );

        this.physics.add.existing(this.ground, true);

        // Dirt under the grass

        this.add.rectangle(
         1500,
         595,
         3000,
         20,
        0xA86A3D
);

        // =========================
// FLOWERS
// =========================

for(let x = 25; x < 2975; x += 25){

    let flower = this.add.container(
        x,
        548 + Phaser.Math.Between(-5,5)
    );

    // Stem
    flower.add(
        this.add.rectangle(
            0,
            8,
            2,
            12,
            0x5CAF50
        )
    );

    // Petals
    flower.add(this.add.circle(0,-4,3,0xFF7EB6));
    flower.add(this.add.circle(-4,0,3,0xFFB6D9));
    flower.add(this.add.circle(4,0,3,0xFFB6D9));
    flower.add(this.add.circle(0,4,3,0xFF7EB6));

    // Center
    flower.add(
        this.add.circle(
            0,
            0,
            2,
            0xFFE066
        )
    );

    // Gentle sway
    this.tweens.add({

        targets: flower,

        angle: Phaser.Math.Between(-5,5),

        duration: Phaser.Math.Between(1800,2600),

        yoyo: true,

        repeat: -1,

        ease: "Sine.easeInOut"

    });

}

       // =========================
// PLAYER
// =========================

this.player = this.physics.add.sprite(
    120,
    525,
    "girl"
);

this.player.setScale(1.35);

this.player.setCollideWorldBounds(true);

this.player.body.setSize(30, 50);

this.player.body.setOffset(0, 0);

this.physics.add.collider(
    this.player,
    this.ground
);
     
    // =========================
// PLATFORMS
// =========================

this.platforms = this.physics.add.staticGroup();

const createPlatform = (x, y, width) => {

    // Grass
    this.add.rectangle(
        x,
        y - 8,
        width,
        6,
        0x8FD16A
    );

    // Dirt
    const platform = this.add.rectangle(
        x,
        y + 3,
        width,
        20,
        0xA86A3D
    );

    this.physics.add.existing(platform, true);

    this.platforms.add(platform);

};

          
       createPlatform(350,470,170);

createPlatform(620,420,160);

createPlatform(900,350,170);

createPlatform(680,220,150);

createPlatform(1050,150,160);

createPlatform(1350,270,170);

createPlatform(1620,240,150);

createPlatform(1900,330,170);

createPlatform(2200,260,170);

createPlatform(2480,200,150);

createPlatform(2750,260,170);

createPlatform(3000,180,220);

// Flowers near the goal

for(let i=0;i<8;i++){

    let flower=this.add.circle(

        2790+i*18,

        160,

        4,

        0xFF80B5

    );

    this.add.circle(

        2790+i*18,

        160,

        1.5,

        0xFFE066

    );

}

     this.physics.add.collider(
    this.player,
    this.platforms
);

      // =========================
// DIET COKE
// =========================

this.coke = this.physics.add.sprite(
    1600,
    200,
    "coke"
);

this.coke.setScale(1);
this.coke.body.setAllowGravity(false);

this.coke.setScale(1.2);

this.coke.body.setAllowGravity(false);
     // Gentle floating
this.tweens.add({

    targets: this.coke,

    y: this.coke.y - 10,

    duration: 1200,

    yoyo: true,

    repeat: -1,

    ease: "Sine.easeInOut"

});

// =========================
// GOAL HEARTS
// =========================

for(let i=0;i<12;i++){

    let heart=this.add.text(

        this.coke.x+Phaser.Math.Between(-45,45),

        this.coke.y+Phaser.Math.Between(-35,35),

        "❤",

        {

            fontSize:"20px",

            color:"#FF4F9A"

        }

    );

    heart.setAlpha(.8);

    this.tweens.add({

        targets:heart,

        y:heart.y-20,

        alpha:0,

        duration:1200,

        delay:i*120,

        repeat:-1

    });

}

// Gentle rotation
this.tweens.add({

    targets: this.coke,

    angle: 6,

    duration: 1000,

    yoyo: true,

    repeat: -1,

    ease: "Sine.easeInOut"

});

this.tweens.add({

    targets: this.coke,

    y: this.coke.y - 12,

    duration: 1200,

    yoyo: true,

    repeat: -1,

    ease: "Sine.easeInOut"

});

for(let i = 0; i < 8; i++){

    let heart = this.add.text(

        this.coke.x + Phaser.Math.Between(-25,25),

        this.coke.y + Phaser.Math.Between(-25,25),

        "❤",

        {

            fontSize: "18px",

            color: "#FF6FA7"

        }

    );

    this.tweens.add({

        targets: heart,

        y: heart.y - 15,

        alpha: 0,

        duration: 1200,

        delay: i * 150,

        repeat: -1

    });

}

       this.physics.add.overlap(
    this.player,
    this.coke,
    this.reachCoke,
    null,
    this
);

        // Camera follows player
        this.cameras.main.startFollow(this.player);

        this.cameras.main.setBounds(
            0,
            0,
            1800,
            600
        );

        // Keyboard controls
        // Keyboard
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.A
);

       this.keyD = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.D
);

         this.keyW = this.input.keyboard.addKey(
         Phaser.Input.Keyboard.KeyCodes.W
);

        // Mobile controls
         this.moveLeft = false;
         this.moveRight = false;
        this.jumpPressed = false;

        // ==========================
// MOBILE CONTROLS
// ==========================

// LEFT BUTTON
const leftButton = this.add.circle(
     width * 0.08,
    height * 0.87,
    35,
    0xffffff,
    0.35
)
.setScrollFactor(0)
.setInteractive({ useHandCursor: true });

this.add.text(
    width * 0.08,
    height * 0.87,
    "◀",
    {
        fontFamily: "Fredoka",
        fontSize: "30px",
        color: "#555555"
    }
)
.setOrigin(0.5)
.setScrollFactor(0);

leftButton.on("pointerdown",(pointer)=>{

    this.leftPointer = pointer.id;

    this.moveLeft = true;

    leftButton.setScale(.92);

});

leftButton.on("pointerup",(pointer)=>{

    if(pointer.id === this.leftPointer){

        this.moveLeft = false;

        leftButton.setScale(1);

    }

});

leftButton.on("pointerupoutside",(pointer)=>{

    if(pointer.id === this.leftPointer){

        this.moveLeft = false;

        leftButton.setScale(1);

    }

});


// RIGHT BUTTON

const rightButton = this.add.circle(
   width * 0.17,
    height * 0.87,
    35,
    0xffffff,
    0.35
)
.setScrollFactor(0)
.setInteractive({ useHandCursor: true });

this.add.text(
   width * 0.17,
    height * 0.87,
    "▶",
    {
        fontFamily: "Fredoka",
        fontSize: "30px",
        color: "#555555"
    }
)
.setOrigin(0.5)
.setScrollFactor(0);

rightButton.on("pointerdown",(pointer)=>{

    this.rightPointer = pointer.id;

    this.moveRight = true;

    rightButton.setScale(.92);

});

rightButton.on("pointerup",(pointer)=>{

    if(pointer.id === this.rightPointer){

        this.moveRight = false;

        rightButton.setScale(1);

    }

});

rightButton.on("pointerupoutside",(pointer)=>{

    if(pointer.id === this.rightPointer){

        this.moveRight = false;

        rightButton.setScale(1);

    }

});


// JUMP BUTTON

const jumpButton = this.add.circle(
    width * 0.92,
    height * 0.87,
    40,
    0xffffff,
    0.35
)
.setScrollFactor(0)
.setInteractive({ useHandCursor: true });

this.add.text(
     width * 0.92,
    height * 0.87,
    "▲",
    {
        fontFamily: "Fredoka",
        fontSize: "30px",
        color: "#555555"
    }
)
.setOrigin(0.5)
.setScrollFactor(0);

jumpButton.on("pointerdown",(pointer)=>{

    this.jumpPointer = pointer.id;

    this.jumpPressed = true;

    jumpButton.setScale(.92);

});

jumpButton.on("pointerup",(pointer)=>{

    if(pointer.id === this.jumpPointer){

        this.jumpPressed = false;

        jumpButton.setScale(1);

    }

});

jumpButton.on("pointerupoutside",(pointer)=>{

    if(pointer.id === this.jumpPointer){

        this.jumpPressed = false;

        jumpButton.setScale(1);

    }

});

    }

    update() {

    const speed = 250;

    // LEFT
    if (
        this.cursors.left.isDown ||
        this.keyA.isDown ||
        this.moveLeft
    ) {

        this.player.body.setVelocityX(-speed);
        this.player.setFlipX(true);
    }

    // RIGHT
    else if (
        this.cursors.right.isDown ||
        this.keyD.isDown ||
        this.moveRight
    ) {

        this.player.body.setVelocityX(speed);
        this.player.setFlipX(false);

    }

    else {

        this.player.body.setVelocityX(0);

    }

    // JUMP
    if (

        (
            this.cursors.up.isDown ||
            this.keyW.isDown ||
            this.jumpPressed
        )

        &&

        this.player.body.blocked.down

    ) {

        this.player.body.setVelocityY(-500);

    }

    

}

}