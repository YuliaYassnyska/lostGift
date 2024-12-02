import EnemyClass from './enemyClass';

export default class SnowmanSprite extends EnemyClass {
  text: Phaser.GameObjects.Text | null = null;
  isAppearing: boolean = false;
  moveDirection: number = 1; 
  tileBounds: { x: number; width: number }; 

  constructor(scene: Phaser.Scene, x: number, y: number, tileWidth: number) {
    super(scene, x, y, 'snowman');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5, 1).setScale(0.8);
    //@ts-ignore
    this.body.setSize(this.width - 40, this.height - 20);
    this.body.setOffset(20, 20);

    this.alpha = 0;
    this.body.enable = false;

    this.tileBounds = { x: x - tileWidth / 2, width: tileWidth };

    this.startAppearDisappearCycle();
  }

  private startAppearDisappearCycle() {
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(3000, 8000),
      callback: () => {
        if (!this.dead) this.appear();
      },
      loop: true,
    });
  }

  private appear() {
    if (this.isAppearing || this.dead) return;

    this.isAppearing = true;
    this.alpha = 0;

    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 1000,
      onStart: () => {
        this.body.enable = true;
        this.startMovement();
        this.showText();
      },
      onComplete: () => {
        this.scene.time.addEvent({
          delay: 3000,
          callback: () => {
            this.stopMovement();
            this.disappear();
          },
        });
        this.isAppearing = false;
      },
    });
  }

  private disappear() {
    if (this.isAppearing || this.dead) return;

    this.isAppearing = true;
    this.hideText();

    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        this.body.enable = false;
        this.isAppearing = false;
      },
    });
  }

  private showText() {
    if (this.text) this.text.destroy();
    this.text = this.scene.add.text(this.x, this.y - 50, 'Сніговик слідкує за тобою', {
      font: '20px Arial',
      //@ts-ignore
      fill: '#BFECFF',
      stroke: '#000000',
      strokeThickness: 4,
      align: 'center',
    }).setOrigin(0.5);
  }

  private hideText() {
    if (this.text) {
      this.text.destroy();
      this.text = null;
    }
  }

  private startMovement() {
    this.scene.time.addEvent({
      delay: 30,
      callback: () => {
        const body = this.body as Phaser.Physics.Arcade.Body;

        if (this.x <= this.tileBounds.x) {
          this.moveDirection = 1;
          this.setFlipX(false);
        } else if (this.x >= this.tileBounds.x + this.tileBounds.width) {
          this.moveDirection = -1;
          this.setFlipX(true);
        }

        body.setVelocityX(this.moveDirection * 50);
      },
      loop: true,
    });
  }

  private stopMovement() {
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocityX(0);
  }

  kill() {
    if (this.dead) return;
    
    this.dead = true;
    this.isAppearing = false;
    if (this.text) this.text.destroy();

    this.scene.tweens.killTweensOf(this);
    this.scene.time.removeAllEvents();
    this.stopMovement();
    this.removeEnemy();
  }
}
