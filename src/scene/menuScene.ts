import MenuBackground from '../components/menuBackground';

export default class MenuScene extends Phaser.Scene {
  background: MenuBackground;
  constructor() {
    super('MenuScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#EDEBFF');
    this.background = new MenuBackground(this);
    this.background.adjustPosition();
    const music = this.sound.add('menu-audio');
    music.play();

    const header = this.add.text(this.cameras.main.centerX, this.cameras.main.y + 120, '🎁 Lost Gift 🎁', {
      font: '128px Red Hat Display, sans-serif',
      // @ts-ignore
      fill: 'rgba(22, 119, 255, 0.32)',
      stroke: '#fff',
      strokeThickness: 8
    });

    const gradient = header.context.createLinearGradient(
      -header.width,
      -header.height,
      header.width,
      header.height
    );

    gradient.addColorStop(0, 'rgb(22, 119, 255)');
    gradient.addColorStop(1, 'rgb(8, 199, 224)');

    header.setFill(gradient);

    header.setOrigin(0.5);

    this.tweens.add({
      targets: header,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    const buttonSpacing = 100;
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const levelsButton = this.add.sprite(centerX, centerY - buttonSpacing, 'button').setInteractive();
    levelsButton.setScale(0.5);
    levelsButton.on('pointerdown', () => {
      this.tweens.add({
        targets: levelsButton,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          this.scene.start('LevelsScene');
          music.stop();
        },
      });
    });

    this.add
      .text(levelsButton.x, levelsButton.y - 5, 'Почати', {
        fontSize: '36px',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2,
      })
      .setOrigin(0.5);


    const story = this.add.sprite(centerX, centerY, 'button').setInteractive();
    story.on('pointerdown', () => {
      this.tweens.add({
        targets: story,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => { this.scene.start('VideoScene'); music.stop(); },
      });
    });
    story.setScale(0.5)

    this.add
      .text(story.x, story.y - 5, 'Передісторія', {
        fontSize: '36px',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2
      })
      .setOrigin(0.5);

    const enemies = this.add.sprite(centerX, centerY + buttonSpacing, 'button').setInteractive();
    enemies.on('pointerdown', () => {
      this.tweens.add({
        targets: enemies,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => { this.scene.start('EnemiesScene'); music.stop(); },
      });
    });
    enemies.setScale(0.5)

    this.add
      .text(enemies.x, enemies.y - 5, 'Вороги', {
        fontSize: '36px',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2
      })
      .setOrigin(0.5);
  }

  startLevel(level: number) {
    this.scene.start('MainScene', { level });
  }
}
