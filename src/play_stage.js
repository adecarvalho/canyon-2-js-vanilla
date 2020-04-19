import { Paysage } from './paysage.js';
//
import { Rock } from './rock.js';
//
import { Pillars } from './pillars.js';
//
import { Plane } from './plane.js';
//
import { gMusicPlayer, gameStageManager, gAssetsManager } from './main.js';
//
import { Stage, ScoreManager } from './ezLib.js';
//
import { ConcluStage } from './conclu_stage.js';

//
export class PlayStage extends Stage {
	//
	constructor(screenWidth, screenHeight) {
		super(screenWidth, screenHeight);

		this.score = new ScoreManager(this.screenWidth, this.screenHeight);

		this.paysage = new Paysage(this.screenWidth);

		this.plane = new Plane(
			this.screenWidth,
			this.screenHeight,
			this.screenWidth / 2 - 100,
			this.screenHeight / 2
		);

		this.rocks = [];

		this.rocks.push(new Rock(this.screenWidth, this.screenHeight, 'ROCK_DOWN'));
		this.rocks.push(new Rock(this.screenWidth, this.screenHeight, 'ROCK_UP'));

		this.pillars = new Pillars(this.screenWidth, this.screenHeight);
	}

	//
	onEnter(datas) {
		gMusicPlayer.play('./assets/musics/play_stage_canyon2.ogg', 0.3, true);

		if (datas) {
			this.score.setName(datas.name);
		}

		this.score.reset();
	}

	//
	onExit() {
		gMusicPlayer.stop();
	}
	//
	update(dt) {
		this.paysage.update(dt);

		//rocks
		for (const item of this.rocks) {
			item.update(dt);
		}

		//pillars
		if (this.pillars.update(dt) && this.plane.state === 'LIVE') {
			gAssetsManager.getSound('check').load();
			gAssetsManager.getSound('check').play();

			this.score.incrementsPoints(1);
		}

		//
		this.plane.update(dt);

		//
		this.collisions();

		//
		this.isGameOver();
	}
	//
	isGameOver() {
		if (this.score.isGameOver()) {
			const datas = {
				name: this.score.getName(),
				points: this.score.getPoints()
			};

			setTimeout(() => {
				gameStageManager.changeStage(
					new ConcluStage(this.screenWidth, this.screenHeight),
					datas
				);
			}, 200);
		}
	}
	//
	collisions() {
		//rocks
		for (const rock of this.rocks) {
			if (this.plane.state === 'LIVE' && this.plane.collides(rock)) {
				this.plane.touched();
				this.pillars.newWave();
				this.score.decrementsLives();
				return;
			}
		}

		//pillars
		if (this.pillars.isCollidePlane(this.plane)) {
			this.score.decrementsLives();
		}
	}

	//
	render(ctx) {
		this.paysage.render(ctx);

		//pillars
		this.pillars.render(ctx);

		//rocks
		for (const item of this.rocks) {
			item.render(ctx);
		}

		//plane
		this.plane.render(ctx);

		//score
		this.score.render(ctx);
	}

	//end
}
