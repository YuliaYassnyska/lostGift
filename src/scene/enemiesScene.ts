import EnemiesBackground from '../components/enemiesBackground';

export default class EnemiesScene extends Phaser.Scene {
  currentSlideIndex: number;
  slides: Phaser.GameObjects.Container[];
  background!: EnemiesBackground;

  constructor() {
    super('EnemiesScene');
    this.currentSlideIndex = 0;
    this.slides = [];
  }

  create() {
    this.setupScene();
    this.createEnemiesSlides();
    this.createNavigationButtons();
    this.createBackButton();
    this.setupKeyboardInput();
  }

  setupScene() {
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
  }

  createEnemiesSlides() {
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

    this.slides.forEach((slide) => slide.destroy());
    this.slides = [];

    enemies.forEach((enemy) => {
      const container = this.add.container(centerX, centerY).setVisible(false);

      const sprite = this.add
        .sprite(0, -100, enemy.spriteKey)
        .setScale(this.getEnemyScale(enemy.spriteKey));
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

    console.log(this.slides.length);
  }

  getEnemyScale(spriteKey: string): number {
    const scales = {
      'bird-1': 0.2,
      reindeer: 0.15,
      star: 0.5,
    };
    return scales[spriteKey] || 1;
  }

  createNavigationButtons() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const leftArrow = this.add
      .image(centerX - 500, centerY, 'arrow')
      .setInteractive()
      .setScale(0.2)
      .setFlipX(true)
      .on('pointerdown', () => this.animateButton(leftArrow, -1));

    const rightArrow = this.add
      .image(centerX + 500, centerY, 'arrow')
      .setInteractive()
      .setScale(0.2)
      .on('pointerdown', () => this.animateButton(rightArrow, 1));
  }

  createBackButton() {
    const centerX = this.cameras.main.centerX;
    const backButton = this.add
      .sprite(centerX, this.cameras.main.height - 100, 'button')
      .setInteractive()
      .setScale(0.5)
      .on('pointerdown', () => {
        this.tweens.add({
          targets: backButton,
          scaleX: 0.45,
          scaleY: 0.45,
          duration: 200,
          yoyo: true,
          ease: 'Sine.easeInOut',
          onComplete: () => {
            this.sound.stopAll();
            this.scene.start('MenuScene');
          },
        });
      });

    this.add
      .text(backButton.x, backButton.y - 5, '⬅ Mеню', {
        fontSize: '36px',
        color: '#BFECFF',
        stroke: '#fff',
        strokeThickness: 2,
        align: 'center',
        wordWrap: { width: 200, useAdvancedWrap: true },
      })
      .setOrigin(0.5);
  }

  setupKeyboardInput() {
    this.input.keyboard.on('keydown-ENTER', () => {
      this.sound.stopAll();
      this.scene.start('MenuScene');
    });

    this.input.keyboard.on('keydown-RIGHT', () => {
      this.changeSlide(1);
    });

    this.input.keyboard.on('keydown-LEFT', () => {
      this.changeSlide(-1);
    });
  }

  animateButton(button: Phaser.GameObjects.Image, direction: number) {
    this.tweens.add({
      targets: button,
      scaleX: 0.45,
      scaleY: 0.45,
      duration: 200,
      yoyo: true,
      ease: 'Sine.easeInOut',
      onComplete: () => this.changeSlide(direction),
    });
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
