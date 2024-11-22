import TankSprite from './tank';
import { TilesConfig } from '../types/types';

export default class EnemiesGroup extends Phaser.GameObjects.Group {
  tiles: TilesConfig[]
  TILE_SIZE = 96
  constructor(scene: Phaser.Scene, tilesConfig: TilesConfig[]) {
    super(scene)

    this.tiles = tilesConfig.filter(tile => tile.type === 'tile')
    let enemyTypes = tilesConfig.filter(tile => tile.type === 'enemy')

    let enemies: Array<TankSprite> = []
    enemyTypes.forEach(enemy => {
      switch (enemy.texture) {
        case 'tank':
          enemies.push(new TankSprite(scene, enemy.x, enemy.y))
          break
      }
    })
    this.addMultiple(enemies)
  }

  update() {
    this.children.iterate((enemy: Phaser.GameObjects.GameObject) => {
      if (!(enemy instanceof TankSprite)) return true;
  
      const body = enemy.body as Phaser.Physics.Arcade.Body;
  
      if (enemy.dead) return true; 
  
      let enemyIsMovingRight = body.velocity.x >= 0;
  
      let hasGroundDetection = this.tiles.filter(tile => {
        let enemyPositionX = enemyIsMovingRight ? body.right : body.left;
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
