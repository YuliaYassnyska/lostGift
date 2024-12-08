export default class Tips extends Phaser.GameObjects.GameObject {
  tipText: Phaser.GameObjects.Text;
  private tipIndex: number;
  private tips: string[];
  controlsImages: Phaser.GameObjects.Image[];
  changeTipInterval: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene) {
    super(scene, 'Tips');
    scene.add.existing(this);
    this.tipIndex = 0;
    this.tips = [
      'Використовуй ці клавіші, щоб керувати героєм',
      'Збери усі подарунки, щоб завершити рівень 🎁',
      'У тебе є всього лиш 3 💙 життя на всі рівні',
      'Уникай ворогів ☃️ 🐣 🚖 та перешкоди ⭐️',
      'Щоб вбити ворога, просто осідлай його',
      'Остерігайся оленів, вони можуть тебе осліпити 🦌',
      'Більше терпіння та удачі 🍀',
      'Нажми Enter, щоб пропустити підказки',
    ];
    this.controlsImages = [];
    this.checkAndShowControls();
    this.changeTipInterval = scene.time.addEvent({
      delay: 3000,
      callback: this.changeTip,
      callbackScope: this,
      loop: true,
    });

    this.scene.input.keyboard.on('keydown-ENTER', () => {
      if (this.tipText) {
        this.tipText.destroy();
        this.tipText = null;
      }
      if (this.controlsImages.length > 0) {
        this.controlsImages.forEach((image) => image.destroy());
        this.controlsImages = [];
      }
      if (this.changeTipInterval) {
        this.changeTipInterval.remove(); // Stop the timer
      }
    });
    
  }

  showTips() {
    if (!this.tipText) {
      this.tipText = this.scene.add
        .text(this.scene.cameras.main.centerX, 50, this.tips[this.tipIndex], {
          fontSize: '32px Arial',
          color: '#667BC6',
          stroke: '#fff',
          strokeThickness: 8,
          align: 'center',
        })
        .setOrigin(0.5).setDepth(100);
    } else if (this.tipText) {
      this.tipText.setText(this.tips[this.tipIndex]);
    }

    this.tipText.setScrollFactor(0);
  }

  checkAndShowControls() {
    if (this.tipIndex === 0 && this.controlsImages.length === 0) {
      this.showControls();
    } else if (this.tipIndex !== 0) {
      this.clearControls();
    }
  }

  changeTip() {
    this.tipIndex = (this.tipIndex + 1) % this.tips.length;
  
    if (this.tipText) {
      this.tipText.setText(this.tips[this.tipIndex]);
    } else {
      this.showTips();
    }
  
    this.checkAndShowControls();
  }
  

  clearControls() {
    this.controlsImages.forEach((control) => control.destroy());
    this.controlsImages = [];
  }

  showControls() {
    this.clearControls();

    this.controlsImages = [];

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
            this.scene.cameras.main.centerY + yOffset - 200,
            imageKey
          )
          .setOrigin(0.5)
          .setScrollFactor(0)
      );
    });
  }
}
