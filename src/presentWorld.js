import {Scene} from "phaser"

class presentWorld extends Scene{
	
	constructor(){
		super('present');
		this.speed = 160;
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
		this.load.spritesheet('dude', 'assets/spr_fembase_walk_strip16.png', { frameWidth: 32, frameHeight: 64});
	}


	create ()
	{
		// Placing objects of the game
		this.createGround();
		this.createMuseum();
		this.createObjects();
		this.createPlayer();
		
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
		
		// Initial narrative text
		this.storyText = this.add.text(100, 500, 'Lila fears the world will no longer be green.\
		 The war has changed everything.\n A gloominess is wrapped around the atmosphere.\n \
		 Everyone is in their homes and there is a \n general lack of freedom. \
		 Lila \nis not happy with the current situation and she \n wishes to change it and \
		 hence she goes out exploring the world.\n', { fontSize: '32px', fill: '#0D3107' });
		setTimeout(() => {this.storyText.visible = false;}, 10000);
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
			this.bad_building2.create(i*400, this.Y[i], 'bad_building2');
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
		this.player = this.physics.add.sprite(400, 600, 'dude');
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		// Player animations
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 11 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'turn',
			frames: [ { key: 'dude', frame: 4 } ],
			frameRate: 20
		});
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'up',
			frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'down',
			frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
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
}
export default presentWorld