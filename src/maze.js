import {Scene} from "phaser"

class maze extends Scene{

    constructor(){
        super('maze');
    }

    preload ()
    {
        this.load.image('floor', 'assets/floor.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('groundv', 'assets/platformv.png');
    }
    
    create ()
    {
        this.add.image(920, 480, 'floor');
        this.platforms = this.physics.add.staticGroup();
        
        // Creatin the maze
        this.platforms.create(530, 460, 'groundv').setScale(0.5, 1.7).refreshBody();
        this.platforms.create(802, 120, 'ground').setScale(1.4, 0.5).refreshBody();
        this.platforms.create(1280, 120, 'ground').setScale(0.2, 0.5).refreshBody();
        this.platforms.create(1312, 468.1, 'groundv').setScale(0.5, 1.7).refreshBody();
        this.platforms.create(562, 805, 'ground').setScale(0.2, 0.5).refreshBody();
        this.platforms.create(1020, 805, 'ground').setScale(1.5, 0.5).refreshBody();
        this.platforms.create(572, 405, 'ground').setScale(0.25, 0.5).refreshBody();
        this.platforms.create(620, 477, 'groundv').setScale(0.5, 0.4).refreshBody();
        this.platforms.create(620, 210, 'groundv').setScale(0.5, 0.45).refreshBody();
        this.platforms.create(620, 680, 'groundv').setScale(0.5, 0.2).refreshBody();
        this.platforms.create(672, 292, 'ground').setScale(0.25, 0.5).refreshBody();
        this.platforms.create(672, 549, 'ground').setScale(0.25, 0.5).refreshBody();
        this.platforms.create(720, 581, 'groundv').setScale(0.5, 0.2).refreshBody();
        this.platforms.create(720, 160, 'groundv').setScale(0.5, 0.2).refreshBody();
        this.platforms.create(720, 772, 'groundv').setScale(0.55, 0.2).refreshBody();
        this.platforms.create(720, 680, 'ground').setScale(0.5, 0.5).refreshBody();
        this.platforms.create(800, 740, 'ground').setScale(0.4, 0.5).refreshBody();
        this.platforms.create(810, 440, 'ground').setScale(0.4, 0.5).refreshBody();
        this.platforms.create(810, 300, 'groundv').setScale(0.55, 0.4).refreshBody();
        this.platforms.create(920, 300, 'ground').setScale(0.55, 0.4).refreshBody();
        this.platforms.create(920, 300, 'ground').setScale(0.55, 0.4).refreshBody();
        this.platforms.create(920, 227, 'ground').setScale(0.55, 0.4).refreshBody();
        this.platforms.create(1000, 168, 'groundv').setScale(0.55, 0.28).refreshBody();
        this.platforms.create(1160, 260, 'groundv').setScale(0.55, 0.7).refreshBody();
        this.platforms.create(1160, 260, 'groundv').setScale(0.55, 0.7).refreshBody();
        this.platforms.create(810, 520, 'groundv').setScale(0.55, 0.4).refreshBody();
        this.platforms.create(1040, 680, 'ground').setScale(0.55, 0.5).refreshBody();
        this.platforms.create(920, 592, 'ground').setScale(0.55, 0.5).refreshBody();
        this.platforms.create(1109, 392, 'ground').setScale(0.3, 0.5).refreshBody();
        this.platforms.create(1058, 460, 'groundv').setScale(0.55, 0.3).refreshBody();
        this.platforms.create(1007, 512, 'ground').setScale(0.3, 0.5).refreshBody();
        this.platforms.create(956, 450, 'groundv').setScale(0.55, 0.35).refreshBody();
        this.platforms.create(885, 418, 'groundv').setScale(0.55, 0.15).refreshBody();
        this.platforms.create(920, 385, 'ground').setScale(0.22, 0.5).refreshBody();
        this.platforms.create(1180, 555, 'ground').setScale(0.24, 0.5).refreshBody();
        this.platforms.create(1180, 555, 'groundv').setScale(0.55, 0.4).refreshBody();
    }
}
export default maze