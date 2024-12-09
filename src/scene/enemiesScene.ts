import EnemiesBackground from '../components/enemiesBackground';

export default class EnemiesScene extends Phaser.Scene {
  currentSlideIndex: number;
  slides: Phaser.GameObjects.Container[];
  leftArrow: Phaser.GameObjects.Image;
  rightArrow: Phaser.GameObjects.Image;
  background: EnemiesBackground;

  constructor() {
    super('EnemiesScene');
    this.currentSlideIndex = 0;
    this.slides = [];
  }

  create() {
    this.cameras.main.setBackgroundColor('#EDEBFF');
    this.background = new EnemiesBackground(this);
    this.background.adjustPosition();
    const music = this.sound.add('menu-audio');
    music.play();

    this.add
      .text(this.cameras.main.centerX, 100, 'Твої вороги і перешкоди', {
        fontSize: '64px',
        color: '#1744A5',
        stroke: '#fff',
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const enemies = [
      {
        name: 'Сніговик',
        description:
          'Душа того сніговика, що ти робив в дитинстві. Він намагається пролізти у цей світ і відібрати у тебе подарунки.',
        spriteKey: 'snowman',
      },
      {
        name: 'Танк',
        description:
          'У грі як на війні.. Якщо не ти його, то він тебе осідлає.',
        spriteKey: 'tank',
      },
      {
        name: 'Бойова пташка',
        description:
          'Вже не "Angry Bird", а справжній "Killer Bird". Літає, каркає і зносить ворогів одним махом!',
        spriteKey: 'bird-1',
      },
      {
        name: 'Рудий олень',
        description:
          'Обережно! Цей олень має вміння осліпити тебе своїм поглядом, як після зустрічі з фарами на швидкості 100 км/год. І він це робить із задоволенням!',
        spriteKey: 'reindeer',
      },
      {
        name: 'Полярна зірка',
        description:
          'Ця зірка спочатку висить, спостерігаючи за тобою, як хтось із твоїх знайомих. Але коли вона помічає тебе, готуйся до падіння... прямо на голову!',
        spriteKey: 'star',
      },
    ];

    enemies.forEach((enemy) => {
      const container = this.add.container(centerX, centerY).setVisible(false);

      const sprite = this.add
        .sprite(0, -100, enemy.spriteKey)
        .setScale(
          (enemy.spriteKey === 'bird-1' && 0.2) ||
            (enemy.spriteKey === 'reindeer' && 0.15) || (enemy.spriteKey === 'star' && 0.5) ||
            1
        );
      const name = this.add
        .text(0, 50, enemy.name, {
          fontSize: '48px',
          color: '#667BC6',
          stroke: '#fff',
          strokeThickness: 8,
        })
        .setOrigin(0.5);
      const description = this.add
        .text(0, 150, enemy.description, {
          fontSize: '32px',
          color: '#DA7297',
          wordWrap: { width: 750, useAdvancedWrap: true },
          align: 'center',
          stroke: '#fff',
          strokeThickness: 8,
        })
        .setOrigin(0.5);

      container.add([sprite, name, description]);
      this.slides.push(container);
    });

    this.slides[0].setVisible(true);

    this.leftArrow = this.add
      .image(centerX - 500, centerY, 'arrow')
      .setInteractive();
    this.leftArrow.setScale(0.2).setFlipX(true);
    this.leftArrow.on('pointerdown', () =>
      this.tweens.add({
        targets: this.leftArrow,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => this.changeSlide(-1),
      })
    );

    this.rightArrow = this.add
      .image(centerX + 500, centerY, 'arrow')
      .setInteractive();
    this.rightArrow.setScale(0.2);
    this.rightArrow.on('pointerdown', () =>
      this.tweens.add({
        targets: this.rightArrow,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => this.changeSlide(1),
      })
    );

    const backButton = this.add
      .sprite(centerX, this.cameras.main.height - 100, 'button')
      .setInteractive();
    backButton.setScale(0.6);
    backButton.on('pointerdown', () => {
      this.tweens.add({
        targets: backButton,
        scaleX: 0.45,
        scaleY: 0.45,
        duration: 200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          music.stop();
          this.scene.start('MenuScene');
        },
      });
    });

    this.add
      .text(backButton.x, backButton.y - 5, 'Повернутись в меню', {
        fontSize: '36px',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2,
        align: 'center',
        wordWrap: { width: 200, useAdvancedWrap: true },
      })
      .setOrigin(0.5);
  }

  changeSlide(direction: number) {
    this.slides[this.currentSlideIndex].setVisible(false);

    this.currentSlideIndex = Phaser.Math.Wrap(
      this.currentSlideIndex + direction,
      0,
      this.slides.length
    );

    this.slides[this.currentSlideIndex].setVisible(true);
  }
}
