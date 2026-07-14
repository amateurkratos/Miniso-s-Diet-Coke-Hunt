const config = {

    type: Phaser.AUTO,

    parent: "game",

    width: 900,
height: 600,

scale:{

    mode: Phaser.Scale.FIT,

    autoCenter: Phaser.Scale.CENTER_BOTH

},
    backgroundColor: "#F8DCC8",

    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 800
            },
            debug: false
        }
    },

    scene: [
        MenuScene,
        Level1,
        MessageScene,
        Level2,
        Level3,
        EndingScene,
    ]

};

new Phaser.Game(config);