export default class FinishBackground extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene, 0, 0, 'finish-background');
    scene.add.existing(this);

    this.setOrigin(0.5).setScrollFactor(0);
  }

  adjustPosition() {
    const camera = this.scene.cameras.main;

    const imgAspectRatio = this.width / this.height;
    const screenAspectRatio = camera.width / camera.height;

    if (screenAspectRatio > imgAspectRatio) {
      this.setScale(camera.width / this.width);
    } else {
      this.setScale(camera.height / this.height);
    }

    this.x = camera.centerX;
    this.y = camera.centerY;
  }
}
