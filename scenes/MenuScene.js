class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    preload() {

        
        this.load.image("heart","assets/heart.png");
    }

    create() {
        const graphics = this.add.graphics();

graphics.fillGradientStyle(
    0xffd6e7, // top left
    0xffd6e7, // top right
    0xffb7d5, // bottom left
    0xffb7d5, // bottom right
    1
);

graphics.fillRect(0, 0, 900, 600); 

        for(let i=0;i<40;i++){

    let heart=this.add.image(

        Phaser.Math.Between(0,900),

        Phaser.Math.Between(0,600),

        "heart"

    );

    heart.setScale(
        Phaser.Math.FloatBetween(0.15,0.35)
    );

    heart.setAlpha(
        Phaser.Math.FloatBetween(.3,.8)
    );

    this.tweens.add({

        targets:heart,

        y:heart.y-40,

        duration:Phaser.Math.Between(2500,4500),

        yoyo:true,

        repeat:-1,

        ease:"Sine.easeInOut"

    });

}

        this.add.rectangle(
    450,
    300,
    900,
    600,
    0xffc5d9,
    0.25
);

for(let i=0;i<70;i++){

let star=this.add.circle(

Phaser.Math.Between(0,900),

Phaser.Math.Between(0,600),

Phaser.Math.Between(1,3),

0xffffff,

0.6

);

this.tweens.add({

targets:star,

alpha:0.1,

duration:1000+Math.random()*2000,

repeat:-1,

yoyo:true

});

}

      let title = this.add.text(
    450,
    150,
    "Miniso's Diet Coke Hunt ️",
    {
        fontFamily: "Quicksand",
        fontSize: "64px",
        fontStyle: "600",
        color: "#803741",
        stroke: "#fd8bb7",
        strokeThickness: 10,
        shadow: {
            offsetX: 0,
            offsetY: 4,
            color: "#a32349",
            blur: 12,
            fill: true
        }
    }
).setOrigin(0.5);

this.tweens.add({
    targets: title,
    y: 145,
    duration: 1800,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut"
});

        this.add.text(
            450,
            250,
            "Mini baby is out of diet coke and she needs it before her momo's arrive. Use the on screen controls to control mini and make her run",
            {
                fontFamily: "Quicksand",
                fontSize:"16px",
                color:"#b91c3c"
            }
        ).setOrigin(.5);

       // Create rounded button
const buttonGraphics = this.add.graphics();

buttonGraphics.fillStyle(0xFF6B9D, 1);
buttonGraphics.fillRoundedRect(340, 385, 220, 70, 20);

buttonGraphics.lineStyle(3, 0xFFFFFF, 0.8);
buttonGraphics.strokeRoundedRect(340, 385, 220, 70, 20);

// Invisible hitbox
const button = this.add.zone(450, 420, 220, 70)
    .setInteractive({ useHandCursor: true });

// Button text
const buttonText = this.add.text(
    450,
    420,
    "Begin ❤️",
    {
        fontFamily: "Fredoka",
        fontSize: "28px",
        color: "#e6e2e8"
    }
).setOrigin(0.5);

// Hover animation
button.on("pointerover", () => {
    buttonGraphics.clear();

    buttonGraphics.fillStyle(0xFF82AF, 1);
    buttonGraphics.fillRoundedRect(340, 385, 220, 70, 20);

    buttonGraphics.lineStyle(3, 0xFFFFFF, 0.9);
    buttonGraphics.strokeRoundedRect(340, 385, 220, 70, 20);

    buttonText.setScale(1.05);
});

button.on("pointerout", () => {
    buttonGraphics.clear();

    buttonGraphics.fillStyle(0xFF6B9D, 1);
    buttonGraphics.fillRoundedRect(340, 385, 220, 70, 20);

    buttonGraphics.lineStyle(3, 0xFFFFFF, 0.8);
    buttonGraphics.strokeRoundedRect(340, 385, 220, 70, 20);

    buttonText.setScale(1);
});

button.on("pointerdown", () => {

    this.cameras.main.fadeOut(600, 255, 255, 255);

    this.time.delayedCall(600, () => {

        this.scene.start("Level1");

    });

});


    }

}

