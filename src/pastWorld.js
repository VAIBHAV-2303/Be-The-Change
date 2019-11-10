import {Scene} from "phaser"
import 'phaser';

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
		this.load.image("guard", "assets/guard.png");
		this.load.spritesheet('lila', 'assets/lila.png', { frameWidth: 64, frameHeight: 64});
	}

	create ()
	{
		// Placing objects of the game
		this.createGround();
		this.createMuseum();
		this.createObjects();
		this.createPlayer();
		this.createLevel1();
		this.createLevel2();
		this.createGrandpaHome();
		
		// Adjusting camera so that it follows the player
		this.cameras.main.x = -500;
		this.cameras.main.y = -500;
		this.cameras.main.startFollow(this.player);
		this.cursors = this.input.keyboard.createCursorKeys();

		// Adding colliders
		this.physics.add.collider(this.player, this.good_building);
		this.physics.add.collider(this.player, this.good_building2);
		this.physics.add.collider(this.player, this.good_tree);
		this.physics.add.collider(this.player, this.good_home);
		this.physics.add.collider(this.player, this.good_park);
		this.physics.add.collider(this.player, this.good_pool);	
		this.physics.add.collider(this.player, this.guards, () => {
			this.scene.stop("past");
			this.scene.start('textBox', {s: 'Guard: You\'re not supposed to be here.\nSeems like Lyla need to find another way in.'});
			setTimeout(() => {
						this.scene.stop('textBox');
						this.scene.start("past", {x: 800,
												  y: 1000,
												  lc: this.data.lc,
												  pastConverse: this.data.pastConverse});
						}, 5000);	
		});
		
		// Adding overlap
		this.physics.add.overlap(this.player, this.museum, this.goToPresentWorld, null, this);
		this.physics.add.overlap(this.player, this.level1, this.goToMaze, null, this);
		this.physics.add.overlap(this.player, this.level2, this.goToOffice, null, this);		
		this.physics.add.overlap(this.player, this.grandpaHome, this.talk, null, this);	
	}

	talk(){
		this.scene.stop('past');
		if(this.data.pastConverse==0){
			this.scene.start('textBox', {s: 'Lyla: It worked!\
										\nGrandpa: What worked and who are you?\
										\nLyla: I am your GrandDaughter, from future.\
										\nGrandpa: I dont believe this.\
										\nLyla: I came here to stop the War!\
										\nGrandpa: What war are you talking about? Look around you.\
										\nLyla: You promised me! I came here to bring Peace in my time. I will do it with or without you!\
										\nGrandpa: Calm! I know about the war, just needed to be sure about you. We are working, but we still don\'t know the real cause.\
										\nLyla: Give me a start, I could bring some intel.\
										\nGrandpa: Lieutenant Singh is going to delay his shipment for some inside reasons, I can\'t be compromised, they know me, Find the Breach. Take this card!\n'});
			setTimeout(() => {
				this.scene.stop('textBox');
				this.scene.start("past", {x: 2000, 
										  y: 1400, 
										  lc: 0, 
										  pastConverse: 1});
			}, 40000);
		}
		else if(this.data.pastConverse==1){
			this.scene.start('textBox', {s: 'Grandpa has told me enough.'});
			setTimeout(() => {
				this.scene.stop('textBox');
				this.scene.start("past", {x: 2000, 
										  y: 1400, 
										  lc: this.data.lc, 
										  pastConverse: 1});
			}, 3000);
		}
		else{
			this.scene.start('textBox', {s: 'Lyla: You\'re a genius grandpa. We stopped the war.\
											\nGrandpa: What war are you talking about? Look around you.\
											\nThe End.'});
			setTimeout(() => {
				this.scene.stop('textBox');
				this.scene.start("end");
			}, 10000);
		}
	}

	createGrandpaHome(){
		this.grandpaHome = this.physics.add.staticGroup();
		this.grandpaHome.create(2000, 1600, 'good_home');
	}

	createLevel1(){
		this.level1 = this.physics.add.staticGroup();
		this.level1.create(800, 800, 'good_building');

		this.guards = this.physics.add.staticGroup();
		this.guards.create(750, 900, 'guard');
		this.guards.create(850, 900, 'guard');
	}

	createLevel2(){
		this.level2 = this.physics.add.staticGroup();
		this.level2.create(800, 400, 'good_building2');
		
		this.guards.create(740, 500, 'guard');
		this.guards.create(860, 500, 'guard');
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
			if(i!=2){
				this.good_building.create(i*400, this.Y[i], 'good_building');
			}
		}
		this.Y = [1200, 400, 2000, 800, 0, 1600];
		this.good_building2 = this.physics.add.staticGroup();
		for(var i=0;i<6;i++){
			if(i!=5){
				this.good_building2.create(i*400, this.Y[i], 'good_building2');
			}
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
			if(i!=2){
				this.good_park.create(i*400, this.Y[i], 'good_park');
			}
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

	goToPresentWorld (player, museum){
		if(this.data.pastConverse!=2){
			this.scene.stop("past");
			if(this.data.lc<2){
				this.scene.start('textBox', {s: 'I haven\'t done enough!'});
				setTimeout(() => {
					this.scene.stop('textBox');
					this.scene.start("present", {x: 1600, 
											y: 1000, 
											lc: this.data.lc, 
											firstTime: 1,
											presentConverse: 1,
											pastConverse: this.data.pastConverse});
				}, 5000);
			}
			else{
				this.scene.start('textBox', {s: 'Something is different\
												\nI have stopped the war.\
												\nI must talk to grandpa.'});
				setTimeout(() => {
					this.scene.stop('textBox');
					console.log('pui');
					this.scene.start("past", {x: 1600, 
											y: 1000, 
											lc: this.data.lc, 
											pastConverse: 2});
					console.log('Ho start');
				}, 10000);
			}
		}
	}

	goToMaze (player, home){
		this.scene.stop("past");
		if(this.data.lc==0){
			if(this.data.pastConverse==1){
				this.scene.start('textBox', {s: 'Lieutenant Singh is going to delay the shipment containig ration for the Allies.\
												\nLyla needs to make the correct choice, before they make the wrong one!'});
				setTimeout(() => {
					this.scene.stop('textBox');
					this.scene.start("maze");
				}, 12000);
			}
			else{
				this.scene.start('textBox', {s: 'I should talk to grandpa first.'});
				setTimeout(() => {
					this.scene.stop('textBox');
					this.scene.start("past", {x: 800, 
										      y: 1000, 
										      lc: this.data.lc,
										      pastConverse: 0});
				}, 5000);	
			}
		}
		else{
			this.scene.start('textBox', {s: 'Lyla\'s job here is done.'});
			setTimeout(() => {
				this.scene.stop('textBox');
				this.scene.start("past", {x: 800, 
										  y: 1000, 
										  lc: this.data.lc,
										  pastConverse: 1});
			}, 5000);
		}
	}

	goToOffice(){
		this.scene.stop('past');
		if(this.data.lc<1){
			this.scene.start('textBox', {s: 'Lyla needs to do something else first.'});
			setTimeout(() => {
				this.scene.stop('textBox');
				this.scene.start("past", {x: 800, 
										  y: 600, 
										  lc: this.data.lc,
										  pastConverse: this.data.pastConverse});
			}, 5000);
		}
		else if(this.data.lc==1){
			this.scene.start('textBox', {s: 'There could be some intel here. Beware of the guards roaming around,\
											\nif they see you, you are done.\
											\nFind the car grandpa sent for you\
											\nGo gentle into the dark.'});
			setTimeout(() => {
				this.scene.stop('textBox');
				this.scene.start("level2");
			}, 13000);
		}
		else{
			this.scene.start('textBox', {s: 'Lyla\'s job here is done.'});
			setTimeout(() => {
				this.scene.stop('textBox');
				this.scene.start("past", {x: 800, 
										  y: 600, 
										  lc: this.data.lc,
										  pastConverse: 1});
			}, 5000);
		}
	}
}
export default pastWorld