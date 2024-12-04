import { TilesConfig } from '../types/types';

export default class GiftSingle extends Phaser.Physics.Arcade.Sprite {
  collecting: boolean = false

  constructor(scene: Phaser.Scene, config: TilesConfig) {
    super(scene, config.x + 48, config.y + 48, config.texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setImmovable();
    this.setScale(0.15);
    (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

    this.scene.tweens.add({
      targets: this,
      angle: 30,  
      duration: 500, 
      yoyo: true,  
      repeat: -1, 
      ease: 'Sine.easeInOut'
    });
  }

  collect() {
    if (this.collecting) return
    this.collecting = true
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      y: this.y - 100,
      duration: 500,
      ease: 'Power2',
      onComplete: this.destroy.bind(this)
    })
  }
}
