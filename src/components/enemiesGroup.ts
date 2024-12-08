import TankSprite from './tank';
import SnowmanSprite from './snowman';
import { TilesConfig } from '../types/types';
import FlyEnemySprite from './flyEnemy';
import StarSprite from './star';

export default class EnemiesGroup extends Phaser.GameObjects.Group {
  tiles: TilesConfig[]
  TILE_SIZE = 96
  constructor(scene: Phaser.Scene, tilesConfig: TilesConfig[], santa: Phaser.GameObjects.Sprite) {
    super(scene)

    this.tiles = tilesConfig.filter(tile => tile.type === 'tile')
    let enemyTypes = tilesConfig.filter(tile => tile.type === 'enemy')

    let enemies: Array<TankSprite | SnowmanSprite | FlyEnemySprite | StarSprite> = []
    enemyTypes.forEach(enemy => {
      switch (enemy.texture) {
        case 'tank':
          enemies.push(new TankSprite(scene, enemy.x, enemy.y))
          break
        case 'snowman':
          enemies.push(new SnowmanSprite(scene, enemy.x, enemy.y, this.TILE_SIZE))
          break
        case 'fly-enemy':
          enemies.push(new FlyEnemySprite(scene, enemy.x, enemy.y))
          break
        case 'star':
          const star = new StarSprite(scene, enemy.x, enemy.y, santa);
          enemies.push(star);
          scene.events.on('update', () => star.update());
          break
      }
    })
    this.addMultiple(enemies)
  }

  update() {
    this.children.iterate((enemy: TankSprite | SnowmanSprite | FlyEnemySprite | StarSprite) => {

      const body = enemy.body as Phaser.Physics.Arcade.Body;

      if (enemy.dead) return true;

      let enemyIsMovingRight = body.velocity.x <= 0;

      let hasGroundDetection = this.tiles.filter(tile => {
        let enemyPositionX = enemyIsMovingRight ? body.left : body.right;
        let x =
          enemyPositionX + 32 > tile.x &&
          enemyPositionX - 32 < tile.x + this.TILE_SIZE;
        let y =
          body.bottom + this.TILE_SIZE / 2 > tile.y &&
          body.bottom + this.TILE_SIZE / 2 < tile.y + this.TILE_SIZE;
        return x && y;
      });


      if (hasGroundDetection.length === 0) {
        body.setVelocityX(body.velocity.x * -1);
        enemy.setFlipX(!enemyIsMovingRight);
      }

      return true;
    });
  }
}
