import {Scene} from "phaser"

class miniGame extends Scene{	
	constructor(){
		super('miniGame');
		this.speed = 250;
	}

	preload ()
	{
		this.load.spritesheet('lila', 'assets/lila.png', { frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('p2', 'assets/pr.png', { frameWidth: 64, frameHeight: 64});

		this.load.image('sky', 'assets/sky_long.jpg');
		this.load.image('ground', 'assets/green_platform.png');
		this.load.image('laptop', 'assets/laptop.png');
	}

	create ()
	{
		// Placing objects of the game
		this.add.image(1100, 0, 'sky');
		this.laptop = this.physics.add.staticGroup();
		this.laptop.create(2000, 980, "laptop").setScale(0.1, 0.1).refreshBody();

		this.platforms = this.physics.add.staticGroup();
		// this.platforms.create(2000, 1080, 'ground').setScale(0.1, 0.5).refreshBody();
		this.platforms.create(85, 1800, 'ground').setScale(20, 4).refreshBody();

		this.platforms.create(700, 1650, 'ground').setScale(1, 1).refreshBody();
		this.platforms.create(100, 1550, 'ground').setScale(1, 1).refreshBody();
		this.platforms.create(700, 1450, 'ground').setScale(1, 1).refreshBody();
		
		this.platforms.create(1500, 1350, 'ground').setScale(1, 1).refreshBody();
		this.platforms.create(100, 1350, 'ground').setScale(1, 1).refreshBody();

		this.platforms.create(100, 1150, 'ground').setScale(1, 1).refreshBody();
		this.platforms.create(700, 1250, 'ground').setScale(1, 1).refreshBody();

		this.platforms.create(1175, 1150, 'ground').setScale(1, 1).refreshBody();

		this.platforms.create(2550, 1050, 'ground').setScale(7, 1).refreshBody();

		// this.platforms.create(35, 950, 'ground').setScale(1, 1).refreshBody();
		// this.platforms.create(35, 1550, 'ground').setScale(1, 1).refreshBody();
		this.platforms.create(1505, 1650, 'ground').setScale(1, 1).refreshBody();


		
		this.createPlayer();
		this.createP2s();
		
		// Adjusting camera so that it follows the player
		this.cameras.main.x = -500;
		this.cameras.main.y = -500;
		this.cameras.main.startFollow(this.player);
		this.cursors = this.input.keyboard.createCursorKeys();

		// Adding colliders
		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(this.p21, this.platforms);	
		this.physics.add.collider(this.p22, this.platforms);	
		this.physics.add.collider(this.p23, this.platforms);	
		this.physics.add.collider(this.p24, this.platforms);	

	}

	createPlayer(){
		this.player = this.physics.add.sprite(930, 1700, 'lila');
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		this.player.setGravityY(600);
		
		// Player animations
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('lila', { start: 117, end: 125 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'turn',
			frames: [ { key: 'lila', frame: 32 } ],
			frameRate: 10
		});
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('lila', { start: 143, end: 151 }),
			frameRate: 10,
			repeat: -1
		});
	}

	createP2s(){
		this.p21 = this.physics.add.sprite(205, 1500, 'p2');
		this.p21.setBounce(0.2);
		this.p21.setCollideWorldBounds(true);
		this.p21.setGravityY(600);

		this.p22 = this.physics.add.sprite(700, 1400, 'p2');
		this.p22.setBounce(0.2);
		this.p22.setCollideWorldBounds(true);
		this.p22.setGravityY(600);

		this.p23 = this.physics.add.sprite(1500, 1300, 'p2');
		this.p23.setBounce(0.2);
		this.p23.setCollideWorldBounds(true);
		this.p23.setGravityY(600);

		this.p24 = this.physics.add.sprite(205, 1050, 'p2');
		this.p24.setBounce(0.2);
		this.p24.setCollideWorldBounds(true);
		this.p24.setGravityY(600);
		
		this.p21.setVelocityX(80);
		this.p22.setVelocityX(125);
		this.p23.setVelocityX(125);
		this.p24.setVelocityX(80);


		// P2 animations
		this.anims.create({
			key: 'p2left',
			frames: this.anims.generateFrameNumbers('p2', { start: 117, end: 125 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'p2turn',
			frames: [ { key: 'p2', frame: 32 } ],
			frameRate: 10
		});
		this.anims.create({
			key: 'p2right',
			frames: this.anims.generateFrameNumbers('p2', { start: 143, end: 151 }),
			frameRate: 10,
			repeat: -1
		});

		this.p21.anims.play("p2right", true);
		this.p22.anims.play("p2right", true);
		this.p23.anims.play("p2right", true);
		this.p24.anims.play("p2right", true);

	}

	update(){
		// Defining player movement functions

		if (this.cursors.right.isDown && this.player.x <= 2020){	
			this.player.setVelocityX(this.speed);
			this.player.anims.play("right", true);
		}else if(this.cursors.left.isDown && this.player.x >= 165){
			this.player.setVelocityX(-this.speed);
			this.player.anims.play("left", true);

		}
		else{
			this.player.setVelocityX(0);
			this.player.anims.play('turn', true);
		}

		if (this.cursors.up.isDown && this.player.body.touching.down){
			this.player.setVelocityY(-400);
		}
		this.movep2s();
		this.check();
	}
	movep2s(){
		// console.log(this.p21.x);
		if(this.p21.x >= 280)
		{
			this.p21.setVelocityX(-45);
			this.p21.anims.play("p2left", true);
		}
		if(this.p21.x <= 165)
		{
			this.p21.setVelocityX(45);
			this.p21.anims.play("p2right", true);
		}

		if(this.p22.x >= 880)
		{
			this.p22.setVelocityX(-85);
			this.p22.anims.play("p2left", true);
		}
		if(this.p22.x <= 610)
		{
			this.p22.setVelocityX(85);
			this.p22.anims.play("p2right", true);

		}

		if(this.p23.x >= 1680)
		{
			this.p23.setVelocityX(-85);
			this.p23.anims.play("p2left", true);
		}
		if(this.p23.x <= 1410)
		{
			this.p23.setVelocityX(85);
			this.p23.anims.play("p2right", true);
		}

		if(this.p24.x >= 280)
		{
			this.p24.setVelocityX(-45);
			this.p24.anims.play("p2left", true);
		}
		if(this.p24.x <= 165)
		{
			this.p24.setVelocityX(45);
			this.p24.anims.play("p2right", true);
		}
	}
	check()
	{
		if(this.p21.body.velocity.x>0 && this.player.x >= this.p21.x && this.player.y == this.p21.y)
		{
			console.log("fucked");
		}
		if(this.p21.body.velocity.x<0 && this.player.x <= this.p21.x && this.player.y == this.p21.y)
		{
			console.log("fucked");
		}

		if(this.p22.body.velocity.x>0 && this.player.x >= this.p22.x && this.player.y == this.p22.y)
		{
			console.log("fucked");
		}
		if(this.p22.body.velocity.x<0 && this.player.x <= this.p22.x && this.player.y == this.p22.y)
		{
			console.log("fucked");
		}

		if(this.p23.body.velocity.x>0 && this.player.x >= this.p23.x && this.player.y == this.p23.y)
		{
			console.log("fucked");
		}
		if(this.p23.body.velocity.x<0 && this.player.x <= this.p23.x && this.player.y == this.p23.y)
		{
			console.log("fucked");
		}

		if(this.p24.body.velocity.x>0 && this.player.x >= this.p24.x && this.player.y == this.p24.y)
		{
			console.log("fucked");
		}
		if(this.p24.body.velocity.x<0 && this.player.x <= this.p24.x && this.player.y == this.p24.y)
		{
			console.log("fucked");
		}
	}
}
export default miniGame