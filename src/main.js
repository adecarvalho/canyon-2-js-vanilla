import {
	Game,
	MusicPlayer,
	GameStageManager,
	InputManager,
	AssetsManager,
} from './ezLib.js';

//import { PlayStage } from './play_stage.js';
import {
	IntroStage
} from './intro_stage.js';
//import { CountStage } from "./count_stage.js";

//
const canvas = document.getElementById('game_screen');
//
const div_fps = document.getElementById('fps');
//
export const gameStageManager = new GameStageManager();

export const gAssetsManager = new AssetsManager();

export const gMusicPlayer = new MusicPlayer();

export const gInputManager = new InputManager();

//
const game = new Game(canvas, gameStageManager, gInputManager);

//
async function chargeAssets() {
	console.log('charge assets');

	//load images
	gAssetsManager.putImage(
		'paysage',
		await game.loadImage('./assets/images/paysage.png')
	);

	gAssetsManager.putImage(
		'rock_up',
		await game.loadImage('./assets/images/rock_up.png')
	);

	gAssetsManager.putImage(
		'rock_down',
		await game.loadImage('./assets/images/rock_down.png')
	);

	gAssetsManager.putImage(
		'pillar_up',
		await game.loadImage('./assets/images/pillar_haut.png')
	);

	gAssetsManager.putImage(
		'pillar_down',
		await game.loadImage('./assets/images/pillar_bas.png')
	);

	gAssetsManager.putImage(
		'plane',
		await game.loadImage('./assets/images/plane1.png')
	);

	gAssetsManager.putImage(
		'flying',
		await game.loadImage('./assets/images/flying.png')
	);
	//
	gAssetsManager.putImage(
		'explosion',
		await game.loadImage('./assets/images/explosion.png')
	);

	//load sounds
	gAssetsManager.putSound(
		'boom',
		await game.loadSound('./assets/sounds/boom.ogg', false, 0.3)
	);

	gAssetsManager.putSound(
		'check',
		await game.loadSound('./assets/sounds/check.wav', false, 0.3)
	);

	//
	gameStageManager.pushStage(new IntroStage(canvas.width, canvas.height));

	//
	game.start();

	//
	setInterval(() => {
		const fps = game.getFps();

		div_fps.textContent = `Fps= ${fps}`;
	}, 500);
}

//
chargeAssets();