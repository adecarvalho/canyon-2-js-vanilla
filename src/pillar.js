import { Entity } from './ezLib.js';
import { gAssetsManager } from './main.js';
//
export class Pillar extends Entity {
	//
	constructor(screenWidth, screenHeight, posiX, type) {
		super(posiX, 0, gAssetsManager.getImage('pillar_up'));

		//
		if (type == 'PILLAR_DOWN') {
			this.image = gAssetsManager.getImage('pillar_down');
			this.setBottom(screenHeight);
		}
		//
		this.type = type;
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.position.x = posiX;
		//
		this.touchLeft = false;

		this.inflate(30, 20);
	}

	//
	isTouchLeft() {
		return this.touchLeft;
	}

	//
	reset() {
		this.touchLeft = false;
		this.velocity.x = 0;
		this.setLeft(this.screenWidth);
	}

	//
	move(speed) {
		this.velocity.x = -speed;
	}

	//
	update(dt) {
		super.update(dt);
		//
		if (this.getRight() <= 0) {
			this.touchLeft = true;
		}
	}

	//
	render(ctx) {
		super.render(ctx);

		//super.renderDebug(ctx);
	}

	//end
}
