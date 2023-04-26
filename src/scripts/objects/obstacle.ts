import Phaser from 'phaser'

export class Obstacle extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'obstacleTexture')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // Randomly generate the obstacle's size
    const randomScale = 2.5 + Math.random()
    this.setScale(randomScale)

    // Set the obstacle's physics body (hitbox) properties
    const body = this.body as Phaser.Physics.Arcade.Body
    body.setAllowGravity(false)
    body.setImmovable(true)
    body.setSize(this.width, this.height)

    // Add any other customization needed for the obstacle
  }
}
