import {Scene} from "phaser"

class level2 extends Scene{

    constructor(){
        super("level2");
	}

    preload ()
    {
        this.load.image('darkfloor', 'assets/darkfloor.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('groundv', 'assets/platformv.png');
        this.load.image('officel', 'assets/leftoffice.png');
        this.load.image('officer', 'assets/rightoffice.png');
        this.load.image('door', 'assets/door.png');
        this.load.image('notice', 'assets/notice.jpg');
        this.load.image('guard', 'assets/guard.png');
        this.load.image('wall', 'assets/wall.jpg');
        this.load.image('couch1', 'assets/a5.png');
        this.load.image('couch2', 'assets/a6.png');
        this.load.image('couch3', 'assets/a7.png');
        this.load.image('recp', 'assets/recp.png');
        this.load.image('meeting', 'assets/meeting.png');
        this.load.image('meeting2', 'assets/a1.png');
        this.load.image('discuss', 'assets/a3.png');
        this.load.image('discuss2', 'assets/a2.png');
		this.load.image('car', 'assets/car.png');
		this.load.image('wall2', 'assets/wall2.png');
		this.load.image('table', 'assets/table.png');
		this.load.image('pool', 'assets/pool.png');
		this.load.image('vill2', 'assets/vill2.png');
		this.load.spritesheet('lila', 'assets/lila.png', { frameWidth: 64, frameHeight: 64});        
		this.load.spritesheet('player2', 'assets/pr.png', { frameWidth: 64, frameHeight: 64});        
    }
    
    create ()
    {
		this.speed = 160;
		this.speed = 160;
		this.dir = 0;
		this.check = 0;
		this.thre = [1320, 1550];

        this.createGround();
		this.createPlayer();
		this.createPlayer2();
		this.createOffice();
		this.cursors = this.input.keyboard.createCursorKeys();
		
		this.cameras.main.x = -260;
		this.cameras.main.y = -500;
        this.cameras.main.startFollow(this.player);
		this.cursors = this.input.keyboard.createCursorKeys();
		
		// Colliders
		this.physics.add.collider(this.player, this.officel);
		this.physics.add.collider(this.player, this.officer);
		this.physics.add.collider(this.player, this.door);
		this.physics.add.collider(this.player, this.door2, ()=>{this.check = 1});
        this.physics.add.collider(this.player, this.notice);
        this.physics.add.collider(this.player, this.guard);
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.collider(this.player, this.front);
        this.physics.add.collider(this.player, this.left);
        this.physics.add.collider(this.player, this.wall2);
        this.physics.add.collider(this.player, this.car);
    }

    createGround(){
		this.floor = this.physics.add.staticGroup();
		this.floor.create(410, 380, 'darkfloor');
	}

    createPlayer(){
		this.player = this.physics.add.sprite(742, 700, 'lila');
        this.player.setScale(0.8, 0.8);
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
	
	createPlayer2(){
		this.player2 = this.physics.add.sprite(1500, 775, 'player2');
        this.player2.setScale(1, 1);
        this.player2.setBounce(0.2);
		this.player2.setCollideWorldBounds(true);
		this.dir = 1;
		this.player2.setVelocityX(this.speed + 5);
		
		// Player2 animations
		this.anims.create({
			key: 'Player2left',
			frames: this.anims.generateFrameNumbers('player2', { start: 117, end: 125 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'Player2right',
			frames: this.anims.generateFrameNumbers('player2', { start: 143, end: 151 }),
			frameRate: 10,
			repeat: -1
		});

		this.player2.anims.play('Player2right', true);

    }

	createOffice() {
		this.Y = [];
		this.Y.push(400);
		for (var i = 0; i < 3; i++)
			this.Y.push(this.Y[i] - 280);
		this.officel = this.physics.add.staticGroup();
		for(var i=0;i<3;i+=2){
			this.officel.create(400, this.Y[i], 'officel').setScale(0.5, 0.5).refreshBody();
		}
		this.officer = this.physics.add.staticGroup();
		for(var i=0;i<3;i+=2){
			this.officel.create(742 + 342, this.Y[i], 'officer').setScale(0.5, 0.5).refreshBody();
		}
		this.door = this.physics.add.staticGroup();
		this.door.create(742, 850, 'door').setScale(0.5, 0.5).refreshBody();
		this.door2 = this.physics.add.staticGroup();
		this.door2.create(742 + 990, 860, 'door').setScale(0.8, 0.5).refreshBody();
		
		this.notice = this.physics.add.staticGroup();
		this.notice.create(742, -200, 'notice').setScale(0.3, 0.3).refreshBody();
		
		this.guard = this.physics.add.staticGroup();
		this.guard.create(742 - 100, -120, 'guard');	
		this.guard.create(742 + 100, -120, 'guard');
		
		this.wall = this.physics.add.staticGroup();
		this.wall.create(742 - 420, 720, 'wall').setScale(0.4, 1.45).refreshBody();	
		this.wall.create(742 + 420, 720, 'wall').setScale(0.4, 1.45).refreshBody();	
		this.wall.create(742 - 240, 900, 'wall').setScale(6, 0.1).refreshBody();	
		this.wall.create(742 + 230, 900, 'wall').setScale(6.2, 0.1).refreshBody();
		this.wall.create(742 + 660, 900, 'wall').setScale(8, 0.1).refreshBody();
		this.wall.create(742 + 745, -280, 'wall').setScale(11, 0.1).refreshBody();
		this.wall.create(742 + 1060, 300, 'wall').setScale(0.4, 4.4).refreshBody();
		
		this.front = this.physics.add.staticGroup();
		this.front.create(742 + 320, 810, 'couch1').setScale(0.4, 0.4).refreshBody();
		this.front.create(742 + 320, 610, 'couch2').setScale(0.4, 0.4).refreshBody();
		this.front.create(742 - 290, 780, 'recp').setScale(0.4, 0.4).refreshBody();
		this.front.create(742, -380, 'meeting').setScale(0.4, 0.4).refreshBody();
		
		this.left = this.physics.add.staticGroup();
		this.left.create(742 - 550, -130, 'meeting2').setScale(0.4, 0.5).refreshBody();
		this.left.create(742 - 500, 250, 'discuss').setScale(0.15, 0.15).refreshBody();
		this.left.create(742 - 570, 250, 'discuss').setScale(0.15, 0.15).refreshBody();
		this.left.create(742 - 550, 80, 'discuss2').setScale(0.3, 0.3).refreshBody();
		this.left.create(742 + 930, -140, 'discuss2').setScale(0.3, 0.3).refreshBody();
		this.left.create(742 + 750, -140, 'discuss2').setScale(0.3, 0.3).refreshBody();
		this.left.create(742 + 570, -140, 'discuss2').setScale(0.3, 0.3).refreshBody();
	
		this.car = this.physics.add.staticGroup();
		this.car.create(742 + 1000, 980, 'car').setScale(0.5, 0.5).refreshBody();

		this.wall2 = this.physics.add.staticGroup();
		this.wall2.create(742 + 645, 720, 'wall2').setScale(1, 1).refreshBody();
		this.wall2.create(742 + 550, 380, 'pool').setScale(1, 1).refreshBody();
		this.wall2.create(742 + 550, 600, 'table').setScale(0.9, 0.9).refreshBody();
	
		this.vill2 = this.physics.add.staticGroup();
		this.vill2.create(742 + 500, 780, 'vill2').setScale(0.4, 0.4).refreshBody();
	}

    update(){

		this.moveplayer2();
		this.checkExit();
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
	
	checkExit() {

		this.locx = 1626;
		this.locy = 740;
		console.log();
		if (this.player.x >= this.locx && this.player.y >= this.locy) {
			if (this.player2.body.velocity.x > 0) {
				this.scene.stop('level2');
				this.scene.start('textBox', {s: 'Lyla was never too careful.'});
				setTimeout(() => {
					this.scene.stop('textBox');
					this.scene.start("past", {x: 800, 
										  	  y: 600, 
										      lc: 1,
										       pastConverse: 1});
				}, 5000);
			}
		}
		if (this.check == 1) {
			this.scene.stop('level2');
			this.scene.start('textBox', {s: 'Aim for the sky.'});
			setTimeout(() => {
				this.scene.stop('textBox');
				this.scene.start("miniGame");
			}, 5000);
		}
	}

	moveplayer2() {
		if (this.dir == 1) {
			if (this.player2.x > this.thre[1]) {
				this.player2.setVelocityX(-this.speed-5);
				this.player2.anims.play('Player2left', true);
				this.dir = 0;
			}
		}
		else {
			if (this.player2.x < this.thre[0]) {
				this.player2.setVelocityX(this.speed+5);
				this.player2.anims.play('Player2right', true);
				this.dir = 1;
			}
		}
	}
}
export default level2