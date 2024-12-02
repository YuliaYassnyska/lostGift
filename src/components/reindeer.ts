export default class Reindeer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'reindeer');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.15);
    this.setOrigin(0, 0.5);
    (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
  }

  triggerMagicEffect() {
    this.scene.cameras.main.flash(500, 255, 255, 255);
  }
}
