export default class Reindeer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'reindeer');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.08);
    this.setOrigin(0, 0.3);
    this.setFrame(10);
    (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
  }

  triggerMagicEffect() {
    this.scene.cameras.main.flash(500, 255, 255, 255);

    const blindEffect = this.scene.add.rectangle(
      0,
      0,
      this.scene.scale.width + 10,
      this.scene.scale.height + 10,
      0x000000,
      1
    );
    blindEffect.setOrigin(0, 0);
    blindEffect.setScrollFactor(0);
    blindEffect.setDepth(1000);

    const messageText = this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY,
      'Ну ти і олень)))',
      {
        font: '48px Arial',
        color: '#ffffff',
        stroke: '#000',
        strokeThickness: 4,
      }
    );
    messageText.setOrigin(0.5).setDepth(1001);

    this.scene.tweens.add({
      targets: blindEffect,
      alpha: 0,
      duration: 1000,
      delay: 3000,
      onComplete: () => {
        blindEffect.destroy();
        messageText.destroy(); 
      },
    });

    this.destroy();
  }
}
