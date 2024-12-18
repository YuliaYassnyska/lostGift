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
      T: {
        type: 'enemy',
        texture: 'tank'
      },
      M: {
        type: 'enemy',
        texture: 'snowman',
      },
      S: {
        type: 'santa',
        texture: 'santa',
      },
      C: {
        type: 'decor',
        texture: 'crystal',
      },
      I: {
        type: 'decor',
        texture: 'sign-2',
      },
      '3': {
        type: 'decor',
        texture: 'sign-1',
      },
      '4': {
        type: 'decor',
        texture: 'stone',
      },
      '5': {
        type: 'decor',
        texture: 'tree-group',
      },
      '6': {
        type: 'decor',
        texture: 'tree',
      },
      '7': {
        type: 'decor',
        texture: 'deer',
      },
      '8': {
        type: 'decor',
        texture: 'ball',
      },
      E: {
        type: 'end',
        texture: 'end',
      },
      R: {
        type: 'reindeer',
        texture: 'reindeer',
      },
      B: {
        type: 'enemy',
        texture: 'fly-enemy',
      },
      A: {
        type: 'enemy',
        texture: 'star',
      },
      W: {
        type: 'enemy',
        texture: 'wizard',
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
