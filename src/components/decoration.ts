export default class DecorationSprite extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
  }

//   blink() {
//     this.scene.tweens.add({
//       targets: this,
//       alpha: 0,
//       yoyo: true,
//       repeat: -1,
//       duration: 500,
//     });
//   }
}
