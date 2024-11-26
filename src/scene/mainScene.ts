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
import { santaElements } from './preloadScene';
import EnemiesGroup from '../components/enemiesGroup';
import TankSprite from '../components/tank';
import LevelEnd from '../components/levelEnd';

export default class MainScene extends Phaser.Scene {
  background: Background;
  level: number;
  controls: Controls;
  tilesGroup: TilesGroup;
  miniMap: MiniMap;
  santa: Santa;
  cursors: Phaser.Input.Keyboard.CursorKeys;
  enemiesGroup: EnemiesGroup;
  levelEnd: LevelEnd;

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

    this.cursors = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.anims.create({
      key: 'walk',
      frames: santaElements.map((img, index) => ({ key: img, frame: index })),
      frameRate: 8,
      repeat: -1,
    });

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

    this.background = new Background(this);
    this.controls = new Controls(this);
    this.tilesGroup = new TilesGroup(
      this,
      map.info.filter((el: TilesConfig) => el.type === 'tile')
    );
    this.levelEnd = new LevelEnd(this, map.info.filter((el: TilesConfig) => el.type === 'end')[0]);
    this.santa = new Santa(
      this,
      map.info.filter((el: TilesConfig) => el.type === 'santa')[0],
      map.size
    );
    const giftGroup = new GiftGroup(
      this,
      map.info.filter((el: TilesConfig) => el.type === 'gift')
    );
    this.enemiesGroup = new EnemiesGroup(this, map.info);

    this.cameras.main.startFollow(this.santa);

    this.physics.add.collider(this.tilesGroup, this.santa);
    this.physics.add.collider(this.tilesGroup, this.enemiesGroup);


    this.physics.add.overlap(this.santa, this.enemiesGroup, (santa: Santa, enemy: TankSprite) => {
      if (enemy.dead) return
      if (enemy.body.touching.up && santa.body.touching.down) {
        santa.killEnemy()
        enemy.kill()
      } else {
        santa.kill()
      }
    })

    this.physics.add.overlap(this.santa, giftGroup, (_, gift) => {
      if (gift instanceof GiftSingle) gift.collect();
    });
    // @ts-ignore
    this.physics.add.overlap(this.santa, this.levelEnd, (santa: Santa, levelEnd: LevelEnd) => {
      santa.halt()
      levelEnd.nextLevel(this, this.level)
    })

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
    this.controls.update();
    this.santa.update(this.cursors, this.controls);
    this.miniMap.update(this.santa);
    this.enemiesGroup.update();
  }
}
