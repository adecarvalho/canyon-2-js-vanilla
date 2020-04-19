//
import { Paysage } from './paysage.js';
//
import { Stage, Label } from './ezLib.js';
//
import { gameStageManager, gMusicPlayer } from './main.js';
//
import { PlayStage } from './play_stage.js';

//
export class CountStage extends Stage {
	//
	constructor(screenWidth, screenHeight) {
		super(screenWidth, screenHeight);

		this.paysage = new Paysage(this.screenWidth);

		this.label = new Label('3', 70);
		this.label.setColor('purple');

		this.timer = 0;
		this.count = 3;
		this.name = '';
	}
	//
	onEnter(datas) {
		if (datas) {
			this.name = datas.name;
		}
	}
	//
	onExit() {
		gMusicPlayer.stop();
	}
	//
	update(dt) {
		this.timer += dt;
		if (this.timer > 1.0) {
			this.timer = 0;
			this.count--;

			if (this.count < 0) {
				const datas = {
					name: this.name
				};
				gameStageManager.changeStage(
					new PlayStage(this.screenWidth, this.screenHeight),
					datas
				);
			}
		}
	}
	//
	render(ctx) {
		this.paysage.render(ctx);
		this.label.setText(this.count.toString());
		this.label.render(ctx, this.screenWidth / 2, this.screenHeight / 2);
	}
}
