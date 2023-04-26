import FpsText from '../objects/fpsText'
import { Obstacle } from '../objects/obstacle'
import Player from '../objects/player'
import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene {
  fpsText
  player: Player
  velocity = 500

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const video = this.add.video(this.scale.width / 2, this.scale.height / 2, 'bgVideo')
    const scaleX = this.scale.width / video.width
    const scaleY = this.scale.height / video.height
    video.setScale(scaleX, scaleY)
    video.play(true)
    video.setMute(true)

    this.player = new Player(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this)

    if (this.input && this.input.keyboard) {
      const cursors = this.input.keyboard.createCursorKeys()

      cursors.left.on('down', () => {
        this.player.setVelocityX(-this.velocity)
      })

      cursors.left.on('up', () => {
        this.player.setVelocityX(0)
      })

      cursors.right.on('down', () => {
        this.player.setVelocityX(this.velocity)
      })
      cursors.right.on('up', () => {
        this.player.setVelocityX(0)
      })

      cursors.up.on('down', () => {
        this.player.setVelocityY(-this.velocity)
      })
      cursors.up.on('up', () => {
        this.player.setVelocityY(0)
      })

      cursors.down.on('down', () => {
        this.player.setVelocityY(this.velocity)
      })
      cursors.down.on('up', () => {
        this.player.setVelocityY(0)
      })
    }

    this.generateMultipleObstacles(10)
  }

  generateMultipleObstacles(count: number): void {
    const obstacles: Obstacle[] = []
    const padding = 50 // A padding value to avoid obstacles being too close to each other
    const minY = this.scale.height / 3 // Minimum Y position
    const maxY = (this.scale.height * 2) / 3 // Maximum Y position
    const heightRange = maxY - minY // Height range for obstacles

    for (let i = 0; i < count; i++) {
      let x = 0
      let y = 0
      let isValidPosition = false

      while (!isValidPosition) {
        x = Math.random() * this.scale.width
        y = minY + Math.random() * heightRange

        isValidPosition = true

        for (const obstacle of obstacles) {
          const dx = Math.abs(obstacle.x - x)
          const dy = Math.abs(obstacle.y - y)
          const minDistance = padding + obstacle.width / 2 + obstacle.height / 2

          if (dx < minDistance && dy < minDistance) {
            isValidPosition = false
            break
          }
        }
      }

      const obstacle = new Obstacle(this, x, y)
      this.physics.add.collider(obstacle, this.player, () => {
        // Handle collision logic here
      })

      obstacles.push(obstacle)
    }
  }

  update() {
    this.fpsText.update()
  }
}
