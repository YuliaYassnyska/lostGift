export default class VideoScene extends Phaser.Scene {
  constructor() {
    super('VideoScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#EDEBFF');
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const video = this.add.video(centerX, centerY, 'story');
    const music = this.sound.add('story-audio');

    video.setScale(0.9);

    video.play();
    music.play();

    video.on('complete', () => {
      music.stop();
      this.scene.start('MenuScene');
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      music.stop();
      video.stop();
      this.scene.start('MenuScene');
    });

    this.add
      .text(centerX, this.cameras.main.height - 50, 'Нажми Enter для пропуску', {
        font: '26px Red Hat Display',
        color: 'rgb(22, 119, 255)',
        stroke: '#fff',
        strokeThickness: 4,
      })
      .setOrigin(0.5);
  }
}
