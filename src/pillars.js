import { Pillar } from './pillar.js';

//
export class Pillars {
	//
	constructor(screenWidth, screenHeight) {
		//
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;

		this.pillar_up = new Pillar(
			this.screenWidth,
			this.screenHeight,
			this.screenWidth / 2,
			'PILLAR_UP'
		);

		this.pillar_down = new Pillar(
			this.screenWidth,
			this.screenHeight,
			this.screenWidth / 2,
			'PILLAR_DOWN'
		);

		this.speed = 300;

		this.newWave();
	}

	//
	newWave() {
		this.reset();
		this.action();
	}

	//
	reset() {
		this.pillar_up.reset();
		this.pillar_down.reset();
	}

	//
	action() {
		const val = Math.random();

		if (val < 0.5) {
			this.pillar_down.move(this.speed);
		} else {
			this.pillar_up.move(this.speed);
		}
	}

	//
	isCollidePlane(plane) {
		if (plane.state !== 'LIVE') {
			return false;
		}
		//
		if (this.pillar_up.collides(plane) || this.pillar_down.collides(plane)) {
			this.reset();
			this.action();
			plane.touched();
			return true;
		}
		return false;
	}

	//
	update(dt) {
		this.pillar_down.update(dt);
		this.pillar_up.update(dt);
		//
		if (this.pillar_down.isTouchLeft() || this.pillar_up.isTouchLeft()) {
			this.reset();
			this.action();
			//
			return true;
		}
		//
		return false;
	}

	//
	render(ctx) {
		this.pillar_down.render(ctx);
		this.pillar_up.render(ctx);
	}
	//end
}
