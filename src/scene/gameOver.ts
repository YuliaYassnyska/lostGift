import GameOverBackground from "../components/gameOverBackground";

export default class GameOverScene extends Phaser.Scene {
  background: GameOverBackground;
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    this.background = new GameOverBackground(this);
    this.background.adjustPosition();
    const { width, height } = this.cameras.main;
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const video = this.add.video(centerX, centerY, 'game-over');
    const music = this.sound.add('game-over-audio');

    video.play();
    music.play();

    video.on('complete', () => {
      music.stop();
      this.scene.start('MenuScene');
    });

    this.add
      .text(width / 2, 50, 'Game Over', {
        font: '60px Red Hat Display, sans-serif',
        color: '#ff0000',
        stroke: '#fff',
        strokeThickness: 4
      })
      .setOrigin(0.5);

    const playButton = this.add
      .text(width / 2, height / 2 + 350, 'Press Enter to Skip', {
        font: '30px Red Hat Display, sans-serif',
        color: '#667BC6',
        stroke: '#fff',
        strokeThickness: 4
      })
      .setOrigin(0.5);

    playButton.setInteractive();

    this.input.keyboard.on('keydown-ENTER', () => {
      music.stop();
      video.stop();
      this.scene.start('MenuScene');
    });

    const resize = () => {
      this.background.adjustPosition();
    };

    this.scale.on('resize', (gameSize: any) => {
      this.cameras.main.width = gameSize.width;
      this.cameras.main.height = gameSize.height;
      resize();
    });

    resize();
  }
}
