import { gAssetsManager } from './main.js';
import { Entity, getRandomInteger } from './ezLib.js';

//
export class Rock extends Entity {
	//
	constructor(screenWidth, screenHeight, type) {
		super(0, 0, gAssetsManager.getImage('rock_up'));

		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;

		if (type == 'ROCK_DOWN') {
			this.image = gAssetsManager.getImage('rock_down');
			this.setBottom(screenHeight);
		}
		//
		this.type = type;

		this.xr = getRandomInteger(-screenWidth, 0);
		this.position.x = this.xr;

		this.speed = 300;
		this.velocity.x = -this.speed;

		this.inflate(0, 10);
	}

	//
	update(dt) {
		super.update(dt);

		//limite
		this.position.x = this.position.x % this.screenWidth;
	}

	//
	render(ctx) {
		super.render(ctx);

		//super.renderDebug(ctx);
	}

	//end
}
