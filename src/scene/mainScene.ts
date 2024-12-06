import 'phaser';

import Background from '../components/background';
import Controls from '../controls/controls';
import Map from '../components/map';
import TilesGroup from '../components/tilesGroup';
import { TilesConfig } from '../types/types';
import MiniMap from '../components/miniMap';
import Santa from '../components/santa';
import GiftGroup from '../components/giftGroup';
import GiftSingle from '../components/giftSingle';

export default class MainScene extends Phaser.Scene {
  background: Background;
  level: number;
  controls: Controls;
  tilesGroup: TilesGroup;
  miniMap: MiniMap;
  santa: Santa;
  cursors: Phaser.Input.Keyboard.CursorKeys;

  constructor() {
    super({
      key: 'MainScene',
    });
  }

  init(props: { level?: number }) {
    const { level = 0 } = props;
    this.level = Map.calcCurrentLevel(level);
  }

  create() {
    const map = new Map(this.level);

    this.cameras.main.setBackgroundColor('#ade6ff');
    this.cameras.main.fadeIn();

    this.cameras.main.setBounds(
      map.size.x,
      map.size.y,
      map.size.width,
      map.size.height
    );
    this.physics.world.setBounds(
      map.size.x,
      map.size.y,
      map.size.width,
      map.size.height
    );

    this.input.addPointer(1);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(
      map.size.x,
      map.size.y + 70,
      map.size.width,
      map.size.height
    );
    this.physics.world.setBounds(
      map.size.x,
      map.size.y,
      map.size.width,
      map.size.height
    );

    this.background = new Background(this);
    this.controls = new Controls(this);
    this.tilesGroup = new TilesGroup(
      this,
      map.info.filter((el: TilesConfig) => el.type === 'tile')
    );
    this.santa = new Santa(
      this,
      map.info.filter((el: TilesConfig) => el.type === 'santa')[0],
      map.size
    );
    const giftGroup = new GiftGroup(
      this,
      map.info.filter((el: TilesConfig) => el.type === 'gift')
    );

    this.cameras.main.startFollow(this.santa);

    this.physics.add.collider(this.tilesGroup, this.santa);
    this.physics.add.overlap(this.santa, giftGroup, (_, gift) => {
      if (gift instanceof GiftSingle) gift.collect();
    });

    this.miniMap = new MiniMap(
      this,
      10,
      10,
      Math.min(map.size.width / 8, (map.size.height / 8) * 2.5),
      map.size.height / 8,
      map
    );
    this.miniMap.setIgnore([
      this.background,
      this.controls.buttons.up,
      this.controls.buttons.left,
      this.controls.buttons.right,
    ]);
    this.miniMap.update(this.santa);
    // this.miniMap.update(this.player)

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
    this.santa.update(this.cursors, this.controls);
    this.miniMap.update(this.santa);
  }
}
