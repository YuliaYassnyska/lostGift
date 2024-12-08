import EnemyClass from './enemyClass';

export default class StarSprite extends EnemyClass {
  private santa: Phaser.GameObjects.Sprite;
  private isFalling: boolean = false;
  private fallDelay: Phaser.Time.TimerEvent | null = null;
  private hitGround: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    santa: Phaser.GameObjects.Sprite
  ) {
    super(scene, x, y, 'star');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.santa = santa;
    this.setOrigin(0.5, 1);
    this.setScale(0.2);
    this.body.setSize(this.width - 40, this.height - 20);
    this.body.setOffset(20, 20);

    this.setAlpha(1);
    // @ts-ignore
    this.body.setAllowGravity(false);
  }

  update() {
    if (
      !this.isFalling &&
      Math.abs(this.santa.x - this.x) < 50 &&
      this.santa.y > this.y
    ) {
      if (this.fallDelay === null) {
        this.fallDelay = this.scene.time.delayedCall(
          300,
          this.startFalling,
          [],
          this
        );
      }
    }

    if (this.isFalling && !this.hitGround) {
      this.rotation += 0.05;

      if (this.body && this.body.blocked.down) {
        this.hitGround = true;
        this.stopFalling();
      }
    }
  }

  private startFalling() {
    this.isFalling = true;
    // @ts-ignore
    this.body.setAllowGravity(true);
    // @ts-ignore
    this.body.setVelocityY(100);
    this.setAlpha(0.5);
  }

  private stopFalling() {
    // @ts-ignore
    this.body.setVelocityY(0);
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 300,
      onComplete: () => {
        this.removeEnemy();
      },
    });
  }

  kill() {
  }
}
