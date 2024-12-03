export default class LiftSprite extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, offset: number) {
    super(scene, x, y, 'life');
    scene.add.existing(this);
    this.setScale(2);

    this.setPosition(scene.cameras.main.width - this.width / 2 - offset - 20, this.height / 2 + 20);

    this.setScrollFactor(0);
  }
}
