/*
ezLib.js
2020-avril-9
author A.DeCarvalho
*/
//***************
// functions
//***************
export function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
//
export function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}
//
export function drawFillCircle(ctx, xp, yp, radius, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(xp, yp, radius, 0, Math.PI * 2, true);
	ctx.fill();
}
//
export function drawFillRectangle(ctx, xp, yp, width, height, color) {
	ctx.fillStyle = color;
	ctx.fillRect(xp, yp, width, height);
	ctx.fill();
}
//******************* */
// Objets
//******************* */
export class AssetsManager {
	constructor() {
		this.texture = {};
		this.sounds = {};
		this.musics = {};
	}
	//
	putImage(name, image) {
		this.texture[name] = image;
	}
	//
	getImage(name) {
		try {
			return this.texture[name];
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	//
	putSound(name, sound) {
		this.sounds[name] = sound;
	}

	//
	getSound(name) {
		try {
			return this.sounds[name];
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

//******************* */
export class FillRect {
	constructor(xp, yp, width, height, color = 'rgb(200,20,200') {
		this.position = { x: xp, y: yp };
		this.width = width;
		this.height = height;
		this.color = color;
	}
	//
	setColor(color) {
		this.color = color;
	}
	//
	setPosition(xp, yp) {
		this.position.x = xp;
		this.position.y = yp;
	}
	//
	setSize(width, height) {
		this.width = width;
		this.height = height;
	}
	//
	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}
//******************* */
//******************* */
export class LineRect {
	constructor(xp, yp, width, height, color = 'rgb(200,20,200') {
		this.position = { x: xp, y: yp };
		this.width = width;
		this.height = height;
		this.color = color;
		this.lineWidth = 1;
	}
	//
	setColor(color) {
		this.color = color;
	}
	//
	setPosition(xp, yp) {
		this.position.x = xp;
		this.position.y = yp;
	}
	//
	setSize(width, height) {
		this.width = width;
		this.height = height;
	}
	//
	setLineWidth(width) {
		this.lineWidth = width;
	}
	//
	render(ctx) {
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.lineWidth;
		ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
	}
}
//******************* */
//******************* */
export class FillCircle {
	constructor(xp, yp, radius = 10, color = 'rgb(200,20,200') {
		this.position = { x: xp, y: yp };
		this.radius = radius;
		this.color = color;
	}
	//
	setColor(color) {
		this.color = color;
	}
	//
	setPosition(xp, yp) {
		this.position.x = xp;
		this.position.y = yp;
	}
	//
	setRadius(radius) {
		this.radius = radius;
	}
	//
	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(
			this.position.x,
			this.position.y,
			this.radius,
			0,
			Math.PI * 2,
			true
		);
		ctx.fill();
	}
}
//******************* */
//******************* */
export class LineCircle {
	constructor(xp, yp, radius = 10, color = 'rgb(200,20,200') {
		this.position = { x: xp, y: yp };
		this.radius = radius;
		this.color = color;
		this.lineWidth = 1;
	}
	//
	setColor(color) {
		this.color = color;
	}
	//
	setPosition(xp, yp) {
		this.position.x = xp;
		this.position.y = yp;
	}
	//
	setRadius(radius) {
		this.radius = radius;
	}
	//
	setLineWidth(width) {
		this.lineWidth = width;
	}
	//
	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.lineWidth = this.lineWidth;
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		ctx.stroke();
	}
}
//******************* */
//******************* */
export class MusicPlayer {
	constructor() {
		this.snd = document.createElement('audio');
		this.snd.src = '';
		this.snd.setAttribute('preload', 'auto');
		this.snd.setAttribute('controls', 'controls');

		//this.snd.style.display = "none";
		this.snd.loop = false;
		//
		document.body.appendChild(this.snd);
	}
	//
	stop() {
		this.snd.pause();
	}
	//
	async play(title, volume = 0.5, loop = false) {
		try {
			this.snd.src = title;
			this.snd.volume = volume;
			this.snd.loop = loop;
			//
			await this.snd.load();
			await this.snd.play();
		} catch (error) {
			console.log('error play');
		}
	}
	//
	setVolume(amt) {
		this.snd.volume = amt;
	}
	//
	getVolume() {
		return this.snd.volume;
	}
}
//******************** */
//******************** */
export class RecBounds {
	constructor(x = 0, y = 0, w = 10, h = 10) {
		this.x = x;
		this.y = y;

		this.w = w;
		this.h = h;

		this.xi = 0;
		this.yi = 0;
	}
	//
	overlap(target) {
		//cas B
		if (
			this.x > target.x &&
			this.x < target.x + target.w &&
			this.y > target.y &&
			this.y < target.y + target.h
		)
			return true;

		//cas A
		if (
			this.x + this.w > target.x &&
			this.x + this.w < target.x + target.w &&
			this.y > target.y &&
			this.y < target.y + target.h
		)
			return true;

		//cas C
		if (
			this.x > target.x &&
			this.x < target.x + target.w &&
			this.y + this.h > target.y &&
			this.y + this.h < target.y + target.h
		)
			return true;

		//cas D
		if (
			this.x + this.w > target.x &&
			this.x + this.w < target.x + target.w &&
			this.y + this.h > target.y &&
			this.y + this.h < target.y + target.h
		)
			return true;
		//
		return false;
	}
	//
	update(xp, yp) {
		this.x = xp;
		this.x = this.x + this.xi;

		this.y = yp;
		this.y = this.y + this.yi;
	}
	//
	render(ctx) {
		ctx.strokeStyle = 'rgb(55,55,55)';
		ctx.lineWidth = 2;
		ctx.strokeRect(this.x, this.y, this.w, this.h);
	}
	//
	inflate(xi, yi) {
		this.xi = xi;
		this.yi = yi;
		this.w = this.w - 2 * this.xi;
		this.h = this.h - 2 * this.yi;

		this.x = this.x + this.xi;
		this.y = this.y + this.yi;
	}
	//
	containPoint(px, py) {
		if (
			px > this.x &&
			px < this.x + this.w &&
			py > this.y &&
			py < this.y + this.h
		) {
			return true;
		}
		return false;
	}
}
//**************** */
//**************** */
export class Stage {
	//
	constructor(screenWidth, screenHeight) {
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
	}

	//
	onEnter(datas = undefined) {}

	//
	onExit() {}

	//
	update(dt) {}

	//
	render(ctx) {}
}
//**************** */
//**************** */
export class Entity {
	//
	constructor(xn = 0, yn = 0, image_src = undefined, w = 50, h = 50) {
		this.position = { x: xn, y: yn };

		this.image = image_src;

		this.color = 'rgb(200,200,200)';

		//speed
		this.velocity = {
			x: 0,
			y: 0,
		};

		//dim
		if (this.image != undefined) {
			this.width = this.image.width;
			this.height = this.image.height;
		} else {
			this.width = w;
			this.height = h;
		}

		//state
		this.state = -1;

		//bouds
		this.rectbounds = new RecBounds(
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}
	//
	setColor(color) {
		this.color = color;
	}
	//
	getCenterX() {
		return this.position.x + this.width / 2;
	}
	//
	getCenterY() {
		return this.position.y + this.height / 2;
	}
	//
	getLeft() {
		return this.position.x;
	}
	//
	setLeft(left) {
		this.position.x = left;
	}
	//
	getRight() {
		return this.position.x + this.width;
	}
	//
	setCenterX(centerX) {
		this.position.x = centerX - this.width / 2;
	}
	//
	setCenterY(centerY) {
		this.position.y = centerY - this.height / 2;
	}
	//
	setRight(right) {
		this.position.x = right - this.width;
	}
	//
	getTop() {
		return this.position.y;
	}
	//
	setTop(top) {
		this.position.y = top;
	}
	//
	getBottom() {
		return this.position.y + this.height;
	}
	//
	setBottom(bottom) {
		this.position.y = bottom - this.height;
	}
	//
	inflate(xi, yi) {
		this.rectbounds.inflate(xi, yi);
	}
	//
	collides(other_entity) {
		if (this.rectbounds.overlap(other_entity.rectbounds)) {
			return true;
		} else {
			return false;
		}
	}
	//
	update(dt) {
		this.position.x = Math.floor(this.position.x + this.velocity.x * dt);
		this.position.y = Math.floor(this.position.y + this.velocity.y * dt);

		this.rectbounds.update(this.position.x, this.position.y);
	}
	//
	render(ctx) {
		if (this.image != undefined) {
			ctx.drawImage(
				this.image,
				this.position.x,
				this.position.y,
				this.width,
				this.height
			);
		} else {
			//ctx.fillStyle = 'rgb(255,0,255)';
			ctx.fillStyle = this.color;
			ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
		}
	}
	renderDebug(ctx) {
		this.rectbounds.render(ctx);
	}
}
//************************* */
//************************** */
export class GameStageManager {
	constructor() {
		this.tab = [];
		this.current = undefined;
	}
	//
	pushStage(newstage) {
		this.tab.push(newstage);
		this.current = this.tab[this.tab.length - 1];
		this.current.onEnter();
	}
	//
	popStage() {
		if (this.tab.length > 0) {
			this.current = this.tab.pop();
			this.current.onExit();
		}
	}
	//
	changeStage(newstage, datas) {
		if (this.tab.length > 0) {
			this.current.onExit();
			this.tab.pop();
			//
			this.tab.push(newstage);
			this.current = this.tab[this.tab.length - 1];
			this.current.onEnter(datas);
		}
	}
	//
	update(dt) {
		this.current.update(dt);
	}
	//
	render(ctx) {
		this.current.render(ctx);
	}
}
//********* */
//********* */
class Quads {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	//
	print() {
		console.log('x= ' + x + ' y=' + y);
	}
}
/******************** */
//******************* */
export class Animation {
	constructor(
		atlas,
		widthSprite,
		heightSprite,
		duration = 1 / 30,
		looping = false
	) {
		this.quads = [];
		this.atlas = atlas;
		this.width = widthSprite;
		this.height = heightSprite;
		this.duration = duration;
		this.looping = looping;

		this.atlasW = atlas.width;
		this.atlasH = atlas.height;

		this.nbY = Math.floor(this.atlasH / this.height);
		this.nbX = Math.floor(this.atlasW / this.width);

		this.currentFRame = 0;

		this.timer = 0;
		this.createQuads();

		this.go = false;
	}
	//
	play() {
		this.go = true;
	}
	//
	stop() {
		this.go = false;
	}
	//
	isPlaying() {
		return this.go;
	}
	//
	createQuads() {
		for (let y = 0; y < this.nbY; ++y) {
			for (let x = 0; x < this.nbX; x++) {
				this.quads.push(new Quads(x, y, this.width, this.height));
			}
		}
	}
	//
	update(dt) {
		if (this.go && this.quads.length > 1) {
			this.timer += dt;

			if (this.timer > this.duration) {
				this.timer = 0;
				this.currentFRame++;
				if (this.currentFRame > this.quads.length - 1) {
					this.currentFRame = 0;
					if (this.looping == false) {
						this.go = false;
					}
				}
			}
		}
	}
	//
	render(ctx, xp, yp) {
		if (this.go) {
			//
			let quad = this.quads[this.currentFRame];
			ctx.drawImage(
				this.atlas,

				this.quads[this.currentFRame].x * this.width,
				this.quads[this.currentFRame].y * this.height,
				this.quads[this.currentFRame].w,
				this.quads[this.currentFRame].h,
				xp,
				yp,
				this.width,
				this.height
			);
		}
	}
}
//******************* */
//******************* */
export class ScoreManager {
	//
	constructor(screenWidth, screenHeight) {
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.name = '---';
		this.points = 0;
		this.lives = 3;

		this.labelPoints = new Label();
		this.labelPoints.setSize(30);

		this.labelName = new Label();
		this.labelName.setSize(30);
		//
		this.labelPoints.setColor('gold');
		this.labelName.setColor('gold');
	}
	//
	setName(zename) {
		this.name = zename;
	}
	//
	getName() {
		return this.name;
	}
	//
	getPoints() {
		return this.points;
	}
	//
	setPoints(nb) {
		this.points = nb;
	}
	//
	getLives() {
		return this.lives;
	}
	//
	incrementsPoints(amt) {
		this.points += amt;
	}
	//
	incrementsLives(amt = 1) {
		if (this.lives >= 0 && this.lives < 3) {
			this.lives += amt;
		}
	}
	//
	decrementsLives(amt = 1) {
		this.lives--;
	}
	//
	isGameOver() {
		if (this.lives < 0) {
			return true;
		} else {
			return false;
		}
	}
	//
	reset() {
		this.points = 0;
		this.lives = 3;
	}
	//
	update(dt) {}
	//
	render(ctx) {
		this.labelPoints.setText('Points: ' + this.points);
		this.labelPoints.render(ctx, 10, 30);

		this.labelName.setText(this.name);
		this.labelName.render(ctx, this.screenWidth / 2, 30);

		//lives
		let xd = this.screenWidth - 100;

		ctx.fillStyle = 'rgb(250,50,250)';

		if (this.lives > 0) {
			for (let i = 0; i < this.lives; i++) {
				ctx.beginPath();
				ctx.arc(xd + 25 * i, 20, 10, 0, Math.PI * 2);
				ctx.fill();
			}
		}
	}
}
//************** */
//************** */
export class Label {
	constructor(text = '', size = 20) {
		this.txt = text;
		this.size = size;
		this.visible = true;
		//this.style = BOLD; //NORMAL ITALIC BOLD
		this.rgbColor = 'rgb(250,250,20)';
	}
	//
	setVisible(visible) {
		this.visible = visible;
	}
	//
	setText(txt) {
		this.txt = txt;
	}
	//
	setColor(rgbColor) {
		this.rgbColor = rgbColor;
	}
	//
	setSize(size) {
		this.size = size;
	}
	//
	render(context, xp, yp) {
		if (this.visible) {
			context.fillStyle = this.rgbColor;
			context.font = `${this.size}px Arial`;
			context.fillText(this.txt, xp, yp);
		}
	}
}
//**************** */
//**************** */
export class Game {
	//
	constructor(canvas, gsm, input) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.screenWidth = this.canvas.width;
		this.screenHeight = this.canvas.height;

		this.gsm = gsm;

		this.input = input;

		this.spriteStillLoading = 0;
		this.soundStillLoading = 0;

		this.oldtime = 0;

		this.timer = 0;

		this.fps = 0;
		this.fpsmoyen = 0;
	}
	//
	getFps() {
		return this.fpsmoyen;
	}
	//
	loadImage(path) {
		return new Promise((resolve, reject) => {
			try {
				const img = new Image();
				img.src = path;
				this.spriteStillLoading += 1;

				img.onload = () => {
					this.spriteStillLoading -= 1;
					resolve(img);
				};
			} catch (err) {
				reject('error load image');
			}
		});
	}
	//
	loadSound(path, loop = false, volume = 0.5) {
		return new Promise((resolve, reject) => {
			try {
				//console.log("sound loading");
				const snd = new Audio(path);

				snd.loop = loop;
				snd.volume = volume;
				//
				this.soundStillLoading += 1;

				snd.addEventListener('canplaythrough', () => {
					this.soundStillLoading -= 1;
					//console.log(snd);
					resolve(snd);
				});
			} catch (e) {
				reject('error load sound');
			}
		});
	}
	//
	start() {
		//
		console.log('start');
		//
		if (this.spriteStillLoading > 0 || this.soundStillLoading > 0) {
			requestAnimationFrame(() => {
				this.start();
			});
		} else {
			console.log('game to mainloop');
			//this.init();

			this.mainLoop();
		}
	}
	//
	init() {
		//todo
	}
	//
	mainLoop(timestamp) {
		//
		const dt = (timestamp - this.oldtime) / 1000.0 || 0;

		this.oldtime = timestamp;

		this.timer += dt;

		this.fps++;

		if (this.timer >= 1.0) {
			//console.log(`fps= ${this.fps}`);
			this.timer = 0;
			this.fpsmoyen = this.fps;
			this.fps = 0;
		}

		//clear screen
		this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
		//this.ctx.fillStyle = 'rgb(150,100,150)';
		//this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
		//this.ctx.drawImage(gTextures['paysage'], 0, 0);

		//
		//this.stage.update(dt);
		this.gsm.update(dt);
		//
		this.input.update();
		//this.stage.render(this.ctx);
		this.gsm.render(this.ctx);
		//
		requestAnimationFrame((timestamp) => {
			this.mainLoop(timestamp);
		});
	}
	//end class
}
//********************** */
//********************** */
export class InputManager {
	//
	constructor() {
		this.tabKeyPressed = {};
		this.tabKeyReleased = {};
		//
		document.addEventListener(
			'keydown',
			(evt) => {
				//console.log(evt);
				//console.log("down " + evt.key);
				setTimeout(() => {
					this.tabKeyPressed[evt.code] = true;
					this.tabKeyReleased[evt.code] = false;
				}, 50);
			},
			false
		);
		//
		document.addEventListener(
			'keyup',
			(evt) => {
				//console.log("up: " + evt.key);
				setTimeout(() => {
					this.tabKeyReleased[evt.code] = true;
					this.tabKeyPressed[evt.code] = false;
				}, 50);
			},
			false
		);
	}
	//
	update() {
		this.tabKeyReleased = {};
		this.tabKeyPressed = {};
	}
	//
	isKeyPressed(keyCode) {
		return this.tabKeyPressed[keyCode];
	}
	//
	isKeyReleased(keyCode) {
		return this.tabKeyReleased[keyCode];
	}
}
//***************************** */
//***************************** */
export class ParticulesGenerator {
	//
	constructor(
		xp,
		yp,
		speedMin = 10,
		speedMax = 100,
		angleMin = Math.PI / 4,
		angleMax = (3 * Math.PI) / 4
	) {
		this.position = { x: xp, y: yp };
		this.speedMin = speedMin;
		this.speedMax = speedMax;

		this.angleMin = angleMin;
		this.angleMax = angleMax;

		this.go = false;

		this.particules = [];

		for (let i = 0; i < 100; i++) {
			this.particules.push(new Particule(this.position.x, this.position.y));
			const module = getRandomFloat(speedMin, speedMax);
			const angle = getRandomFloat(angleMin, angleMax);

			this.particules[i].setSpeed(module, angle);
		}
	}
	//
	start() {
		this.go = true;
	}
	//
	stop() {
		this.go = false;
	}
	//
	move(xn, yn) {
		this.position.x = xn;
		this.position.y = yn;
	}
	//
	update(dt) {
		if (this.particules.length > 0 && this.go) {
			for (let i = 0; i < this.particules.length; i++) {
				this.particules[i].update(dt);
				//
				if (this.particules[i].isDead()) {
					this.particules[i].reset(this.position.x, this.position.y);
				}
			}
		}
	}
	//
	render(ctx) {
		if (this.particules.length > 0 && this.go) {
			for (let i = 0; i < this.particules.length; i++) {
				this.particules[i].render(ctx);
			}
		}
	}
	//end
}
//******************* */
//******************* */
export class Particule {
	constructor(xp, yp, radius = 6, live = 2) {
		this.positionInit = {
			x: xp,
			y: yp,
		};
		this.position = {
			x: xp,
			y: yp,
		};
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.radius = radius;
		this.live = getRandomFloat(0.1, live);

		this.color = { r: 0, g: 0, b: 0, a: 1 };
		this.state = 'LIVE';
		this.timer = 0;
	}
	//
	isDead() {
		if (this.state === 'DEAD') {
			return true;
		}
		return false;
	}
	//
	reset(xn, yn) {
		this.positionInit.x = xn;
		this.positionInit.y = yn;

		this.position.x = xn;
		this.position.y = yn;

		this.timer = 0;
		this.color.a = 1;
		this.state = 'LIVE';
	}
	//
	setVelocity(dx, dy) {
		this.velocity.x = dx;
		this.velocity.y = dy;
	}
	//
	setSpeed(module, angle) {
		this.velocity.x = module * Math.cos(angle);
		this.velocity.y = module * Math.sin(angle);
	}
	//
	move(xn, yn) {
		this.positionInit.x = xn;
		this.positionInit.y = yn;
	}
	//
	update(dt) {
		this.timer += dt;
		if (this.timer > this.live) {
			this.timer = 0;
			this.state = 'DEAD';
		}

		const alpha = 255 - (255 * this.timer) / this.live;

		this.color.a = alpha / 255;

		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;
	}
	//
	render(ctx) {
		ctx.beginPath();

		ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`;

		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
	}
	//end
}
//**************** */
//**************** */
export class MoveLabel {
	constructor(text = '', posiX = 0, posiY = 0, size = 20) {
		this.txt = text;
		this.size = size;
		this.visible = true;
		this.position = { x: posiX, y: posiY };
		this.velocity = { x: 0, y: 0 };
		this.finals = { x: 0, y: 0 };

		this.rgbColor = 'rgb(250,250,20)';
	}
	//
	setVisible(visible) {
		this.visible = visible;
	}
	//
	setText(txt) {
		this.txt = txt;
	}
	//
	setColor(rgbColor) {
		this.rgbColor = rgbColor;
	}
	//
	setSize(size) {
		this.size = size;
	}
	//
	setSpeeds(dx, dy) {
		this.velocity.x = dx;
		this.velocity.y = dy;
	}
	//
	stopX() {
		this.velocity.x = 0;
	}
	//
	stopY() {
		this.velocity.y = 0;
	}
	//
	setFinals(xf, yf) {
		this.finals.x = xf;
		this.finals.y = yf;
	}
	//
	update(dt) {
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;

		//limites en x
		if (this.velocity.x > 0) {
			if (this.position.x >= this.finals.x) {
				this.stopX();
			}
		} else {
			if (this.position.x <= this.finals.x) {
				this.stopX();
			}
		}
		//limites en y
		if (this.velocity.y > 0) {
			if (this.position.y >= this.finals.y) {
				this.stopY();
			}
		} else {
			if (this.position.y <= this.finals.y) {
				this.stopY();
			}
		}
	}
	//
	render(context) {
		if (this.visible) {
			context.fillStyle = this.rgbColor;
			context.font = `${this.size}px Arial`;
			context.fillText(this.txt, this.position.x, this.position.y);
		}
	}
}
//** */
//end ezLib
