import 'phaser';
import MenuBackground from '../components/menuBackground';

export default class SettingsScene extends Phaser.Scene {
  background: MenuBackground;
  keyBindings: { [key: string]: string };
  waitingForKey: string | null = null;
  instructionsText: Phaser.GameObjects.Text;

  constructor() {
    super('SettingsScene');
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
      'Клавіші',
      {
        font: '128px Red Hat Display',
        color: '#1744A5',
        stroke: '#fff',
        strokeThickness: 8,
      }
    );
    header.setOrigin(0.5);

    this.keyBindings = this.registry.get('keyBindings') || {
      left: 'A',
      up: 'W',
      right: 'D',
      space: 'SPACE',
    };

    this.displayKeyBindings();

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const moveLeftButton = this.createButton(
      centerX,
      centerY,
      '⚙️ Вліво',
      'left'
    );
    moveLeftButton.on('pointerdown', () => {
      this.tweens.add({
        targets: moveLeftButton,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
      });
    });
    moveLeftButton.on('pointerover', () => {
      moveLeftButton.setTint(0xcdc1ff);
      this.input.setDefaultCursor('pointer');
    });

    moveLeftButton.on('pointerout', () => {
      moveLeftButton.clearTint();
      this.input.setDefaultCursor('default');
    });
    const moveUpButton = this.createButton(
      centerX,
      centerY + 100,
      '⚙️ Ввверх',
      'up'
    );
    moveUpButton.on('pointerover', () => {
      moveUpButton.setTint(0xcdc1ff);
      this.input.setDefaultCursor('pointer');
    });

    moveUpButton.on('pointerout', () => {
      moveUpButton.clearTint();
      this.input.setDefaultCursor('default');
    });
    moveUpButton.on('pointerdown', () => {
      this.tweens.add({
        targets: moveUpButton,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
      });
    });
    const moveRightButton = this.createButton(
      centerX,
      centerY + 200,
      '⚙️ Вправо',
      'right'
    );
    moveRightButton.on('pointerover', () => {
      moveRightButton.setTint(0xcdc1ff);
      this.input.setDefaultCursor('pointer');
    });

    moveRightButton.on('pointerout', () => {
      moveRightButton.clearTint();
      this.input.setDefaultCursor('default');
    });
    moveRightButton.on('pointerdown', () => {
      this.tweens.add({
        targets: moveRightButton,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
      });
    });
    const backButton = this.createButton(
      centerX,
      centerY + 300,
      '⬅ Меню',
      'back'
    );

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
      backButton.setTint(0xcdc1ff);
      this.input.setDefaultCursor('pointer');
    });

    backButton.on('pointerout', () => {
      backButton.clearTint();
      this.input.setDefaultCursor('default');
    });
  }

  createButton(
    x: number,
    y: number,
    label: string,
    action: string
  ): Phaser.GameObjects.Sprite {
    const button = this.add.sprite(x, y, 'button').setInteractive();
    button.setScale(0.5);

    this.add
      .text(x, y - 5, label, {
        fontSize: '36px',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2,
      })
      .setOrigin(0.5);

    button.on('pointerdown', () => {
      if (action === 'back') return;

      this.waitingForKey = action;
      this.instructionsText.setText(`Натисніть нову клавішу для "${label}"`);
    });

    return button;
  }

  displayKeyBindings() {
    if (this.instructionsText) {
      this.instructionsText.destroy();
    }

    this.instructionsText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 150,
        `\nЛіво: ${this.keyBindings.left}\nВверх: ${this.keyBindings.up}\nПраво: ${this.keyBindings.right}`,
        {
          font: '32px Arial',
          color: '#667BC6',
          stroke: '#fff',
          strokeThickness: 8,
        }
      )
      .setOrigin(0.5);
  }
  
  update() {
    if (this.waitingForKey) {
      this.input.keyboard.on('keydown', (event) => {
        if (event.key !== this.keyBindings[this.waitingForKey]) {
          this.keyBindings[this.waitingForKey] = event.key.toUpperCase();
          this.waitingForKey = null;  
          this.displayKeyBindings(); 
          this.registry.set('keyBindings', this.keyBindings);  
        }
      });
    }
  }
  
}
