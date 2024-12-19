import EnemyClass from './enemyClass';
import Santa from './santa';

export default class FreezeEnemySprite extends EnemyClass {
  private stopTimer: Phaser.Time.TimerEvent | null = null;
  private _isAttacking: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'wizard');
    this.play('wizard-walk');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    //@ts-ignore
    this.body.setVelocityX(-60);
    this.setOrigin(0.5, 1);
    this.setScale(0.4);
    this.body.setSize(this.width - 80, this.height);
    this.body.setOffset(0, -20);

    this.startStopBehavior();
  }

  freezeSanta(santa: Santa) {
    if (this._dead || this._isAttacking) return;
    this._isAttacking = true;

    santa.isFrozen = true;
    santa.setVelocity(0, 0);
    santa.anims.stop();
    santa.setAlpha(0.5);
    this.play('wizard-attack');
    // @ts-ignore
    this.scene.createIcicleAnimation();
    const attackCompleteHandler = (animation: Phaser.Animations.Animation) => {
      if (animation.key === 'wizard-attack') {
        this.off(
          Phaser.Animations.Events.ANIMATION_COMPLETE,
          attackCompleteHandler
        );
        this.play('wizard-dead');

        const deathCompleteHandler = (
          deadAnimation: Phaser.Animations.Animation
        ) => {
          if (deadAnimation.key === 'wizard-dead') {
            this.off(
              Phaser.Animations.Events.ANIMATION_COMPLETE,
              deathCompleteHandler
            );
            this.removeEnemy();
          }
        };

        this.once(
          Phaser.Animations.Events.ANIMATION_COMPLETE,
          deathCompleteHandler
        );
      }
    };

    this.once(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      attackCompleteHandler
    );

    this.scene.time.delayedCall(5000, () => {
      santa.play('idle');
      santa.setAlpha(1);
      santa.isFrozen = false;
    });
  }


  handleOverlap(santa: Santa) {
    if (!this._dead) {
      this.freezeSanta(santa);
    }
  }

  startStopBehavior() {
    this.stopTimer = this.scene.time.addEvent({
      delay: 4000,
      loop: true,
      callback: this.toggleStop,
      callbackScope: this,
    });
  }

  toggleStop() {
    if (this.body.velocity.x !== 0) {
      //@ts-ignore
      this.body.setVelocityX(0);
      //@ts-ignore
      this.body.setVelocityY(0);
      //@ts-ignore
      this.body.setAllowGravity(false);
      this.play('wizard-idle');
      this.setFlipX(this.body.velocity.x < 0);
    } else {
      if (this.body.blocked.down || this.body.touching.down) {
        //@ts-ignore
        this.body.setVelocityX(-60);
        this.play('wizard-walk');
        this.setFlipX(true);
        //@ts-ignore
        this.body.setAllowGravity(true);
      }
    }
  }

  removeEnemy() {
    if (this._dead) return;
    this._dead = true;

    if (this.stopTimer) {
      this.stopTimer.remove();
      this.stopTimer = null;
    }

    this.destroy();
  }

  destroy() {
    if (this.stopTimer) {
      this.stopTimer.remove();
      this.stopTimer = null;
    }
    super.destroy();
  }
}
