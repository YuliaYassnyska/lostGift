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
      font: '128px Red Hat Display',
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
    levelsButton.on('pointerover', () => {
      levelsButton.setTint(0xCDC1FF); 
      this.input.setDefaultCursor('pointer');  
    });

    levelsButton.on('pointerout', () => {
      levelsButton.clearTint();  
      this.input.setDefaultCursor('default');  
    });

    this.add
      .text(levelsButton.x, levelsButton.y - 5, 'Почати', {
        fontSize: '36px Red Hat Display',
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

    story.on('pointerover', () => {
      story.setTint(0xCDC1FF); 
      this.input.setDefaultCursor('pointer');  
    });

    story.on('pointerout', () => {
      story.clearTint();  
      this.input.setDefaultCursor('default');  
    });

    this.add
      .text(story.x, story.y - 5, 'Передісторія', {
        fontSize: '36px Red Hat Display',
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
    enemies.on('pointerover', () => {
      enemies.setTint(0xCDC1FF); 
      this.input.setDefaultCursor('pointer');  
    });

    enemies.on('pointerout', () => {
      enemies.clearTint();  
      this.input.setDefaultCursor('default');  
    });
    enemies.setScale(0.5)

    this.add
      .text(enemies.x, enemies.y - 5, 'Вороги', {
        fontSize: '36px Red Hat Display',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2
      })
      .setOrigin(0.5);

    const settings = this.add.sprite(centerX, centerY + buttonSpacing + buttonSpacing, 'button').setInteractive();
    settings.on('pointerdown', () => {
      this.tweens.add({
        targets: settings,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => { this.scene.start('SettingsScene'); music.stop(); },
      });
    });
    settings.on('pointerover', () => {
      settings.setTint(0xCDC1FF); 
      this.input.setDefaultCursor('pointer');  
    });

    settings.on('pointerout', () => {
      settings.clearTint();  
      this.input.setDefaultCursor('default');  
    });
    settings.setScale(0.5)

    this.add
      .text(settings.x, settings.y - 5, 'Налаштування', {
        fontSize: '36px Red Hat Display',
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
