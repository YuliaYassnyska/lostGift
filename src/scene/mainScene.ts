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
import { santaElementsIdle, santaElementsWalk } from './preloadScene';
import EnemiesGroup from '../components/enemiesGroup';
import TankSprite from '../components/tank';
import LevelEnd from '../components/levelEnd';
import DecorationsGroup from '../components/decorGroup';
import Reindeer from '../components/reindeer';
import LiftSprite from '../components/life';

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
  decorationsGroup: DecorationsGroup;
  lives: number = 3;
  lifeSprites: LiftSprite[] = [];
  totalGifts: number = 0;
  collectedGifts: number = 0;
  giftText: Phaser.GameObjects.Text;

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
    this.totalGifts = map.info.filter((el: TilesConfig) => el.type === 'gift').length;
    this.giftText = this.add.text(0 , 0, `Подарунки: ${this.collectedGifts} / ${this.totalGifts}`, {
      font: '30px Red Hat Display, sans-serif',
      color: '#7BD3EA',
      stroke: '#fff',
      strokeThickness: 8
    });
    this.giftText.setDepth(100);
    this.adjustGiftTextPosition();

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
      frames: santaElementsWalk.map((img, index) => ({ key: img, frame: index })),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: santaElementsIdle.map((img, index) => ({ key: img, frame: index })),
      frameRate: 16,
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
    this.decorationsGroup = new DecorationsGroup(this, map.info);
    const reindeerConfig = map.info.find((el: TilesConfig) => el.type === 'reindeer');
    this.lifeSprites = [];
    this.updateLives();
    let reindeer: Reindeer | null = null;
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
        santa.kill();
        this.collectedGifts = 0;
      }
    })

    this.physics.add.overlap(this.santa, giftGroup, (_, gift) => {
      if (gift instanceof GiftSingle && !gift.collecting) {
        this.collectedGifts += 1;
        gift.collect();
        this.updateGiftText();
      }
    });

    this.physics.add.overlap(this.santa, this.levelEnd, (santa: Santa, levelEnd: LevelEnd) => {
      if (this.collectedGifts === this.totalGifts) {
        santa.halt()
        levelEnd.nextLevel(this, this.level);
        this.collectedGifts = 0;
      } else {
        this.showMissingGiftsMessage();
      }
    })
    if (reindeerConfig) {
      reindeer = new Reindeer(this, reindeerConfig.x, reindeerConfig.y);
      this.physics.add.overlap(this.santa, reindeer, (_, reindeer: Reindeer) => {
        reindeer.triggerMagicEffect();
        reindeer.destroy();
      });
      this.physics.add.collider(this.tilesGroup, reindeer);
    }

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
      this.giftText,
      ...this.lifeSprites
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

  adjustGiftTextPosition() {
    const padding = 30; 
  
    this.giftText.setPosition(
      this.cameras.main.width - this.giftText.width - padding,
      padding + 50
    );

    this.giftText.setScrollFactor(0);
  }

  update() {
    this.background.parallax();
    this.controls.update();
    this.santa.update(this.cursors, this.controls);
    this.miniMap.update(this.santa);
    this.enemiesGroup.update();
    this.decorationsGroup.update();
  }

  updateLives(reset: boolean = false) {
    if (reset) {
      this.lives = 3;
    }

    this.lifeSprites.forEach(sprite => sprite.destroy());
    this.lifeSprites = [];

    for (let i = 0; i < this.lives; i++) {
      const offset = i * 50;
      const lifeSprite = new LiftSprite(this, 0, 0, offset);
      this.lifeSprites.push(lifeSprite);
    }
  }

  updateGiftText() {
    this.giftText.setText(`Подарунки: ${this.collectedGifts} / ${this.totalGifts}`);
  }

  showMissingGiftsMessage() {
    const message = this.add.text(this.cameras.main.width - 190, 150, 'Збери усі подарунки!', {
      font: '32px Arial',
      color: '#ff0000',
      stroke: '#fff',
      strokeThickness: 8
    }).setOrigin(0.5);
    message.setScrollFactor(0);
    this.time.delayedCall(2000, () => message.destroy());
  }

  handleSantaDeath() {
    this.lives--;
    this.updateLives();
    this.collectedGifts = 0;

    if (this.lives <= 0) {
      this.gameOver();
    } else {
      this.scene.restart({ level: this.level });
    }
  }

  gameOver() {
    this.updateLives(true);
    this.scene.start('GameOverScene');
  }
}
