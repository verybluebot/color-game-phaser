let StateTitle = {
  preload: function() {
    game.load.image('logo', 'assets/img/logo.png');
    // game.scale.forceOrientation(false, true);
    game.load.spritesheet('button', 'assets/img/buttons.png', 265, 75);

  },

  create: function() {
    this.logo = game.add.sprite(game.world.centerX, 150, 'logo');
    this.logo.anchor.set(0.5, 0.5);
    this.logo.scale.setTo(0.3, 0.3);

    // buttons
    this.btnStart = game.add.button(game.world.centerX, game.world.height - 150, 'button', this.startGame, this, 7, 6, 7);
    this.btnStart.anchor.set(0.5, 0.5);
    this.setListeners();
  },

  setListeners: function() {
    game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
    game.scale.leaveIncorrectOrientation.add(this.rightWay, this)

  },

  wrongWay: function() {
    console.log('wrong!!!!')
  },

  rightWay: function() {
    console.log('right!!!!')
  },

  update: function () {

  },

  startGame: function() {
    console.log('starting game button');
    game.state.start('StateMain');

  }
};

