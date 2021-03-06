import {Scene} from "phaser"
import Demo from "./box"

class presentWorld extends Scene{
	
	constructor(){
		super('present');
		this.speed = 250;
	}

	init(data){
    	this.data = data;
    }

	preload ()
	{
		this.load.image('bad_ground', 'assets/bad_ground.jpg');
		this.load.image('museum', 'assets/museum.png');
		this.load.image("bad_building", "assets/bad_building.png");
		this.load.image("bad_building2", "assets/bad_building2.png");
		this.load.image("bad_home", "assets/bad_home.png");
		this.load.image("bad_park", "assets/bad_park.png");
		this.load.image("bad_pool", "assets/bad_pool.png");
		this.load.image("bad_tree", "assets/bad_tree.png");
		this.load.image("good_home", "assets/good_home.png");
		this.load.spritesheet('lila', 'assets/lila.png', { frameWidth: 64, frameHeight: 64});
	}

	create ()
	{
		// Placing objects of the game
		this.createGround();
		this.createMuseum();
		this.createObjects();
		this.createPlayer();
		this.createGrandpaHome();
		
		// Adjusting camera so that it follows the player
		this.cameras.main.x = -500;
		this.cameras.main.y = -500;
		this.cameras.main.startFollow(this.player);
		this.cursors = this.input.keyboard.createCursorKeys();

		// Adding colliders
		this.physics.add.collider(this.player, this.bad_building);
		this.physics.add.collider(this.player, this.bad_building2);
		this.physics.add.collider(this.player, this.bad_tree);
		this.physics.add.collider(this.player, this.bad_home);
		this.physics.add.collider(this.player, this.bad_park);
		this.physics.add.collider(this.player, this.bad_pool);

		// Overlap functions
    	this.physics.add.overlap(this.player, this.museum, this.goToPastWorld, null, this);
    	this.physics.add.overlap(this.player, this.grandpaHome, this.talk, null, this);	
	}

	talk(){
		this.scene.stop('present');
		if(this.data.presentConverse==0){
			this.scene.start('textBox', {s: 'Lyla: Grandpa!\
										\nGrandpa: Ahhh! its been long.\
										\nLyla: You know why I came here.\
										\nGrandpa: Let me guess, you hate school?\
										\nLyla: Not just school, I hate it here! Its not like your childhood. Your stories were different\n, happier!\
										\nGrandpa: Its the war, Everything has changed, it ...\
										\nLyla: Well, I want to change it.\
										\nGrandpa: Wouldn\'t that be amazing, but if only it was that easy.\
										\nLyla: If I could just go back and change a few things, set Everything on the right path.\
										\nGrandpa: Take this card, you\'ll know when to meet me next.'});
			setTimeout(() => {
				this.scene.stop('textBox');
				this.scene.start("present", {x: 2000, 
										  y: 1400, 
										  lc: 0, 
										  firstTime: 0,
										  presentConverse: 1,
										  pastConverse: 0});
			}, 35000);
		}
		else{
			this.scene.start('textBox', {s: 'Lyla knows exactly what she needs to know.'});
			setTimeout(() => {
				this.scene.stop('textBox');
				this.scene.start("present", {x: 2000, 
										  y: 1400, 
										  lc: this.data.lc, 
										  firstTime: this.data.firstTime,
										  presentConverse: 1,
										  pastConverse: this.data.pastConverse});
			}, 3000);
		}
	}

	createGrandpaHome(){
		this.grandpaHome = this.physics.add.staticGroup();
		this.grandpaHome.create(2000, 1600, 'good_home');
	}

	createGround(){
		this.bad_ground = this.physics.add.staticGroup();
		this.bad_ground.create(1000, 1000, 'bad_ground');
	}

	createMuseum(){
		this.museum = this.physics.add.staticGroup();
		this.museum.create(1600, 1200, 'museum').setScale(0.8, 0.8).refreshBody();
	}

	createObjects(){
		this.Y = [400, 1200, 800, 2000, 1600, 0];
		this.bad_building = this.physics.add.staticGroup();
		for(var i=0;i<6;i++){
			this.bad_building.create(i*400, this.Y[i], 'bad_building');
		}
		this.Y = [1200, 400, 2000, 800, 0, 1600];
		this.bad_building2 = this.physics.add.staticGroup();
		for(var i=0;i<6;i++){
			if(i!=5){
				this.bad_building2.create(i*400, this.Y[i], 'bad_building2');
			}
		}
		this.Y = [1600, 2000, 1200, 0, 800, 400];
		this.bad_tree = this.physics.add.staticGroup();
		for(var i=0;i<6;i++){
			this.bad_tree.create(i*400, this.Y[i], 'bad_tree');
		}
		this.Y = [800, 0, 1600, 400, 2000];
		this.bad_home = this.physics.add.staticGroup();
		for(var i=0;i<5;i++){
			this.bad_home.create(i*400, this.Y[i], 'bad_home');
		}
		this.Y = [0, 800, 400, 1600, 2000, 1200];
		this.bad_park = this.physics.add.staticGroup();
		for(var i=0;i<6;i++){
			this.bad_park.create(i*400, this.Y[i], 'bad_park');
		}
		this.Y = [2000, 1600, 0, 1200, 400, 800];
		this.bad_pool = this.physics.add.staticGroup();
		for(var i=0;i<6;i++){
			this.bad_pool.create(i*400, this.Y[i], 'bad_pool');
		}
	}

	createPlayer(){
		this.player = this.physics.add.sprite(this.data.x, this.data.y, 'lila');
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		// Player animations
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('lila', { start: 117, end: 125 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'turn',
			frames: [ { key: 'lila', frame: 0 } ],
			frameRate: 10
		});
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('lila', { start: 143, end: 151 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'up',
			frames: this.anims.generateFrameNumbers('lila', { start: 104, end: 112 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'down',
			frames: this.anims.generateFrameNumbers('lila', { start: 130, end: 138 }),
			frameRate: 10,
			repeat: -1
		});
	}

	update(){
		// Defining player movement functions
		if (this.cursors.right.isDown){	
			this.player.setVelocityX(this.speed);
			this.player.setVelocityY(0);
			this.player.anims.play('right', true);
		}else if(this.cursors.left.isDown){
			this.player.setVelocityX(-this.speed);
			this.player.setVelocityY(0);
			this.player.anims.play('left', true);
		}else if(this.cursors.up.isDown){
			this.player.setVelocityY(-this.speed);
			this.player.setVelocityX(0);
			this.player.anims.play('up', true);
		}else if(this.cursors.down.isDown){
			this.player.setVelocityY(this.speed);
			this.player.setVelocityX(0);
			this.player.anims.play('down', true);	
		}else{
			this.player.setVelocityX(0);
			this.player.setVelocityY(0);
			this.player.anims.play('turn');
		}
	}

	goToPastWorld (player, museum)
	{
		this.scene.stop("present");
		if(this.data.presentConverse==1){
			if(this.data.firstTime==0){
				this.scene.start('textBox', {s: 'What?! A working time machine, it seems Lyla has travelled back in time, to a time before the war.'});
				setTimeout(() => {
					this.scene.stop('textBox');
					this.scene.start("past", {x: 1600, 
											  y: 1000, 
											  lc: 0,
											  pastConverse: 0});
				}, 6000);
			}
			else{
				console.log(this.data.lc);
				this.scene.start("past", {x: 1600, 
										  y: 1000, 
										  lc: this.data.lc,
										  pastConverse: this.data.pastConverse});
			}
		}
		else{
			this.scene.start('textBox', {s:'Its locked, Lyla needs a card to enter.'});
			setTimeout(() => {
				this.scene.stop('textBox');
				this.scene.start("present", {x: 1600, 
										  y: 1000, 
										  lc: 0, 
										  firstTime: 0,
										  presentConverse: 0,
										  pastConverse: 0});
			}, 3000);
		}
	}
}
export default presentWorld