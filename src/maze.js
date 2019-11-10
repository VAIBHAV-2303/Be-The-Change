import {Scene} from "phaser"

class maze extends Scene{

    constructor(){
        super("maze");
    }

    preload ()
    {
        this.load.image('floor', 'assets/floor.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('groundv', 'assets/platformv.png');
        this.load.image('drill', 'assets/drill.png');
        this.load.image('bicycle', 'assets/bicycle.png');
		this.load.spritesheet('lila', 'assets/lila.png', { frameWidth: 64, frameHeight: 64});        
		this.load.spritesheet('vill', 'assets/vill.png', { frameWidth: 64, frameHeight: 64});        
    }
    
    create ()
    {
        this.speed = 160;
        this.movement = [630, 360, 550, 580, 345, 683]
        this.change_dir = 0

        var shiftx = 510;
        var shifty = 100;
        this.add.image(920 - shiftx, 480 - shifty, 'floor');
        
        // Creating the maze        
        shifty = 85;
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(530 - shiftx, 460 - shifty, 'groundv').setScale(0.5, 1.7).refreshBody();
        this.platforms.create(802 - shiftx, 120 - shifty, 'ground').setScale(1.4, 0.5).refreshBody();
        this.platforms.create(1280 - shiftx, 120 - shifty, 'ground').setScale(0.2, 0.5).refreshBody();
        this.platforms.create(1312 - shiftx, 468.1 - shifty, 'groundv').setScale(0.5, 1.7).refreshBody();
        this.platforms.create(562 - shiftx, 805 - shifty, 'ground').setScale(0.2, 0.5).refreshBody();
        this.platforms.create(1020 - shiftx, 805 - shifty, 'ground').setScale(1.5, 0.5).refreshBody();
        this.platforms.create(572 - shiftx, 405 - shifty, 'ground').setScale(0.25, 0.5).refreshBody();
        this.platforms.create(620 - shiftx, 477 - shifty, 'groundv').setScale(0.5, 0.4).refreshBody();
        this.platforms.create(620 - shiftx, 210 - shifty, 'groundv').setScale(0.5, 0.45).refreshBody();
        this.platforms.create(620 - shiftx, 680 - shifty, 'groundv').setScale(0.5, 0.2).refreshBody();
        this.platforms.create(672 - shiftx, 292 - shifty, 'ground').setScale(0.25, 0.5).refreshBody();
        this.platforms.create(672 - shiftx, 549 - shifty, 'ground').setScale(0.25, 0.5).refreshBody();
        this.platforms.create(720 - shiftx, 581 - shifty, 'groundv').setScale(0.5, 0.2).refreshBody();
        this.platforms.create(720 - shiftx, 160 - shifty, 'groundv').setScale(0.5, 0.2).refreshBody();
        this.platforms.create(720 - shiftx, 772 - shifty, 'groundv').setScale(0.55, 0.2).refreshBody();
        this.platforms.create(720 - shiftx, 680 - shifty, 'ground').setScale(0.5, 0.5).refreshBody();
        this.platforms.create(800 - shiftx, 740 - shifty, 'ground').setScale(0.4, 0.5).refreshBody();
        this.platforms.create(810 - shiftx, 440 - shifty, 'ground').setScale(0.4, 0.5).refreshBody();
        this.platforms.create(810 - shiftx, 300 - shifty, 'groundv').setScale(0.55, 0.4).refreshBody();
        this.platforms.create(920 - shiftx, 300 - shifty, 'ground').setScale(0.55, 0.4).refreshBody();
        this.platforms.create(920 - shiftx, 300 - shifty, 'ground').setScale(0.55, 0.4).refreshBody();
        this.platforms.create(920 - shiftx, 227 - shifty, 'ground').setScale(0.55, 0.4).refreshBody();
        this.platforms.create(1000 - shiftx, 168 - shifty, 'groundv').setScale(0.55, 0.28).refreshBody();
        this.platforms.create(1160 - shiftx, 260 - shifty, 'groundv').setScale(0.55, 0.7).refreshBody();
        this.platforms.create(1160 - shiftx, 260 - shifty, 'groundv').setScale(0.55, 0.7).refreshBody();
        this.platforms.create(810 - shiftx, 520 - shifty, 'groundv').setScale(0.55, 0.4).refreshBody();
        this.platforms.create(1040 - shiftx, 680 - shifty, 'ground').setScale(0.55, 0.5).refreshBody();
        this.platforms.create(920 - shiftx, 592 - shifty, 'ground').setScale(0.55, 0.5).refreshBody();
        this.platforms.create(1109 - shiftx, 392 - shifty, 'ground').setScale(0.3, 0.5).refreshBody();
        this.platforms.create(1058 - shiftx, 460 - shifty, 'groundv').setScale(0.55, 0.3).refreshBody();
        this.platforms.create(1007 - shiftx, 512 - shifty, 'ground').setScale(0.3, 0.5).refreshBody();
        this.platforms.create(956 - shiftx, 450 - shifty, 'groundv').setScale(0.55, 0.35).refreshBody();
        this.platforms.create(885 - shiftx, 418 - shifty, 'groundv').setScale(0.55, 0.15).refreshBody();
        this.platforms.create(920 - shiftx, 385 - shifty, 'ground').setScale(0.22, 0.5).refreshBody();
        this.platforms.create(1180 - shiftx, 555 - shifty, 'ground').setScale(0.24, 0.5).refreshBody();
        this.platforms.create(1180 - shiftx, 555 - shifty, 'groundv').setScale(0.55, 0.4).refreshBody();
    
        this.createPlayer();        
        this.createVill();
        this.bicycle = this.physics.add.staticGroup();
        this.bicycle.create(610, 50, 'bicycle').setScale(0.17, 0.17).refreshBody();
        this.drill = this.physics.add.staticGroup();
        this.drill.create(690, 50, 'drill').setScale(0.15, 0.15).refreshBody();

        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Colliders
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.vill, this.platforms);
		this.physics.add.collider(this.vill, this.player);                        
    
        // Overlap function
        this.physics.add.overlap(this.player, this.bicycle, this.goodJob, null, this);
        this.physics.add.overlap(this.player, this.drill, this.badJob, null, this);
        this.physics.add.overlap(this.vill, this.drill, this.badJob, null, this);
    }

    goodJob(){
        this.scene.stop("maze");
        this.scene.start('textBox', {s: 'Seems like Lyla just got a new access card.'});
        setTimeout(() => {
            this.scene.stop('textBox');
            this.scene.start("past", {x: 800, 
                                      y: 1000, 
                                      lc: 1,
                                      pastConverse: 1});
        }, 5000);
    }

    badJob(){
        this.scene.stop("maze");
        this.scene.start('textBox', {s: 'The hardest choices require the strongest will.'});
        setTimeout(() => {
            this.scene.stop('textBox');
            this.scene.start("past", {x: 800, 
                                      y: 1000, 
                                      lc: 0,
                                      pastConverse: 1});
        }, 5000);   
    }

    createPlayer(){
		this.player = this.physics.add.sprite(120, 700, 'lila');
        this.player.setScale(0.6, 0.6);
        this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		// Player animations
		this.anims.create({
			key: 'Pleft',
			frames: this.anims.generateFrameNumbers('lila', { start: 117, end: 125 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'Pturn',
			frames: [ { key: 'lila', frame: 0 } ],
			frameRate: 10
		});
		this.anims.create({
			key: 'Pright',
			frames: this.anims.generateFrameNumbers('lila', { start: 143, end: 151 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'Pup',
			frames: this.anims.generateFrameNumbers('lila', { start: 104, end: 112 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'Pdown',
			frames: this.anims.generateFrameNumbers('lila', { start: 130, end: 138 }),
			frameRate: 10,
			repeat: -1
        });
    }

    createVill(){
        this.vill = this.physics.add.sprite(160, 700, 'vill');
        this.vill.setScale(0.55, 0.55);
        this.vill.setBounce(0.2);
        this.vill.setCollideWorldBounds(true);

        // Villian animations
        this.anims.create({
            key: 'Vright',
            frames: this.anims.generateFrameNumbers('vill', { start: 143, end: 151 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'Vup',
            frames: this.anims.generateFrameNumbers('vill', { start: 104, end: 112 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(){

        // Automated villian movement
        this.villMove();
        
        // Defining player movement functions
		if (this.cursors.right.isDown){	
			this.player.setVelocityX(this.speed);
			this.player.setVelocityY(0);
			this.player.anims.play('Pright', true);
		}else if(this.cursors.left.isDown){
			this.player.setVelocityX(-this.speed);
			this.player.setVelocityY(0);
			this.player.anims.play('Pleft', true);
		}else if(this.cursors.up.isDown){
			this.player.setVelocityY(-this.speed);
			this.player.setVelocityX(0);
			this.player.anims.play('Pup', true);
		}else if(this.cursors.down.isDown){
			this.player.setVelocityY(this.speed);
			this.player.setVelocityX(0);
			this.player.anims.play('Pdown', true);	
		}else{
			this.player.setVelocityX(0);
			this.player.setVelocityY(0);
			this.player.anims.play('Pturn');
        }
    }

    villMoveUp(){
        this.vill.setVelocityY(-0.7*this.speed);
    }

    villMoveRight(){
        this.vill.setVelocityX(0.7*this.speed);
    }

    villMove(){
        if (this.change_dir % 2 == 0) {
            this.villMoveUp();
            if (this.vill.y < this.movement[this.change_dir]) {
                this.change_dir += 1;
                this.vill.setVelocityY(0);
                this.vill.anims.play('Vright', true);
            }
        }
        else {
            this.villMoveRight();
            if (this.vill.x > this.movement[this.change_dir]) {
                this.change_dir += 1;
                this.vill.setVelocityX(0);
                this.vill.anims.play('Vup', true);
            }
        }
    }
}
export default maze