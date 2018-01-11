let game;
window.onload = () => {
  if (screen.width > 1500) {
    game = new Phaser.Game(480, 640, Phaser.AUTO, 'ph_game');
  } else {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'ph_game');
  }
};

if (game) {
  game.state.add('StateMain', SateMain);
  game.state.start('StateMain');
}
