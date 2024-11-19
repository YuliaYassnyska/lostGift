import TilesSingle from './tilesSingle';
import { TilesConfig } from '../types/types';

export default class TilesGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene, tiles: TilesConfig[]) {
    super(scene)

    tiles.forEach(tile => {
      this.add(new TilesSingle(scene, tile.x, tile.y, tile.texture))
    })
  }
}
