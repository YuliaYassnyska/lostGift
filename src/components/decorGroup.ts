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
      if (tile.texture === 'tree-group') {
        tileY = tile.y - 60;
      } else if (tile.texture === 'tree') {
        tileY = tile.y - 60;
      } else if (tile.texture === 'deer') {
        tileY = tile.y + 10;
      } else if (tile.texture === 'ball') {
        tileY = tile.y + 40;
      } else {
        tileY = tile.y + 70;
      }

      const decoration = new DecorationSprite(scene, tile.x, tileY, tile.texture);

      if (tile.texture === 'tree') {
        decoration.setScale(0.7);

        this.scene.tweens.add({
          targets: decoration,
          scaleX: 0.65,
          scaleY: 0.75,
          duration: 500,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
        });
      }
      if (tile.texture === 'crystal') {
        decoration.setScale(0.2);
      }

      if (tile.texture === 'deer') {
        decoration.setScale(0.5);
      }

      if (tile.texture === 'ball') {
        decoration.setScale(0.3);
        decoration.setPipeline('Light2D');

        const globeLight = this.scene.lights.addLight(
          decoration.x,
          decoration.y,
          200
        ).setColor(0xffffff).setIntensity(2);

        this.scene.tweens.add({
          targets: globeLight,
          x: { from: decoration.x - 50, to: decoration.x + 50 },
          duration: 2000,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      }

      if (tile.texture === 'tree-group') {
        decoration.setScale(0.7);
      }
      return decoration;
    });


    this.addMultiple(decorations);
  }

  update() {
    this.children.iterate(() => {
      return true;
    });
  }
}
