export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('player', 'assets/img/player.png')
    this.load.image('bg', 'assets/img/bg.png')
    this.load.image('obstacleTexture', 'assets/img/asteroid.png')
    this.load.image('laser', '/assets/img/beam.png')

    this.load.audio('bgMusic', ['assets/audio/theme.mp3'])
    this.load.audio('laserSound', ['assets/audio/beam.mp3'])

    this.load.video('bgVideo', 'assets/video/video.mp4')
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
