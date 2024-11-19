import { TilesConfig, MapSize } from '../types/types';
import Levels from './levels';

export default class Map {
  info: TilesConfig[];
  size: MapSize;

  public static calcCurrentLevel(currentLevel: number) {
    const MAX_LEVELS = Levels.length;
    return currentLevel % MAX_LEVELS;
  }

  constructor(currentLevel: number) {
    const TILE_SIZE = 96;
    const config: any = {
      '[': {
        type: 'tile',
        texture: '1',
      },
      '/': {
        type: 'tile',
        texture: '2',
      },
      ']': {
        type: 'tile',
        texture: '3',
      },
      '{': {
        type: 'tile',
        texture: '4',
      },
      '~': {
        type: 'tile',
        texture: '5',
      },
      '}': {
        type: 'tile',
        texture: '6',
      },
      '*': {
        type: 'tile',
        texture: '14',
      },
      '1': {
        type: 'tile',
        texture: '15',
      },
      '2': {
        type: 'tile',
        texture: '16',
      },
      G: {
        type: 'gift',
        texture: 'gift',
      },
      //   O: {
      //     type: 'coin',
      //     texture: 'coin'
      //   },
      //   B: {
      //     type: 'enemy',
      //     texture: 'bee'
      //   },
      S: {
        type: 'santa',
        texture: 'santa',
      },
    };

    const map = Levels[Map.calcCurrentLevel(currentLevel)];

    const paddingTop = 4 * TILE_SIZE;

    this.size = {
      x: 0,
      y: 0,
      width: map[0].length * TILE_SIZE,
      height: map.length * TILE_SIZE + paddingTop,
    };
    this.info = [];

    map.forEach((row, y) => {
      for (let i = 0; i < row.length; i++) {
        const tile = row.charAt(i);
        const x = i;
        if (tile !== ' ') {
          let info = {
            ...config[tile.toString()],
            x: x * TILE_SIZE,
            y: y * TILE_SIZE + paddingTop,
          };
          this.info.push(info);
        }
      }
    });
  }
}
