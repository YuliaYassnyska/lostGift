import EnemyClass from './enemyClass';

export default class TankSprite extends EnemyClass {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'tank')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    //@ts-ignore
    this.body.setVelocityX(-60)
    this.setOrigin(0.5, 1)
    this.setScale(0.4)
    this.body.setSize(this.width - 40, this.height - 20)
    this.body.setOffset(20, 20)
  }

  update() {}

  kill() {
    if (this.dead) return
    this.setFrame(5)
    this.removeEnemy()
  }
}
