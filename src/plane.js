import { Entity, Animation, Label, ParticulesGenerator } from './ezLib.js';

import { gInputManager, gAssetsManager } from './main.js';

//
export class Plane extends Entity {
	//
	constructor(screenWidth, screenHeight, xinit, yinit) {
		super(xinit, yinit, gAssetsManager.getImage('plane'));

		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;

		this.label = new Label('Press Space bar', 40);
		this.label.setColor('black');

		this.animation = new Animation(
			gAssetsManager.getImage('flying'),
			90,
			75,
			0.03,
			true
		);
		this.animation.play();

		this.explosion = new Animation(
			gAssetsManager.getImage('explosion'),
			102,
			102,
			0.02,
			false
		);

		this.gaz = new ParticulesGenerator(xinit, yinit + 20, 20, 100, 3.3, 3.0);
		this.gaz.start();

		this.xinit = xinit;
		this.yinit = yinit;

		this.state = 'IDLE'; //LIVE or TOUCHED

		this.gravity = 8;

		this.inflate(5, 5);
	}

	//
	reset() {
		this.position.x = this.xinit;
		this.position.y = this.yinit;
	}

	//
	touched() {
		if (this.state === 'LIVE') {
			this.state = 'TOUCHED';
			this.explosion.play();

			gAssetsManager.getSound('boom').load();
			gAssetsManager.getSound('boom').play();
		}
	}

	//
	update(dt) {
		super.update(dt);

		//
		if (this.state === 'LIVE') {
			this.velocity.y += this.gravity * dt;
			this.position.y += this.velocity.y;
		}

		if (gInputManager.isKeyPressed('Space')) {
			if (this.state === 'IDLE') {
				this.state = 'LIVE';
			}
			this.velocity.y = -3;
		}

		//limites
		if (this.getBottom() >= this.screenHeight) {
			this.setBottom(this.screenHeight);
		}
		//
		if (this.getTop() <= 0) {
			this.setTop(0);
		}
		//
		this.animation.update(dt);

		//
		this.gaz.move(this.position.x, this.position.y + 20);
		this.gaz.update(dt);

		//
		this.explosion.update(dt);
		if (this.state === 'TOUCHED' && this.explosion.isPlaying() == false) {
			this.state = 'IDLE';
			this.position.x = this.xinit;
			this.position.y = this.yinit;
			this.velocity.x = 0;
			this.velocity.y = 0;
		}
	}

	//
	render(ctx) {
		if (this.state == 'IDLE' || this.state == 'LIVE') {
			this.gaz.render(ctx);
			this.animation.render(ctx, this.position.x, this.position.y);
		}

		//
		if (this.state == 'IDLE') {
			this.label.render(ctx, this.position.x, this.screenHeight / 2);
		}

		//
		if (this.state === 'TOUCHED') {
			this.explosion.render(ctx, this.position.x, this.position.y);
		}

		//super.renderDebug(ctx);
	}

	//end
}
