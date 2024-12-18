export default class MenuBackground extends Phaser.GameObjects.TileSprite {
  constructor(scene) {
    super(scene, 0, 0, 0, 0, 'menu-background');
    scene.add.existing(this);

    this.setOrigin(0.5).setScrollFactor(0);
  }

  adjustPosition() {
    const imgHeight = 800;
    this.setScale(this.scene.cameras.main.height / imgHeight)
    this.x = this.scene.cameras.main.centerX
    this.y = this.scene.cameras.main.centerY
    this.width = this.scene.cameras.main.width
  }
}
