import 'phaser';
import presentWorld from "./presentWorld"
import pastWorld from "./pastWorld"
import maze from "./maze"

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 2000,
    height: 2000,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [{
        preload: preload,
        create: create
    }, 
    presentWorld, 
    pastWorld, 
    maze],
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('logo', 'assets/logo.png');
    this.load.image('play', 'assets/play.png');
}

function create ()
{
    var logo = this.add.image(400, 150, 'logo');

    var sprite = this.add.sprite(900, 300, 'play').setInteractive();
    sprite.on('pointerover', function (event) {
        this.setTint(0xff0fff);
    });
    sprite.on('pointerout', function (event) {
        this.clearTint();
    });
    sprite.on('pointerdown', function (event) {
        game.scene.start("present", {x: 400, y: 600});
        game.scene.stop("default");
    });

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

}
