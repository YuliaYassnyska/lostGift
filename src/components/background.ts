export default class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene) {
    super(scene, 0, 0, 0, 0, 'background');
    scene.add.existing(this);

    this.setOrigin(0.5).setScrollFactor(0);
    this.addSnowflakes(scene);
  }

  adjustPosition() {
    const imgHeight = 780
    this.setScale(this.scene.cameras.main.height / imgHeight)
    this.x = this.scene.cameras.main.centerX
    this.y = this.scene.cameras.main.centerY
    this.width = this.scene.cameras.main.width
  }

  parallax() {
    this.tilePositionX = this.scene.cameras.main.worldView.x * 0.2;
  }

  addSnowflakes(scene) {
    const mapBounds = scene.physics.world.bounds;

    const particles = scene.add.particles(0, 0, 'snowflake',{
      x: { min: mapBounds.left, max: mapBounds.right },
      y: 0, 
      lifespan: 8000, 
      speedY: { min: 50, max: 150 }, 
      scale: { start: 0.5, end: 0.2 },
      alpha: { start: 1, end: 0 }, 
      quantity: 1, 
      frequency: 100, 
      blendMode: 'ADD', 
    });

    scene.cameras.main.on('cameraupdate', (camera) => {
      particles.setPosition(camera.worldView.x, camera.worldView.y);
    });
  }
}
