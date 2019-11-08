import {Scene} from "phaser"

class end extends Scene{

    constructor(){
        super("end");
    }

    preload ()
    {
        this.load.image('ending', 'assets/ending.png');
        this.load.image('play', 'assets/play.png');
    }
    
    create ()
    {
        var ending = this.add.image(600, 300, 'ending');
        var sprite = this.add.sprite(600, 500, 'play').setScale(0.6, 0.6).setInteractive();
        sprite.on('pointerover', function (event) {
            this.setTint(0xff0fff);
        });
        sprite.on('pointerout', function (event) {
            this.clearTint();
        });

        var tempThis = this;
        sprite.on('pointerdown', function (event) {
            tempThis.scene.stop('end');
            tempThis.scene.start('textBox', {s: 'Lyla fears that the world has gone into darkness, the war has made everything gloomy, she wants to go back to a normal life. The kind that her parents and their parents lived. Can she do something about it?\nHer grandpa seems to know a lot about the war.\nShe\'d like to meet him.'});
            setTimeout(() => {
                tempThis.scene.stop('textBox');
                tempThis.scene.start("present", {x: 400, 
                                            y: 600, 
                                            lc: 0, 
                                            firstTime: 0,
                                            pastConverse: 0,
                                            presentConverse: 0});
            }, 20000);
        });
    }
}
export default end