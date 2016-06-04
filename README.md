# Scene
A tiny front-end framework designed with ❤️

## Usage

```javascript

const Scene = require('scene-framework');

Scene.define('splash', function () {
  this.find('button').click(function () {
    Scene.go('game');
  });
}, function () {
  // Invoked when leaving the "splash" scene.
  // Note that you don't need to cleanup the
  // listeners to the button element since
  // Scene will do that for you.
});

Scene.define('game', function () {
  alert('Welcome to the game!');
  Scene.go('splash');
});
