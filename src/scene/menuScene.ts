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

    const header = this.add.text(this.cameras.main.centerX, this.cameras.main.y + 120, '🎁 Lost Gift 🎁', {
      font: '128px Red Hat Display, sans-serif',
      // @ts-ignore
      fill: 'rgba(22, 119, 255, 0.32)',
      stroke: '#fff',
      strokeThickness: 3
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

    const level1Button = this.add.sprite(centerX, centerY - buttonSpacing, 'button').setInteractive();
    level1Button.setScale(0.5)
    level1Button.on('pointerdown', () => {
      this.tweens.add({
        targets: level1Button,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => this.startLevel(1),
      });
    });
    this.add
      .text(level1Button.x, level1Button.y - 5, 'Level 1', {
        fontSize: '36px',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2
      })
      .setOrigin(0.5);

    const level2Button = this.add.sprite(centerX, centerY, 'button').setInteractive();
    level2Button.on('pointerdown', () => {
      this.tweens.add({
        targets: level2Button,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => this.startLevel(2),
      });
    });
    level2Button.setScale(0.5)

    this.add
      .text(level2Button.x, level2Button.y - 5, 'Level 2', {
        fontSize: '36px',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2
      })
      .setOrigin(0.5);
    const level3Button = this.add.sprite(centerX, centerY + buttonSpacing, 'button').setInteractive();
    level3Button.on('pointerdown', () => {
      this.tweens.add({
        targets: level3Button,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => this.startLevel(3),
      });
    });
    level3Button.setScale(0.5)

    this.add
      .text(level3Button.x, level3Button.y - 5, 'Level 3', {
        fontSize: '36px',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2
      })
      .setOrigin(0.5);

    const story = this.add.sprite(centerX, centerY + buttonSpacing + buttonSpacing, 'button').setInteractive();
    story.on('pointerdown', () => {
      this.tweens.add({
        targets: story,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => this.scene.start('VideoScene'),
      });
    });
    story.setScale(0.5)

    this.add
      .text(story.x, story.y - 5, 'Game story', {
        fontSize: '36px',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2
      })
      .setOrigin(0.5);


    this.scale.on('resize', () => {
      this.background.adjustPosition();
    });
  }

  startLevel(level: number) {
    this.scene.start('MainScene', { level });
  }
}
