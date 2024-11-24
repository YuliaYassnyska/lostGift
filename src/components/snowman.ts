import EnemyClass from './enemyClass';

export default class SnowmanSprite extends EnemyClass {
  text: Phaser.GameObjects.Text; // Текстове повідомлення

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'snowman');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5, 1).setScale(1);
    //@ts-ignore
    this.body.setVelocityX(-60);
    this.body.setSize(this.width - 40, this.height - 20);
    this.body.setOffset(20, 20);

    this.dead = false;
    this.alpha = 0; 

    this.appearDisappearCycle();
  }

  appear() {
    this.alpha = 0; 
    this.setPosition(Phaser.Math.Between(100, this.scene.cameras.main.width - 100), Phaser.Math.Between(100, this.scene.cameras.main.height - 100));

    this.text = this.scene.add.text(this.x, this.y - 50, 'Сніговик слідкує за тобою', {
      font: '20px Arial',
      //@ts-ignore
      fill: '#BFECFF',
      stroke: '#000000',
      strokeThickness: 4,
      align: 'center'
    }).setOrigin(0.5);

    this.scene.tweens.add({
      targets: this,
      alpha: { from: 0, to: 1 },
      duration: 1000,
      onStart: () => {
        this.body.enable = true; 
      },
    });

    this.scene.time.addEvent({
      delay: 2000, 
      callback: () => {
        if (this.text) this.text.destroy(); 
      }
    });
  }

  disappear() {
    this.scene.tweens.add({
      targets: this,
      alpha: { from: 1, to: 0 },
      duration: 1000,
      onComplete: () => {
        this.body.enable = false; 
      },
    });
  }

  
  appearDisappearCycle() {
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(4000, 8000), 
      callback: () => {
        if (!this.dead) {
          this.appear(); 
          this.scene.time.addEvent({
            delay: 3000, 
            callback: () => {
              if (!this.dead) this.disappear(); 
            },
          });
        }
      },
      loop: true,
    });
  }

  kill() {
    if (this.dead) return;
    this.dead = true;
    this.setFrame(30); 
    this.removeEnemy();
  }
}
