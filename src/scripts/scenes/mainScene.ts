import FpsText from '../objects/fpsText'
import { Obstacle } from '../objects/obstacle'
import { LaserGroup } from '../objects/laserGroup'
import Player from '../objects/player'
import Phaser from 'phaser'
import { Button } from '../../util/Button'

export default class MainScene extends Phaser.Scene {
  fpsText
  player: Player
  laserGroup: LaserGroup
  theme
  velocity = 500
  background
  obstacles: Obstacle[] = []
  hearts: Phaser.GameObjects.Image[] = []
  uiContainer: Phaser.GameObjects.Container

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.useControls()
    this.uiContainer = this.add.container(0, 0)
    this.uiContainer.setDepth(10)
    this.createHeartsUI(3)

    this.background = this.add
      .tileSprite(this.cameras.main.width / 2, this.cameras.main.height / 2, this.scale.height, this.scale.width, 'bg')
      .setOrigin(0.5, 0.5)
      .setScale(4)
      .setAngle(90)

    this.player = new Player(this, this.cameras.main.width / 2, this.cameras.main.height * 0.9)
    this.laserGroup = new LaserGroup(this)
    this.fpsText = new FpsText(this)

    this.theme = this.sound.add('bgMusic', { volume: 0.25, loop: true })
    this.theme.play()

    const button = new Button(
      this.cameras.main.width * 0.95,
      50,
      'Sound',
      this,
      () => (this.theme.mute = !this.theme.mute)
    )

    this.obstacles = this.generateMultipleObstacles(10)
  }

  shootLaser() {
    this.laserGroup.fireLaser(this.player.x, this.player.y)
  }

  generateMultipleObstacles(count: number): Obstacle[] {
    const obstacles: Obstacle[] = []
    const padding = 50 // A padding value to avoid obstacles being too close to each other
    const minY = this.scale.height / 6 // Minimum Y position
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

      this.physics.add.collider(obstacle, this.laserGroup, (obstacle, laser) => {
        // Handle collision logic here
        laser.destroy()
        obstacle.destroy()
      })

      obstacles.push(obstacle)
    }
    return obstacles
  }

  createHeartsUI(initialCount: number) {
    for (let i = 0; i < initialCount; i++) {
      const heart = this.add.image(10 + i * 40, 10, 'heart')
      heart.setScale(4)
      heart.setOrigin(0, 0)
      heart.setScrollFactor(0) // Fix the heart UI in place (not affected by camera scroll)
      this.hearts.push(heart)
      this.uiContainer.add(heart)
    }
  }

  updateHeartsUI(newCount: number) {
    // Update the visibility of hearts based on the new count
    for (let i = 0; i < this.hearts.length; i++) {
      this.hearts[i].setVisible(i < newCount)
    }
  }

  useControls = () => {
    if (this.input && this.input.keyboard) {
      const cursors = this.input.keyboard.createCursorKeys()
      const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

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

      /* shooting
       */
      spaceBar.on('down', () => {
        this.shootLaser()
      })
    }
  }

  update() {
    this.fpsText.update()
    // Scroll the background horizontally
    this.background.tilePositionX -= 2
    this.obstacles.forEach(obstacle => {
      obstacle.setY(obstacle.y + 1)
    })

    // Optional: Follow the camera
    this.background.x = this.cameras.main.scrollX
  }
}
