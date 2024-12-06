export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloadScene'
    })
  }

  preload() {
    const mapElements = ['1', '2', '3', '4', '5', '6', '14', '15', '16',];
    mapElements.forEach(img => {
      this.load.spritesheet(img, `assets/${img}.png`, { frameHeight: 100, frameWidth: 100 });
    });

    const santaElements = ['SantaWalk-1', 'SantaWalk-2', 'SantaWalk-3', 'SantaWalk-4', 'SantaWalk-5', 'SantaWalk-6', 'SantaWalk-7', 'SantaWalk-8'];
    santaElements.forEach(img => {
      this.load.image(img, `assets/${img}.png`)
    });

    this.load.image('background', `assets/background.jpg`);
    this.load.image('santa', `assets/Santa.png`);
    this.load.image('gift', `assets/gift.png`);
    
  }

  create() {
    this.scene.start('MainScene')
  }
}
