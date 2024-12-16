export default class TipsModal extends Phaser.GameObjects.GameObject {
  tips: string[];
  currentTipIndex: number;
  blackout: Phaser.GameObjects.Rectangle;
  modalBackground: Phaser.GameObjects.Rectangle;
  elf: Phaser.GameObjects.Sprite;
  tipText: Phaser.GameObjects.Text;
  closeButton: Phaser.GameObjects.Text;
  controlsImages: Phaser.GameObjects.Image[];
  changeTipInterval: Phaser.Time.TimerEvent;
  isPaused: boolean;
  disableSpace: boolean = false;

  constructor(scene: Phaser.Scene) {
    super(scene, 'TipsModal');
    this.currentTipIndex = 0;
    this.isPaused = false;
    this.tips = [
      'Використовуй ці клавіші, щоб керувати героєм  \n або ті, які ти сам собі налаштував',
      'Збери усі подарунки, щоб завершити рівень 🎁',
      'У тебе є всього лиш 3 💙 життя на всі рівні',
      'Уникай ворогів ☃️ 🐣 🚖 та перешкоди ⭐️',
      'Щоб вбити ворога, просто осідлай його',
      'Остерігайся оленів, вони можуть тебе осліпити 🦌',
      'Більше терпіння та удачі 🍀',
    ];
    this.controlsImages = [];
  }

  createModal() {
    this.pauseGame();

    this.blackout = this.scene.add
      .rectangle(
        this.scene.cameras.main.centerX,
        this.scene.cameras.main.centerY,
        this.scene.cameras.main.width,
        this.scene.cameras.main.height,
        0x000000,
        0.9
      )
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1001);

    this.elf = this.scene.add
      .sprite(200, this.scene.cameras.main.height - 250, 'elf')
      .setScale(0.9)
      .setDepth(1002)
      .setScrollFactor(0);

    this.scene.tweens.add({
      targets: this.elf,
      scaleX: 0.95,
      scaleY: 0.95,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    this.showTips();

    this.closeButton = this.scene.add
      .text(
        this.scene.cameras.main.centerX,
        this.scene.cameras.main.centerY + 150,
        'Натисни SPACE - щоб читати далі\nENTER - щоб пропустити підказки',
        {
          fontSize: '20px',
          color: '#ff0000',
          align: 'start',
          stroke: '#fff',
          strokeThickness: 8,
        }
      )
      .setOrigin(0.5)
      .setDepth(1001);

    this.scene.input.keyboard.on('keydown-SPACE', () => {
      if (!this.disableSpace) {
        this.nextTip();
      }
    });

    this.scene.input.keyboard.on('keydown-ENTER', () => {
      if (this.blackout && this.elf && this.closeButton && this.tipText) {
        this.blackout.destroy();
        this.elf.destroy();
        this.closeButton.destroy();
        this.tipText.destroy();
        this.clearControls();
      }
      this.resumeGame();
      this.disableSpace = true;
    });
  }

  showTips() {
    if (!this.tipText) {
      this.tipText = this.scene.add
        .text(
          this.scene.cameras.main.centerX,
          this.scene.cameras.main.centerY - 50,
          this.tips[this.currentTipIndex],
          {
            fontSize: '32px Arial',
            color: '#667BC6',
            stroke: '#fff',
            strokeThickness: 8,
            align: 'center',
          }
        )
        .setOrigin(0.5)
        .setDepth(1002)
        .setScrollFactor(0);
    } else if (this.tipText) {
      this.tipText.setText(this.tips[this.currentTipIndex]);
    }

    if (this.currentTipIndex === 0) {
      this.showControls();
    } else {
      this.clearControls();
    }
  }

  showControls() {
    this.clearControls();

    const controlKeys = [
      { imageKey: 'a-button', yOffset: 0, xOffset: -70 },
      { imageKey: 'd-button', yOffset: 0, xOffset: 70 },
      { imageKey: 'w-button', yOffset: -70, xOffset: 0 },
    ];

    controlKeys.forEach(({ imageKey, yOffset, xOffset }) => {
      this.controlsImages.push(
        this.scene.add
          .sprite(
            this.scene.cameras.main.centerX + xOffset,
            this.scene.cameras.main.centerY + yOffset - 150,
            imageKey
          )
          .setOrigin(0.5)
          .setDepth(1002)
          .setScrollFactor(0)
      );
    });
  }

  clearControls() {
    this.controlsImages.forEach((control) => control && control.destroy());
    this.controlsImages = [];
  }

  nextTip() {
    this.currentTipIndex++;

    if (
      this.currentTipIndex >= this.tips.length &&
      this.blackout &&
      this.elf &&
      this.closeButton &&
      this.tipText
    ) {
      this.blackout.destroy();
      this.elf.destroy();
      this.closeButton.destroy();
      this.tipText.destroy();
      this.clearControls();

      this.resumeGame();
    } else {
      this.showTips();
    }
  }

  pauseGame() {
    if (!this.isPaused) {
      this.scene.physics.pause();
      this.scene.input.enabled = false;
      this.isPaused = true;
    }
  }

  resumeGame() {
    if (this.isPaused) {
      this.scene.physics.resume();
      this.scene.input.enabled = true;
      this.isPaused = false;
    }
  }
}
