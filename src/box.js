class Demo extends Phaser.Scene {
	init(data){
		this.data = data;
	}
	constructor() {
		super({
			key: 'textBox'
		})
	}

	preload() {}

	create() {                
		var txt = this.add.text(100, 100, 'Touch to start typing', {wordWrap:{ width: 1000}, font: '20pt'});
		txt.typing = this.plugins.get('rexTextTyping').add(txt, {
			speed: 0.05*1000,
			//typeMode: 'middle-to-sides',
			//setTextCallback: myTypingFn
		});
		txt.typing.start(this.data.	s);
	}

	update() {}
}
export default Demo
