class EndingScene extends Phaser.Scene{

    constructor(){
        super("EndingScene");
    }

    preload(){

        this.load.image("photo3","assets/photo3.png");
    

    }

    create(){


      // ======================
// BACKGROUND
// ======================

const bg = this.add.graphics();

bg.fillGradientStyle(
    0xFFF8FC,
    0xFFF8FC,
    0xFFD6EA,
    0xFFD6EA,
    1
);

bg.fillRect(0,0,900,600);

// ======================
// FLOATING HEARTS
// ======================

for(let i=0;i<35;i++){

    let heart=this.add.text(

        Phaser.Math.Between(0,900),

        Phaser.Math.Between(600,900),

        "❤",

        {

            fontSize:"20px",

            color:"#FF82B8"

        }

    );

    heart.setAlpha(.3);

    this.tweens.add({

        targets:heart,

        y:-100,

        duration:7000+Math.random()*3000,

        repeat:-1,

        delay:Math.random()*4000

    });

}

// ======================
// TITLE
// ======================

const title=this.add.text(

450,

40,

"Happy 6 Months Love",

{

fontSize:"46px",

color:"#D63384",

fontStyle:"bold"

}

).setOrigin(.5);

title.setAlpha(0);

this.tweens.add({

targets:title,

alpha:1,

duration:1500

});

// ======================
// PHOTO
// ======================

// ======================
// PHOTO FRAME
// ======================

this.add.rectangle(
    450,
    190,
    210,
    210,
    0xffffff
)
.setStrokeStyle(4,0xFFD3E6);

const photo=this.add.image(
    450,
    190,
    "photo3"
);

photo.setScale(0.15);

photo.setAlpha(0);

this.tweens.add({

    targets:photo,

    alpha:1,

    duration:1500,

    delay:600

});


// ======================
// MESSAGE
// ======================

const finalText=this.add.text(

450,

430,

"",

{

fontSize:"18px",

align:"center",

color:"#7A2B52",

wordWrap:{width:700}

}

).setOrigin(.5);

const message=

`These six months have genuinely been

the happiest months of my life baby like actually.

Thank you for every laugh,

every late ass night we had together,

every dumb conversation abt water bottles,

and every moment we've shared together.

Happy 6 Months,

my adorable baby ❤️

I love you.`;

let i=0;

this.time.addEvent({

delay:35,

repeat:message.length-1,

callback:()=>{

finalText.setText(

message.substring(0,i+1)

);

i++;

}

});

// ======================
// LITTLE FOOTER
// ======================

this.add.text(

450,

575,

"Made by a retard who took wayyy too long to figure it out",

{

fontSize:"16px",

color:"#AA5577"

}

).setOrigin(.5);

    }

}