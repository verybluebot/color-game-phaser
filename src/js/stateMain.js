let StateMain = {
  preload: function() {
    game.load.image('green', 'assets/img/colors/green.png');
    game.load.image('blue', 'assets/img/colors/blue.png');
    game.load.image('red', 'assets/img/colors/red.png');
    game.load.image('yellow', 'assets/img/colors/yellow.png');

    game.load.spritesheet('rings', 'assets/img/rings.png', 60, 65, 5);
    game.load.spritesheet('balls', 'assets/img/balls.png', 35, 35, 5);
    game.load.spritesheet('soundButtons', 'assets/img/soundButtons.png', 32, 32, 2);

    game.load.audio('points', 'assets/sounds/points.mp3');
    game.load.audio('gameOver', 'assets/sounds/gameOver.mp3');
  },

  create: function() {
    console.log('ready for action!');
    const green = game.add.image(0, 0, 'green');
    const blue = game.add.image(100, 0, 'blue');
    const red = game.add.image(0, 100, 'red');
    const yellow = game.add.image(100, 100, 'yellow');

    this.ball = game.add.sprite(0,0, 'balls');

    // vars
    this.ballSpeed = 200;
    this.incBallSpeed = 10;
    score = 0;

    this.pointsSound = game.add.audio('points');
    this.pointsSound.volume = 0.5;
    this.gameOver = game.add.audio('gameOver');

    game.physics.startSystem(Phaser.Physics.Arcade);

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

    game.physics.arcade.enable(this.ball);

    // text
    this.scoreText = game.add.text(this.world.centerX, 150, '0');
    this.scoreText.fill = '#fff';
    this.scoreText.fontSize = 64;
    this.scoreText.anchor.set(0.5, 0.5);

    this.scoreLabel = game.add.text(this.world.centerX, 100, 'Score');
    this.scoreLabel.fill = '#fff';
    this.scoreLabel.fontSize = 32;
    this.scoreLabel.anchor.set(0.5, 0.5);

    this.soundButton = game.add.image(12, 12, 'soundButtons');
    this.soundButton.inputEnabled = true;
    this.soundButton.frame = 1;
    sound = false;

    // set up listeners
    this.setListeners();

    // set random place for the ball
    this.setRandomBall();
  },

  update: function() {

    const diffX = Math.abs(this.ring.x - this.ball.x);
    const diffY = Math.abs(this.ring.y - this.ball.y);

    if (diffX < 10 && diffY < 10) {
      this.ball.body.velocity.setTo(0, 0);

      if (this.ball.frame === this.ring.frame) {
        this.setRandomBall();
        score++;
        this.scoreText.text = score;

        if (sound) {
          this.pointsSound.play();
        }

      } else {
        game.state.start('StatePlayOver');

        if (sound) {
          this.gameOver.play();
        }
      }
    }
  },

  setListeners: function() {
    game.input.onUp.add(this.resetRing, this);
    this.soundButton.events.onInputDown.add(this.soundToggle, this);
  },

  soundToggle: function() {
    sound = !sound;
    if (sound) {
      this.soundButton.frame = 0;
    } else {
      this.soundButton.frame = 1;
    }
  },

  setRandomBall: function() {
    const ballColor = game.rnd.integerInRange(1, 4);
    const ballX = game.rnd.integerInRange(0, game.world.width);
    const ballY = game.rnd.integerInRange(0, 100);

    this.ball.frame = ballColor;
    this.ball.x = ballX;
    this.ball.y = ballY;

    // this.ball.body.velocity.setTo(0, 100);

    // increas ball speed
    this.ballSpeed += this.incBallSpeed;
    // returns rotation to the target
    const rotation = game.physics.arcade.moveToXY(this.ball, this.ring.x, this.ring.y, this.ballSpeed);

    this.ball.rotation = rotation;
  },

  changeColor: function(target) {
    if (!target.name) return;

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
