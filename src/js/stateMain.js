let StateMain = {
  preload: function() {
    game.load.image('green', 'assets/img/colors/green.png');
    game.load.image('blue', 'assets/img/colors/blue.png');
    game.load.image('red', 'assets/img/colors/red.png');
    game.load.image('yellow', 'assets/img/colors/yellow.png');

    game.load.spritesheet('rings', 'assets/img/rings.png', 60, 65, 5);
    game.load.spritesheet('balls', 'assets/img/balls.png', 35, 35, 5);
  },

  create: function() {
    console.log('ready for action!');
    const green = game.add.image(0, 0, 'green');
    const blue = game.add.image(100, 0, 'blue');
    const red = game.add.image(0, 100, 'red');
    const yellow = game.add.image(100, 100, 'yellow');

    this.ball = game.add.image(0,0, 'balls');

    green.inputEnabled = true;
    green.name = 'green';
    green.events.onInputDown.add(this.changeColor, this);

    blue.inputEnabled = true;
    blue.name = 'blue';
    blue.events.onInputDown.add(this.changeColor, this);


    red.inputEnabled = true;
    red.name = 'red';
    red.events.onInputDown.add(this.changeColor, this);

    yellow.inputEnabled = true;
    yellow.name = 'yellow';
    yellow.events.onInputDown.add(this.changeColor, this);

    this.colorsGroup = game.add.group();
    this.colorsGroup.add(green);
    this.colorsGroup.add(blue);
    this.colorsGroup.add(red);
    this.colorsGroup.add(yellow);

    this.colorsGroup.x = game.world.centerX - this.colorsGroup.width / 2;
    this.colorsGroup.y = game.height -250;

    // rings
    this.ring = game.add.image(game.world.centerX, this.colorsGroup.y - 100, 'rings');
    this.ring.anchor.set(0.5, 0.5);

    // set up listeners
    this.setListeners();

    // set random place for the ball
    this.setRandomBall();
  },

  update: function() {

  },

  setListeners: function() {
    game.input.onUp.add(this.resetRing, this);
  },

  setRandomBall: function() {
    const ballColor = game.rnd.integerInRange(0, 5);
    const ballX = game.rnd.integerInRange(0, game.world.width);
    const ballY = game.rnd.integerInRange(0, 100);

    this.ball.frame = ballColor;
    this.ball.x = ballX;
    this.ball.y = ballY;

    console.log('this is ball', this.ball)
  },

  changeColor: function(target) {
    if (!target.name) return;
    console.log('this is the payload', target.name);

    switch (target.name) {
      case 'blue':
        this.ring.frame = 1;
        break;

      case 'green':
        this.ring.frame = 2;
        break;

      case 'red':
        this.ring.frame = 3;
        break;

      case 'yellow':
        this.ring.frame = 4;
            break;
    }
  },

  resetRing: function() {
    this.ring.frame = 0;
  }
};
