import { Stage, Label } from './ezLib.js';

//
import {
	gAssetsManager,
	gameStageManager,
	gInputManager,
	gMusicPlayer
} from './main.js';

//
import { IntroStage } from './intro_stage.js';

//
export class ConcluStage extends Stage {
	//
	constructor(screenWidth, screenHeight) {
		super(screenWidth, screenHeight);

		this.title = new Label('Game Over', 50);
		this.title.setColor('purple');

		this.score = new Label('Score', 40);
		this.score.setColor('purple');

		this.com_play = new Label('Press Enter to Play', 40);
		this.com_play.setColor('purple');

		this.name = '???';
		this.points = 0;
	}

	//
	onEnter(datas) {
		if (datas) {
			this.name = datas.name;
			this.points = datas.points;
		}
		//
		gMusicPlayer.play('./assets/musics/conclu_stage_canyon2.ogg', 0.5, true);
	}
	//
	onExit() {
		gMusicPlayer.stop();
	}
	//
	update(dt) {
		if (gInputManager.isKeyPressed('Enter')) {
			setTimeout(() => {
				gameStageManager.changeStage(
					new IntroStage(this.screenWidth, this.screenHeight)
				);
			}, 200);
		}
		//
	}
	//
	render(ctx) {
		ctx.drawImage(gAssetsManager.getImage('paysage'), 0, 0);
		//
		this.title.setText('Game Over ' + this.name);
		this.title.render(ctx, 200, 100);

		this.score.setText('Score = ' + this.points);
		this.score.render(ctx, 250, 200);

		this.com_play.render(ctx, 200, 350);
	}
}
