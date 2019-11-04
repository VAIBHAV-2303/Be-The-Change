import 'phaser';
import presentWorld from "./presentWorld"
import maze from "./maze"

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 2000,
    height: 2000,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [{
        preload: preload,
        create: create
    }, presentWorld, maze],
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('logo', 'assets/logo.png');
}

function create ()
{
    var logo = this.add.image(400, 150, 'logo');
    this.input.on('pointerdown', () => {
        this.scene.start('present');
    })
    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

}
