import { gAssetsManager } from './main.js';

//
export class Paysage {
	//
	constructor(screenWidth) {
		this.screenWidth = screenWidth;
		this.position = { x: 0, y: 0 };
		this.velocity = -1;
		this.img = gAssetsManager.getImage('paysage');
	}

	//
	update(dt) {
		this.position.x += this.velocity;
		//
		if (this.position.x <= -this.screenWidth) {
			this.position.x = 0;
		}
	}

	//
	render(ctx) {
		ctx.drawImage(this.img, this.position.x, this.position.y);
	}

	//end
}
