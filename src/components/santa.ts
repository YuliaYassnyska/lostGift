import Controls from '../controls/controls';
import { MapSize, TilesConfig } from '../types/types';

export default class Santa extends Phaser.Physics.Arcade.Sprite {
  private _dead: boolean = false;
  private _halt: boolean = false;
  private mapSize: MapSize;

  constructor(
    scene: Phaser.Scene,
    santa: TilesConfig,
    mapSize: MapSize,
  ) {
    super(scene, santa.x, santa.y, santa.texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.mapSize = mapSize;

    this.setScale(0.5);
    this.setOrigin(0, 1);
    this.setDragX(1500);
    this.body.setSize(70, 132);
    this.body.setOffset(25, 24);
  }

  kill() {
    this._dead = true;

    this.scene.cameras.main.shake(500, 0.025);
    this.scene.time.addEvent({
      delay: 500,
      callback: () => this.scene.scene.restart(),
    });
  }

  killEnemy() {
    this.setVelocityY(-600);
  }

  halt() {
    this.body.enable = false;
    this._halt = true;
  }

  update(cursors: any, controls: Controls) {
    if (this._halt || this._dead) return;

    if (
      this.body.right < this.mapSize.x ||
      this.body.left > this.mapSize.width ||
      this.body.top > this.mapSize.height
    )
      this.kill();

    if (cursors.left.isDown || controls.leftIsDown) {
      this.setVelocityX(-500);
      this.setFlipX(true);
    } else if (cursors.right.isDown || controls.rightIsDown) {
      this.setVelocityX(550);
      this.setFlipX(false);
    }
    if (
      (cursors.up.isDown || cursors.space.isDown || controls.upIsDown) &&
      this.body.blocked.down
    ) {
      this.setVelocityY(-1250);
    }
  }
}
