import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
	fpsText

	constructor() {
		super({ key: 'MainScene' })
	}

	create() {
		const player = new PhaserLogo(this, this.cameras.main.width / 2, this.cameras.main.height)


		if (this.input && this.input.keyboard) {
			var cursors = this.input.keyboard.createCursorKeys()

			cursors.left.on('down', function () {
				player.setVelocityX(-160);
			});
			cursors.left.on('up', function () {
				player.setVelocityX(0);
			});

			cursors.right.on('down', function () {
				player.setVelocityX(160);
			});
			cursors.right.on('up', function () {
				player.setVelocityX(0);
			});

			cursors.up.on('down', function () {
				player.setVelocityY(-160);
			});
			cursors.up.on('up', function () {
				player.setVelocityY(0);
			});

			cursors.down.on('down', function () {
				player.setVelocityY(160);
			});
			cursors.down.on('up', function () {
				player.setVelocityY(0);
			});
		}

	}
}
