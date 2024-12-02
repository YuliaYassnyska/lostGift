export const santaElementsWalk = ['SantaWalk-1', 'SantaWalk-2', 'SantaWalk-3', 'SantaWalk-4', 'SantaWalk-5', 'SantaWalk-6', 'SantaWalk-7', 'SantaWalk-8'];
export const santaElementsIdle = ['Idle-1', 'Idle-2', 'Idle-3', 'Idle-4', 'Idle-5', 'Idle-6', 'Idle-7', 'Idle-8', 'Idle-9', 'Idle-10', 'Idle-11', 'Idle-12', 'Idle-13', 'Idle-14', 'Idle-15', 'Idle-16'];

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloadScene'
    })
  }

  preload() {
    this.load.image('end', 'assets/home.png');
    const mapElements = ['1', '2', '3', '4', '5', '6', '14', '15', '16',];
    mapElements.forEach(img => {
      this.load.image(img, `assets/${img}.png`);
    });

    this.load.video('story', 'assets/story.mp4');
    this.load.audio('story-audio', 'assets/story-audio.mp3');
    this.load.image('crystal', 'assets/Crystal.png');
    this.load.image('sign-2', 'assets/Sign_2.png');
    this.load.image('sign-1', 'assets/Sign_1.png');
    this.load.image('stone', 'assets/Stone.png');
    this.load.image('tree-group', 'assets/Tree_1.png');
    this.load.image('tree', 'assets/Tree_2.png');
    this.load.image('reindeer', 'assets/reindeer.png');

    santaElementsWalk.forEach(img => {
      this.load.image(img, `assets/${img}.png`)
    });

    santaElementsIdle.forEach(img => {
      this.load.image(img, `assets/${img}.png`)
    });

    this.load.image('background', `assets/background.jpg`);
    this.load.image('santa', `assets/Santa.png`);
    this.load.image('gift', `assets/gift.png`);
    this.load.image('snowman', `assets/SnowMan.png`);
    this.load.image('tank', `assets/tank.png`);
    this.load.image('snowflake', `assets/snowflake.png`);
    this.load.image('menu-background', 'assets/menu-back.jpg');
    this.load.image('button', 'assets/button.png');
  }

  create() {
    this.scene.start('MenuScene')
  }
}
