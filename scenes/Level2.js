class Level2 extends Phaser.Scene {

    constructor(){
        super("Level2");
    }

    preload(){

        this.load.image("coke","assets/coke.png");

    }

    create(){

        const width = this.scale.width;
const height = this.scale.height;

        this.input.addPointer(4);

        // =====================
        // PLAYER TEXTURE
        // =====================

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

        // =====================
        // SKY
        // =====================

        const bg=this.add.graphics();

        bg.fillGradientStyle(
            0xDDF5FF,
            0xDDF5FF,
            0xBEEBFF,
            0xBEEBFF,
            1
        );

        bg.fillRect(0,0,1800,600);

        // Clouds

        for(let i=0;i<12;i++){

            let cloud=this.add.container(

                Phaser.Math.Between(100,1700),

                Phaser.Math.Between(60,220)

            );

            cloud.add([

                this.add.circle(-30,0,22,0xffffff,.75),
                this.add.circle(0,-8,28,0xffffff,.75),
                this.add.circle(30,0,22,0xffffff,.75),
                this.add.circle(0,10,18,0xffffff,.75)

            ]);

            this.tweens.add({

                targets:cloud,

                x:cloud.x+120,

                duration:12000+Math.random()*5000,

                repeat:-1,

                yoyo:true

            });

        }

        // =====================
        // WORLD
        // =====================

        this.physics.world.setBounds(0,0,1800,600);

        this.ground=this.add.rectangle(
            900,
            590,
            1800,
            20,
            0xffffff,
            0
        );

        this.physics.add.existing(this.ground,true);

        // =====================
        // PLAYER
        // =====================

        this.player=this.physics.add.sprite(
            120,
            520,
            "girl"
        );

        this.player.setScale(1.35);

        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(
            this.player,
            this.ground
        );

        // =====================
        // PLATFORMS
        // =====================

        this.platforms=this.physics.add.staticGroup();

        const platform = (x, y, width) => {

    // Left puff
    this.add.circle(
        x - width/2 + 18,
        y,
        18,
        0xffffff
    );

    // Right puff
    this.add.circle(
        x + width/2 - 18,
        y,
        18,
        0xffffff
    );

    // Middle puffs
    for(let i = -width/2 + 35; i < width/2 - 20; i += 22){

        this.add.circle(
            x + i,
            y,
            18,
            0xffffff
        );

    }

    // Physics platform
    const hitbox = this.add.rectangle(
        x,
        y + 4,
        width,
        22,
        0xffffff,
        0
    );

    this.physics.add.existing(hitbox, true);

    this.platforms.add(hitbox);

};
    

      platform(280,470,150);

platform(520,380,130);

platform(820,300,140);

platform(620,380,120);

platform(980,180,120);

platform(1280,270,140);

platform(1540,190,120);

platform(1800,280,150);

platform(2080,200,140);

platform(2360,140,120);

platform(2640,240,150);

      
     for(let i=0;i<25;i++){

    let sparkle=this.add.circle(

        Phaser.Math.Between(150,1700),

        Phaser.Math.Between(80,350),

        Phaser.Math.Between(1,3),

        0xffffff,

        .6

    );

    this.tweens.add({

        targets:sparkle,

        alpha:.1,

        duration:800+Math.random()*1200,

        repeat:-1,

        yoyo:true

    });

}

        this.physics.add.collider(
            this.player,
            this.platforms
        );

        // =====================
        // COKE
        // =====================

        this.coke=this.physics.add.sprite(
            1600,
            170,
            "coke"
        );

        this.coke.setScale(1.2);

        this.coke.body.setAllowGravity(false);

        // =========================
// HEARTS AROUND THE COKE
// =========================

for(let i = 0; i < 12; i++){

    let heart = this.add.text(

        this.coke.x + Phaser.Math.Between(-45,45),

        this.coke.y + Phaser.Math.Between(-35,35),

        "❤",

        {

            fontFamily:"Fredoka",
            fontSize:"20px",
            color:"#FF4F9A"

        }

    );

    heart.setAlpha(0.85);

    this.tweens.add({

        targets: heart,

        y: heart.y - 20,

        alpha: 0,

        duration: 1200,

        delay: i * 120,

        repeat: -1,

        ease: "Sine.easeOut"

    });

}

        this.tweens.add({

            targets:this.coke,

            y:this.coke.y-10,

            duration:1200,

            repeat:-1,

            yoyo:true

        });

        this.physics.add.overlap(

            this.player,

            this.coke,

            ()=>{

                this.physics.pause();

                this.cameras.main.fadeOut(1000,255,255,255);

                this.time.delayedCall(1000,()=>{

                    this.scene.start("MessageScene",{

                        message:"Everyday I am so grateful of having someone as perfect as you with me, Its been an insane ride together and I lowk cant wait for more of it baby❤️",
                       
                        nextScene:"Level3",

                        photo:"photo2"
                    });

                });

            }

        );

        // =====================
        // CAMERA
        // =====================

        this.cameras.main.startFollow(this.player);

        this.cameras.main.setBounds(
            0,
            0,
            1800,
            600
        );

        // =====================
        // CONTROLS
        // =====================

        this.cursors=this.input.keyboard.createCursorKeys();

        this.keyA=this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        );

        this.keyD=this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        );

        this.keyW=this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.W
        );

        // ==========================
// MOBILE CONTROLS
// ==========================

this.moveLeft = false;
this.moveRight = false;
this.jumpPressed = false;

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

const rightButton=this.add.circle(
   width * 0.17,
    height * 0.87,
    35,
    0xffffff,
    .35
)
.setScrollFactor(0)
.setInteractive({useHandCursor:true});

this.add.text(
   width * 0.17,
    height * 0.87,
    "▶",
    {
        fontFamily:"Fredoka",
        fontSize:"30px",
        color:"#555555"
    }
)
.setOrigin(.5)
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

const jumpButton=this.add.circle(
    width * 0.92,
    height * 0.87,
    40,
    0xffffff,
    .35
)
.setScrollFactor(0)
.setInteractive({useHandCursor:true});

this.add.text(
    width * 0.92,
    height * 0.87,
    "▲",
    {
        fontFamily:"Fredoka",
        fontSize:"30px",
        color:"#555555"
    }
)
.setOrigin(.5)
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

    update(){

    const speed = 250;

    // LEFT
    if(
        this.cursors.left.isDown ||
        this.keyA.isDown ||
        this.moveLeft
    ){

        this.player.setVelocityX(-speed);
        this.player.setFlipX(true);

    }

    // RIGHT
    else if(
        this.cursors.right.isDown ||
        this.keyD.isDown ||
        this.moveRight
    ){

        this.player.setVelocityX(speed);
        this.player.setFlipX(false);

    }

    else{

        this.player.setVelocityX(0);

    }

    // JUMP
    if(

        (
            this.cursors.up.isDown ||
            this.keyW.isDown ||
            this.jumpPressed
        )

        &&

        this.player.body.blocked.down

    ){

        this.player.setVelocityY(-500);

    }

}
    }

