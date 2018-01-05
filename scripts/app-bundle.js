define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.message = 'Matej\'s game!';
      this.points = 0;
      this.negativepoints = 0;
      this.level = 1;
      this.gameover = true;
      this.myKeypressCallback = this.keypressInput.bind(this);
    }

    App.prototype.dettached = function dettached() {
      window.removeEventListener('keypress', this.myKeypressCallback);
    };

    App.prototype.keypressInput = function keypressInput(e) {
      if (e.keyCode == 37) {
          if (this.nx > 30) {
            this.smaznadobka();
            this.nx -= 10;
            this.nadobka();
          }
        }
      if (e.keyCode == 39) {

          if (this.nx < 370) {
            this.smaznadobka();
            this.nx += 10;
            this.nadobka();
          }
        }
      if (e.keyCode == 13) {
        if (this.gameover) {
          this.startgame();
        }
      }
    };

    App.prototype.attached = function attached() {
      window.addEventListener('keypress', this.myKeypressCallback, false);
      var canvas = document.getElementById("game");
      var ctx = canvas.getContext("2d");
      this.ctx = ctx;
    };

    App.prototype.startgame = function startgame() {
      this.gameover = false;
      this.ctx.fillStyle = "#aaaaff";
      this.ctx.fillRect(0, 0, 400, 600);
      this.ny = 540;
      this.nx = 50;
      this.points = 0;
      this.negativepoints = 0;
      this.level = 1;
      this.nadobka();
      this.novekolecko(this);
    };

    App.prototype.nadobka = function nadobka() {
      this.ctx.fillStyle = "#0000ff";
      this.ctx.fillRect(this.nx - 30, this.ny, 60, 10);
    };

    App.prototype.smaznadobka = function smaznadobka() {
      this.ctx.fillStyle = "#aaaaff";
      this.ctx.fillRect(this.nx - 30, this.ny, 60, 10);
    };

    App.prototype.ctverec = function ctverec(x, y) {
      this.ctx.fillStyle = "#0000ff";
      this.ctx.fillRect(x - 7, y - 7, 15, 15);
    };

    App.prototype.smazctverec = function smazctverec(x, y) {
      this.ctx.fillStyle = "#aaaaff";
      this.ctx.fillRect(x - 7, y - 7, 15, 15);
    };

    App.prototype.kolecko = function kolecko(x, y) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, 7, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = 'blue';

      this.ctx.fill();
    };

    App.prototype.smazkolecko = function smazkolecko(x, y) {
      this.ctx.fillStyle = "#aaaaff";
      this.ctx.fillRect(x - 7, y - 7, 15, 15);
    };

    App.prototype.trojuhelnik = function trojuhelnik(x, y) {
      this.ctx.fillStyle = 'blue';
      this.ctx.beginPath();
      this.ctx.moveTo(x, y - 7);
      this.ctx.lineTo(x - 7, y + 7);
      this.ctx.lineTo(x + 7, y + 7);
      this.ctx.fill();
    };

    App.prototype.smaztrojuhelnik = function smaztrojuhelnik(x, y) {
      this.ctx.fillStyle = '#aaaaff';
      this.ctx.beginPath();
      this.ctx.moveTo(x, y - 7);
      this.ctx.lineTo(x - 7, y + 7);
      this.ctx.lineTo(x + 7, y + 7);
      this.ctx.fill();
    };

    App.prototype.novekolecko = function novekolecko(that) {
      var y = 15;
      var x = 10 * Math.floor(Math.random() * 40 + 1);
      if (that.negativepoints < 5) that.posunujkolecko(x, y);else that.gameover = true;
    };

    App.prototype.posunujkolecko = function posunujkolecko(xx, yy) {
      this.x = xx;
      this.y = yy;
      this.maxy = 585;
      this.delay = 66 - 6 * this.level;
      setTimeout(this.posunkolecko, this.delay, this);
    };

    App.prototype.posunkolecko = function posunkolecko(that) {
      if (that.y + 10 >= that.ny && Math.abs(that.x - that.nx) <= 30) {
        that.points++;
        if (that.points % 10 == 0) {
          if (that.level < 10) that.level++;
        }
        that.smazkolecko(that.x, that.y);
        that.nadobka();
        setTimeout(that.novekolecko, that.delay, that);
      } else if (that.y < that.maxy) {
        that.smazkolecko(that.x, that.y);
        that.y += 10;
        that.kolecko(that.x, that.y);
        setTimeout(that.posunkolecko, that.delay, that);
      } else {
        that.negativepoints++;
        setTimeout(that.novekolecko, that.delay, that);
      }
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n  <div style=\"float:left\">\n  <canvas id=\"game\" width=\"400\" height=\"600\"\n  style=\"border:1px solid #000000; background-color: #aaaaff; \"></canvas>\n  </div>\n  <div style=\"float:right\">\n  <h1>Points:<br/> ${points} </h1>\n  <h1>Level:<br/> ${level} </h1>\n  <h1>Missed:<br/> ${negativepoints} </h1>\n  <h2>\n    &larr; Move object left<br/>\n    &rarr; Move object right<br/>\n  </h2>\n    <h1 if.bind=\"gameover\">Game Over</h1>\n    <h2 if.bind=\"gameover\">press ENTER<br/> to start new game</h1>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map