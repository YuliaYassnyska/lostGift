export const santaElements = ['SantaWalk-1', 'SantaWalk-2', 'SantaWalk-3', 'SantaWalk-4', 'SantaWalk-5', 'SantaWalk-6', 'SantaWalk-7', 'SantaWalk-8'];

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

    
    santaElements.forEach(img => {
      this.load.spritesheet(img, `assets/${img}.png`, { frameHeight: 600, frameWidth: 600 })
    });

    this.load.image('background', `assets/background.jpg`);
    this.load.spritesheet('santa', `assets/Santa.png`, { frameHeight: 600, frameWidth: 600 });
    this.load.image('gift', `assets/gift.png`);
    this.load.image('snowman', `assets/SnowMan.png`);
    this.load.image('tank', `assets/tank.png`);
    this.load.image('snowflake', `assets/snowflake.png`);
  }

  create() {
    this.scene.start('MainScene')
  }
}
