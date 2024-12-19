import MenuBackground from '../components/menuBackground';

export default class LevelsScene extends Phaser.Scene {
  background: MenuBackground;

  constructor() {
    super('LevelsScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#EDEBFF');
    this.background = new MenuBackground(this);
    this.background.adjustPosition();
    const music = this.sound.add('menu-audio');
    music.play();

    const header = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.y + 120,
      'Вибір рівня',
      {
        font: '128px Red Hat Display',
        color: 'rgba(22, 119, 255, 0.32)',
        stroke: '#fff',
        strokeThickness: 8,
      }
    );

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

    const buttonSpacing = 100;
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const levels = [
      { text: 'Рівень 1', level: 0 },
      { text: 'Рівень 2', level: 1 },
      { text: 'Рівень 3', level: 2 },
    ];

    levels.forEach((level, index) => {
      const button = this.add
        .sprite(
          centerX,
          centerY - buttonSpacing + index * buttonSpacing,
          'button'
        )
        .setInteractive();
      button.setScale(0.5);
      button.on('pointerdown', () => {
        this.tweens.add({
          targets: button,
          scaleX: 0.45,
          scaleY: 0.45,
          duration: 200,
          yoyo: true,
          ease: 'Sine.easeInOut',
          onComplete: () => {
            this.startLevel(level.level);
            music.stop();
          },
        });
      });

      button.on('pointerover', () => {
        button.setTint(0xCDC1FF); 
        this.input.setDefaultCursor('pointer');  
      });
  
      button.on('pointerout', () => {
        button.clearTint();  
        this.input.setDefaultCursor('default');  
      });

      this.add
        .text(button.x, button.y - 5, level.text, {
          fontSize: '36px',
          color: '#BFECFF',
          stroke: '#fff',
          strokeThickness: 2,
        })
        .setOrigin(0.5);
    });

    const backButton = this.add
      .sprite(centerX, centerY + levels.length * buttonSpacing, 'button')
      .setInteractive();
    backButton.setScale(0.5);
    backButton.on('pointerdown', () => {
      this.tweens.add({
        targets: backButton,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          this.scene.start('MenuScene');
          music.stop();
        },
      });
    });

    backButton.on('pointerover', () => {
      backButton.setTint(0xCDC1FF); 
      this.input.setDefaultCursor('pointer');  
    });

    backButton.on('pointerout', () => {
      backButton.clearTint();  
      this.input.setDefaultCursor('default');  
    });

    this.add
      .text(backButton.x, backButton.y - 5, '⬅ Меню', {
        fontSize: '36px',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2,
      })
      .setOrigin(0.5);

    this.input.keyboard.on('keydown-ENTER', () => {
      music.stop();
      this.scene.start('MenuScene');
    });
  }

  startLevel(level: number) {
    this.scene.start('MainScene', { level });
  }
}
