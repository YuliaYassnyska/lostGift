import 'phaser';

import Background from '../components/background';
import Controls from '../controls/controls';

export default class MainScene extends Phaser.Scene {
  background: Background;
  level: number;
  controls: Controls;

  constructor() {
    super({
      key: 'MainScene',
    });
  }

  preload() {
    this.load.image('background', '../assets/background.jpg');
  }

  create() {
    // const map = new Map(this.level);

    this.cameras.main.setBackgroundColor('#ade6ff');
    this.cameras.main.fadeIn();

    // this.cameras.main.setBounds(
    //   map.size.x,
    //   map.size.y,
    //   map.size.width,
    //   map.size.height
    // );
    // this.physics.world.setBounds(
    //   map.size.x,
    //   map.size.y,
    //   map.size.width,
    //   map.size.height
    // );

    // const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);

    // const scaleX = this.scale.width / bg.width;
    // const scaleY = this.scale.height / bg.height;
    // bg.setScale(Math.max(scaleX, scaleY));
    this.background = new Background(this);
    this.controls = new Controls(this);

    const resize = () => {
      this.controls.adjustPositions();
      this.background.adjustPosition();
    };

    this.scale.on('resize', (gameSize: any) => {
      this.cameras.main.width = gameSize.width;
      this.cameras.main.height = gameSize.height;
      resize();
    });

    resize();
  }

  update() {
    this.background.parallax();
  }
}
