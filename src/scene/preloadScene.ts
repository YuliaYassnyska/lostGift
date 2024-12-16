export const santaElementsWalk = ['SantaWalk-1', 'SantaWalk-2', 'SantaWalk-3', 'SantaWalk-4', 'SantaWalk-5', 'SantaWalk-6', 'SantaWalk-7', 'SantaWalk-8'];
export const santaElementsIdle = ['Idle-1', 'Idle-2', 'Idle-3', 'Idle-4', 'Idle-5', 'Idle-6', 'Idle-7', 'Idle-8', 'Idle-9', 'Idle-10', 'Idle-11', 'Idle-12', 'Idle-13', 'Idle-14', 'Idle-15', 'Idle-16'];
export const birdElements = ['bird-1', 'bird-2', 'bird-3', 'bird-4',];
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloadScene'
    })
  }

  preload() {
    this.load.image('end', 'assets/home.png');
    this.load.image('game-over-background', 'assets/game-over-background.jpg');
    this.load.image('enemies-background', 'assets/enemies-back.jpg');
    const mapElements = ['1', '2', '3', '4', '5', '6', '14', '15', '16',];
    mapElements.forEach(img => {
      this.load.image(img, `assets/${img}.png`);
    });

    this.load.video('story', 'assets/story.mp4');
    this.load.video('game-over', 'assets/game-over.mp4');
    this.load.video('finish', 'assets/finish.mp4');
    this.load.audio('story-audio', 'assets/story-audio.mp3');
    this.load.audio('game-over-audio', 'assets/game-over-audio.mp3');
    this.load.audio('menu-audio', 'assets/menu-audio.mp3');
    this.load.audio('finish-audio', 'assets/finish-audio.mp3');
    this.load.audio('game-audio', 'assets/game.mp3');
    this.load.image('crystal', 'assets/crystal.png');
    this.load.image('stone', 'assets/Stone.png');
    this.load.image('sign-2', 'assets/Sign_2.png');
    this.load.image('sign-1', 'assets/Sign_1.png');
    this.load.image('tree-group', 'assets/tree-white.png');
    this.load.image('deer', 'assets/deer.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('tree', 'assets/tree.png');
    this.load.image('reindeer', 'assets/reindeer.png');
    this.load.image('finish-background', 'assets/finish.jpg');
    this.load.image('a-button', 'assets/abutton.png');
    this.load.image('d-button', 'assets/dbutton.png');
    this.load.image('w-button', 'assets/wbutton.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('arrow', 'assets/arrow.png');

    santaElementsWalk.forEach(img => {
      this.load.image(img, `assets/${img}.png`)
    });

    santaElementsIdle.forEach(img => {
      this.load.image(img, `assets/${img}.png`)
    });

    
    birdElements.forEach(img => {
      this.load.image(img, `assets/${img}.png`);
    });

    this.load.image('background', `assets/background.jpg`);
    this.load.image('santa', `assets/Santa.png`);
    this.load.image('gift', `assets/gift.png`);
    this.load.image('snowman', `assets/SnowMan.png`);
    this.load.image('tank', `assets/tank.png`);
    this.load.image('snowflake', `assets/snowflake.png`);
    this.load.image('menu-background', 'assets/menu-back.jpg');
    this.load.image('button', 'assets/button.png');
    this.load.image('life', 'assets/life.png');
    this.load.image('elf', 'assets/elf.png');
  }

  create() {
    this.scene.start('MainScene')
  }
}
