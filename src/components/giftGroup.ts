import GiftSingle from './giftSingle';
import { TilesConfig } from '../types/types';

export default class GiftGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene, tiles: TilesConfig[]) {
    super(scene)

    tiles.forEach(tile => {
      this.add(new GiftSingle(scene, tile))
    })
  }
}
