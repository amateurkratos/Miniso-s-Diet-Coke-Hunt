class MessageScene extends Phaser.Scene {

    constructor() {
        super("MessageScene");
    }

      preload(){

        this.load.image("photo1","assets/photo1.png");
        this.load.image("photo2","assets/photo2.png");

    }

    init(data){

        this.message = data.message;

        this.nextScene = data.nextScene;

        this.photo = data.photo;

    }

    create(){

      

        this.cameras.main.fadeIn(800,255,255,255);

        const bg = this.add.graphics();

        bg.fillGradientStyle(
            0xFFF7FB,
            0xFFF7FB,
            0xFFD6EA,
            0xFFD6EA,
            1
        );

        bg.fillRect(0,0,900,600);

        for(let i=0;i<25;i++){

    let heart=this.add.text(

        Phaser.Math.Between(0,900),

        Phaser.Math.Between(0,600),

        "❤",

        {

            fontSize:"20px",

            color:"#FF9BC4"

        }

    );

    heart.setAlpha(.35);

    this.tweens.add({

        targets:heart,

        y:heart.y-50,

        duration:Phaser.Math.Between(3000,5000),

        repeat:-1,

        yoyo:true

    });

}
const photo = this.add.image(
    450,
    120,
    this.photo
);

photo.setScale(0.22);

this.tweens.add({

    targets: photo,

    y: 112,

    duration: 1800,

    yoyo: true,

    repeat: -1,

    ease: "Sine.easeInOut"

});



       const messageText = this.add.text(

    450,

    400,

    "",

    {

        fontFamily:"Fredoka",

        fontSize:"32px",

        color:"#b21e45",

        align:"center",

        wordWrap:{
            width:700
        }

    }

).setOrigin(.5);

let index = 0;

this.time.addEvent({

    delay: 35,

    repeat: this.message.length - 1,

    callback: () => {

        messageText.setText(

            this.message.substring(0, index + 1)

        );

        index++;

    }

});
        // =========================
// CONTINUE BUTTON
// =========================

const buttonGraphics = this.add.graphics();

const drawButton = (color)=>{

    buttonGraphics.clear();

    // Shadow
    buttonGraphics.fillStyle(0x000000,0.15);
    buttonGraphics.fillRoundedRect(337,473,246,66,20);

    // Main button
    buttonGraphics.fillStyle(color,1);
    buttonGraphics.fillRoundedRect(335,470,250,70,20);

    // White outline
    buttonGraphics.lineStyle(3,0xffffff,0.8);
    buttonGraphics.strokeRoundedRect(335,470,250,70,20);

    // Gloss
    buttonGraphics.fillStyle(0xffffff,0.18);
    buttonGraphics.fillRoundedRect(350,480,220,15,10);

};

drawButton(0xFF6FA7);

const button = this.add.zone(
    460,
    505,
    250,
    70
).setInteractive({useHandCursor:true});

       const buttonText=this.add.text(

    460,

    505,

    "Continue",

    {

        fontFamily:"Fredoka",

        fontSize:"28px",

        color:"#ffffff"

    }

).setOrigin(.5);

        button.on("pointerover",()=>{

    drawButton(0xFF84B3);

    buttonText.setScale(1.05);

});

button.on("pointerout",()=>{

    drawButton(0xFF6FA7);

    buttonText.setScale(1);

});

button.on("pointerdown",()=>{

    buttonText.setScale(.94);

    this.time.delayedCall(90,()=>{

        buttonText.setScale(1);

        // Change this later to Level2
       this.scene.start(this.nextScene);

    });

});

    
    }

}