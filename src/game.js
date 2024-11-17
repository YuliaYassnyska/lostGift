import Phaser from 'phaser';

import background from './assets/background.jpg';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: '100%', 
    height: '100%',
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('background', background);
}

function create() {
  const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);

  const scaleX = this.scale.width / bg.width;
  const scaleY = this.scale.height / bg.height;
  bg.setScale(Math.max(scaleX, scaleY));
}

function update() {
}
