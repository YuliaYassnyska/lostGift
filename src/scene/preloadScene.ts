export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloadScene'
    })
  }

  preload() {
    const images = ['background']
    images.forEach(img => {
      this.load.image(img, `assets/${img}.png`)
    })

    this.load.image('background', `assets/background.jpg`);
    
    // this.load.spritesheet('player', 'assets/img/player.png', { frameHeight: 165, frameWidth: 120 })
    // this.load.spritesheet('coin', 'assets/img/coin.png', { frameHeight: 42, frameWidth: 42 })
    // this.load.spritesheet('bee', 'assets/img/bee.png', { frameHeight: 100, frameWidth: 128 })
    // this.load.spritesheet('slime', 'assets/img/slime.png', { frameHeight: 68, frameWidth: 112 })
    // this.load.setPath('assets/spine')
    // // @ts-ignore
    // this.load.spine('boy', 'boy.json', 'boy.atlas')
  }

  create() {
    this.scene.start('MainScene')
  }
}
