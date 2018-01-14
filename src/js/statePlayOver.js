let StatePlayOver = {
  preload: function() {
    game.load.image('logo', 'assets/img/logo.png');
    game.load.spritesheet('button', 'assets/img/buttons.png', 265, 74);

  },

  create: function() {
    this.logo = game.add.sprite(game.world.centerX, 150, 'logo');
    this.logo.anchor.set(0.5, 0.5);
    this.logo.scale.setTo(0.3, 0.3);

    // buttons
    this.btnPlayAgain = game.add.button(game.world.centerX, game.world.height - 150, 'button', this.playAgain, this, 1, 0, 1);
    this.btnPlayAgain.anchor.set(0.5, 0.5);

    // text
    this.scoreText = game.add.text(this.world.centerX, 150, score);
    this.scoreText.fill = '#fff';
    this.scoreText.fontSize = 64;
    this.scoreText.anchor.set(0.5, 0.5);

    this.scoreLabel = game.add.text(this.world.centerX, 100, 'Score');
    this.scoreLabel.fill = '#fff';
    this.scoreLabel.fontSize = 32;
    this.scoreLabel.anchor.set(0.5, 0.5);

  },

  update: function() {

  },

  playAgain: function() {
    game.state.start('StateMain')
  }
};
