import 'phaser';

import MainScene from './scene/mainScene';
import PreloadScene from './scene/preloadScene';
import MenuScene from './scene/menuScene';
import VideoScene from './scene/storyScene';
import GameOverScene from './scene/gameOver';
import FinishScene from './scene/finishScene';
import EnemiesScene from './scene/enemiesScene';
import LevelsScene from './scene/levesScene';
import SettingsScene from './scene/settingsScene';

type scaleMode = 'FIT' | 'SMOOTH';

const DEFAULT_WIDTH: number = 1280;
const DEFAULT_HEIGHT: number = 720;
const MAX_WIDTH: number = DEFAULT_WIDTH * 1.5;
const MAX_HEIGHT: number = DEFAULT_HEIGHT * 1.5;
let SCALE_MODE: scaleMode = 'SMOOTH';

window.addEventListener('load', () => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: '#ffffff',
    parent: 'phaser-game',
    scale: {
      mode: Phaser.Scale.NONE,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    },
    scene: [
      PreloadScene,
      MenuScene,
      VideoScene,
      MainScene,
      GameOverScene,
      FinishScene,
      EnemiesScene,
      LevelsScene,
      SettingsScene,
    ],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { x: 0, y: 2500 },
      },
    },
  };

  const game = new Phaser.Game(config);

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    let width = DEFAULT_WIDTH;
    let height = DEFAULT_HEIGHT;
    let maxWidth = MAX_WIDTH;
    let maxHeight = MAX_HEIGHT;
    let scaleMode = SCALE_MODE;

    let scale = Math.min(w / width, h / height);
    let newWidth = Math.min(w / scale, maxWidth);
    let newHeight = Math.min(h / scale, maxHeight);

    let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT;
    let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT;
    let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT;

    let smooth = 1;
    if (scaleMode === 'SMOOTH') {
      const maxSmoothScale = 1.15;
      const normalize = (value: number, min: number, max: number) => {
        return (value - min) / (max - min);
      };
      if (width / height < w / h) {
        smooth =
          -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) /
            (1 / (maxSmoothScale - 1)) +
          maxSmoothScale;
      } else {
        smooth =
          -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) /
            (1 / (maxSmoothScale - 1)) +
          maxSmoothScale;
      }
    }

    game.scale.resize(newWidth * smooth, newHeight * smooth);

    game.canvas.style.width = newWidth * scale + 'px';
    game.canvas.style.height = newHeight * scale + 'px';

    game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`;
    game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`;
  };
  window.addEventListener('resize', () => {
    resize();
  });
  resize();
});
