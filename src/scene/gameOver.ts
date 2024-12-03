export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add
      .text(width / 2, height / 2 - 50, 'Game Over', {
        font: '50px Arial',
        color: '#ff0000',
      })
      .setOrigin(0.5);

    const playButton = this.add
      .text(width / 2, height / 2 + 50, 'Return to Main Menu', {
        font: '30px Arial',
        color: '#000',
      })
      .setOrigin(0.5);

    playButton.setInteractive();

    playButton.on('pointerdown', () => {
      this.registry.set('lives', 3);
      this.scene.start('MenuScene');
    });
  }
}
