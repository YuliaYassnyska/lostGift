import DecorationSprite from './decoration';
import { TilesConfig } from '../types/types';

export default class DecorationsGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene, tilesConfig: TilesConfig[]) {
    super(scene);

    const decorationsConfig = tilesConfig.filter(
      (tile) => tile.type === 'decor'
    );

    let tileY;

    const decorations: DecorationSprite[] = decorationsConfig.map((tile) => {
      if (tile.texture === 'tree-group' || tile.texture === 'tree') {
        tileY = tile.y - 40;
      } else {
        tileY = tile.y + 70;
      }
      return new DecorationSprite(scene, tile.x, tileY, tile.texture);
    });

    this.addMultiple(decorations);
  }

  update() {
    this.children.iterate((decoration: DecorationSprite) => {
      return true;
    });
  }
}
