import {Scene} from "phaser"

class pastWorld extends Scene{
	
	constructor(){
		super('past');
		this.speed = 250;
	}

	init(data)
    {
    	this.data = data;
    }

	preload ()
	{
		this.load.image('good_ground', 'assets/good_ground.jpg');
		this.load.image('museum', 'assets/museum.png');
		this.load.image("good_building", "assets/good_building.png");
		this.load.image("good_building2", "assets/good_building2.png");
		this.load.image("good_home", "assets/good_home.png");
		this.load.image("good_park", "assets/good_park.png");
		this.load.image("good_pool", "assets/good_pool.png");
		this.load.image("good_tree", "assets/good_tree.png");
		this.load.spritesheet('lila', 'assets/lila.png', { frameWidth: 64, frameHeight: 64});
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
		this.physics.add.collider(this.player, this.good_building);
		this.physics.add.collider(this.player, this.good_building2);
		this.physics.add.collider(this.player, this.good_tree);
		// this.physics.add.collider(this.player, this.good_home);
		this.physics.add.collider(this.player, this.good_park);
		this.physics.add.collider(this.player, this.good_pool);
		
		// Adding overlap
		this.physics.add.overlap(this.player, this.museum, this.goToPresentWorld, null, this);
		var classVar = this;
		this.good_home.children.iterate((child) => {
			classVar.physics.add.overlap(classVar.player, child, classVar.goToMaze, null, this);
		});
	}

	createGround(){
		this.good_ground = this.physics.add.staticGroup();
		this.good_ground.create(1000, 1000, 'good_ground');
	}

	createMuseum(){
		this.museum = this.physics.add.staticGroup();
		this.museum.create(1600, 1200, 'museum').setScale(0.8, 0.8).refreshBody();
	}

	createObjects(){
		this.Y = [400, 1200, 800, 2000, 1600, 0];
		this.good_building = this.physics.add.staticGroup();
		for(var i=0;i<6;i++){
			this.good_building.create(i*400, this.Y[i], 'good_building');
		}
		this.Y = [1200, 400, 2000, 800, 0, 1600];
		this.good_building2 = this.physics.add.staticGroup();
		for(var i=0;i<6;i++){
			this.good_building2.create(i*400, this.Y[i], 'good_building2');
		}
		this.Y = [1600, 2000, 1200, 0, 800, 400];
		this.good_tree = this.physics.add.staticGroup();
		for(var i=0;i<6;i++){
			this.good_tree.create(i*400, this.Y[i], 'good_tree');
		}
		this.Y = [800, 0, 1600, 400, 2000];
		this.good_home = this.physics.add.staticGroup();
		for(var i=0;i<5;i++){
			this.good_home.create(i*400, this.Y[i], 'good_home');
		}
		this.Y = [0, 800, 400, 1600, 2000, 1200];
		this.good_park = this.physics.add.staticGroup();
		for(var i=0;i<6;i++){
			this.good_park.create(i*400, this.Y[i], 'good_park');
		}
		this.Y = [2000, 1600, 0, 1200, 400, 800];
		this.good_pool = this.physics.add.staticGroup();
		for(var i=0;i<6;i++){
			this.good_pool.create(i*400, this.Y[i], 'good_pool');
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
			frames: this.anims.generateFrameNumbers('lila', { start: 104, end: 112 }),
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

	goToPresentWorld (player, museum){
		this.scene.start("present", {x: 1600, y:1000})
		this.scene.stop("past");
	}

	goToMaze (player, home){
		this.scene.start("maze");		
		this.scene.pause();
	}
}
export default pastWorld