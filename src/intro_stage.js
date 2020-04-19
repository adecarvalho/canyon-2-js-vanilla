import {
	gameStageManager,
	gInputManager,
	gAssetsManager,
	gMusicPlayer
} from './main.js';

//
import { Stage, Label } from './ezLib.js';

//
import { CountStage } from './count_stage.js';

//
export class IntroStage extends Stage {
	//
	constructor(screenWidth, screenHeight) {
		super(screenWidth, screenHeight);

		this.title = new Label('Canyon.js', 50);
		this.title.setColor('purple');

		this.com = new Label('Press Space to Start', 30);
		this.com.setColor('purple');

		this.nameLabel = new Label('AAA', 70);
		this.nameLabel.setColor('purple');

		this.tab = [65, 65, 65];
		this.indice = 0;
		this.timer = 0;
		this.toggle = true;

		this.name = '---';
	}

	//
	onEnter(params) {
		//console.log('onEnter');
		gMusicPlayer.play('./assets/musics/intro_stage_canyon2.ogg', 0.5, true);
	}

	//
	onExit() {
		//gMusicPlayer.stop();
	}

	//
	update(dt) {
		this.timer += dt;
		if (this.timer > 0.4) {
			this.timer = 0;
			this.toggle = !this.toggle;
		}
		//
		if (gInputManager.isKeyPressed('ArrowLeft') && this.indice > 0) {
			this.indice = this.indice - 1;
		}
		//
		if (gInputManager.isKeyPressed('ArrowRight') && this.indice < 2) {
			this.indice = this.indice + 1;
		}
		//
		if (gInputManager.isKeyPressed('ArrowUp')) {
			this.tab[this.indice] = this.tab[this.indice] + 1;
			if (this.tab[this.indice] > 90) {
				this.tab[this.indice] = 65;
			}
		}
		//
		if (gInputManager.isKeyPressed('ArrowDown')) {
			this.tab[this.indice] = this.tab[this.indice] - 1;
			if (this.tab[this.indice] < 65) {
				this.tab[this.indice] = 90;
			}
		}
		//enter -> game stage
		if (gInputManager.isKeyPressed('Space')) {
			//
			const datas = {
				name: (this.name = String.fromCharCode(
					this.tab[0],
					this.tab[1],
					this.tab[2]
				))
			};
			//
			setTimeout(() => {
				gameStageManager.changeStage(
					new CountStage(this.screenWidth, this.screenHeight),
					datas
				);
			}, 200);
		}
	}

	//
	fromChar(val) {
		return String.fromCharCode(val);
	}

	//
	afficheName(ctx) {
		if (this.indice == 0) {
			if (this.toggle) {
				this.name = String.fromCharCode(32, 32, this.tab[1], this.tab[2]);
			} else {
				this.name = String.fromCharCode(this.tab[0], this.tab[1], this.tab[2]);
			}
		}
		//
		else if (this.indice == 1) {
			if (this.toggle) {
				this.name = String.fromCharCode(this.tab[0], 32, 32, this.tab[2]);
			} else {
				this.name = String.fromCharCode(this.tab[0], this.tab[1], this.tab[2]);
			}
		}
		//
		else if (this.indice == 2) {
			if (this.toggle) {
				this.name = String.fromCharCode(this.tab[0], this.tab[1], 32, 32);
			} else {
				this.name = String.fromCharCode(this.tab[0], this.tab[1], this.tab[2]);
			}
		}

		//
		this.nameLabel.setText(this.name);

		this.nameLabel.render(ctx, 300, this.screenHeight * 0.4);
	}

	//
	render(ctx) {
		ctx.drawImage(gAssetsManager.getImage('paysage'), 0, 0);
		//title
		this.title.render(ctx, 300, 100);
		//
		this.afficheName(ctx);
		//
		this.com.render(ctx, 200, this.screenHeight - 50);
	}

	//end
}
