import { birdElements } from '../scene/preloadScene';
import EnemyClass from './enemyClass';

export default class FlyEnemySprite extends EnemyClass {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'fly-enemy');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(0.1);

    scene.anims.create({
      key: 'fly',
      frames: birdElements.map((img, index) => ({ key: img, frame: index })),
      frameRate: 16,
      repeat: -1,
    });

    this.play('fly');

    //@ts-ignore
    this.body.setVelocityX(-120);
    this.setOrigin(0.5, 1);
    this.body.setSize(this.width - 50, this.height - 30);
    this.body.setOffset(40, 400);
  }

  update() {}

  kill() {
    if (this.dead) return;
    this.body.setSize(80, 40);
    this.setFrame(2);
    this.removeEnemy();
  }
}
