// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/_game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;
var Game = exports.Game = function Game() {
  var next = document.querySelector('.body__btn');
  var description = document.querySelector('.game__description');
  var tutorial = document.querySelector('.game__tutorial');
  var gridCards = document.querySelectorAll('.grid__item');
  var countdown = document.querySelector('.countdown__text');
  var countdownDiv = document.querySelector('.game__countdown');
  var start = document.querySelector('.game__start');
  var time = document.querySelector('.time');
  var targetNumber = document.querySelector('.start__number');
  var level = document.querySelector('.level');
  var score = document.querySelector('.score');
  var multiplier = document.querySelector('.multiplier');
  var bonusCircle = document.querySelectorAll('.info__circle');
  var colors = ['#4cb7eb', '#6d7adb', '#a595cd', '#f28e37', '#70c09b', '#8f4af9'];
  var cardMods = ['infinite__opacity', 'infinite__rocking', 'infinite__decrease'];
  var reactTrue = document.querySelector('.reaction__true');
  var reactFalse = document.querySelector('.reaction__false');
  var cardsGrid = document.querySelector('.start__grid');
  var gameResults = document.querySelector('.game__results');
  var currentResult = document.querySelector('.current-result');
  var rightAnswer = document.querySelector('.right-answer');
  var accuracy = document.querySelector('.accuracy');
  var benefit = document.querySelector('.benefit');
  var neuron = document.querySelector('.neuron');
  var playAgain = document.querySelector('.results__btn');
  var secs = 3;
  var timer = 59;
  var answers = 0;
  var rightAnswers = 0;
  var generationLoops = function generationLoops(level) {
    var generatedValues = document.querySelectorAll('.start__item-value');
    var cardNumbers = new Set();
    while (cardNumbers.size !== generatedValues.length) {
      if (level === 1) {
        cardNumbers.add(Math.floor(Math.random() * 10) + 1);
      } else if (level === 2) {
        cardNumbers.add(Math.floor(Math.random() * 89) + 10);
      } else if (level >= 3 && level < 7) {
        cardNumbers.add(Math.floor(Math.random() * 899) + 100);
      } else {
        cardNumbers.add(Math.floor(Math.random() * 8999) + 1000);
      }
    }
    for (var i = 0; i !== cardNumbers.size; i++) {
      generatedValues[i].innerHTML = Array.from(cardNumbers)[i];
    }
    generatedValues.forEach(function (i) {
      checkCards(i);
    });
  };
  var generationNums = function generationNums() {
    var currentLevel = Number(level.innerHTML[0]);
    if (currentLevel === 1) {
      generationLoops(currentLevel);
    } else if (currentLevel === 2) {
      generationLoops(currentLevel);
    } else if (currentLevel >= 3 && currentLevel < 7) {
      generationLoops(currentLevel);
    } else {
      generationLoops(currentLevel);
    }
  };
  var checkLevel = function checkLevel() {
    var currentLevel = Number(level.innerHTML[0]);
    if (currentLevel <= 3) {
      cardsGeneration(3, 2, currentLevel);
    } else if (currentLevel <= 6) {
      cardsGeneration(4, 3, currentLevel);
    } else if (currentLevel === 7) {
      cardsGeneration(4, 4, currentLevel);
    } else if (currentLevel >= 8) {
      cardsGeneration(5, 5, currentLevel);
    }
  };
  var checkFinish = function checkFinish() {
    if (timer === 0) {
      rightChoice();
      setTimeout(function () {
        start.style.display = 'none';
        gameResults.style.display = 'grid';
        currentResult.innerHTML = score.innerHTML;
        rightAnswer.innerHTML = rightAnswers + ' из ' + answers;
        accuracy.innerHTML = "".concat(Math.floor(rightAnswers * 100 / answers), "%");
        benefit.innerHTML = Math.floor(Math.random() * 100);
        neuron.innerHTML = Math.floor(Math.random() * 20) + 40;
      }, 400);
    }
  };
  var modify = function modify(col, row) {
    var generatedValues = document.querySelectorAll('.start__item-value');
    var generatedCards = document.querySelectorAll('.start__item');
    for (var i = 0; i !== col * row; i++) {
      var currentMod = cardMods[Math.floor(Math.random() * cardMods.length)];
      currentMod === 'infinite__rocking' ? generatedValues[i].classList.value += " " + currentMod : generatedCards[i].classList.value += " " + currentMod;
    }
  };
  var sizing = function sizing(col, row, level) {
    var generatedCards = document.querySelectorAll('.start__item');
    if (level >= 4) {
      if (level < 6) {
        cardsGrid.style.gridGap = '1.5rem';
      } else {
        cardsGrid.style.gridGap = '1rem';
      }
      if (level < 8) {
        generatedCards.forEach(function (i) {
          i.style.fontSize = '3rem';
        });
      } else {
        generatedCards.forEach(function (i) {
          i.style.fontSize = '2rem';
        });
      }
      modify(col, row);
      cardsGrid.style.gridTemplateColumns = "repeat(".concat(col, ", 1fr)");
      if (level < 7) {
        cardsGrid.style.gridTemplateRows = "repeat(".concat(row, ", 6.25rem)");
      } else if (level < 8) {
        cardsGrid.style.gridTemplateRows = "repeat(".concat(row, ", 5.2rem)");
      } else {
        cardsGrid.style.gridTemplateRows = "repeat(".concat(row, ", 4.1rem)");
      }
    }
  };
  var cardsGeneration = function cardsGeneration(col, row) {
    var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var cardsGrid = document.querySelector('.start__grid');
    var card = "<div class=\"start__item\"><span class=\"start__item-value\"></span></div>";
    cardsGrid.innerHTML = '';
    console.log(col, row);
    for (var i = 0; i !== col * row; i++) {
      cardsGrid.insertAdjacentHTML('beforeend', card);
    }
    var generatedCards = document.querySelectorAll('.start__item');
    sizing(col, row, level);
    generatedCards.forEach(function (item) {
      item.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    });
    generationNums();
  };
  var targetCard = function targetCard() {
    var newCards = document.querySelectorAll('.start__item-value');
    targetNumber.innerHTML = newCards[Math.floor(Math.random() * newCards.length)].innerHTML;
  };
  var bgColor = function bgColor() {
    start.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  };
  var hideReaction = function hideReaction() {
    setTimeout(function () {
      reactTrue.style.display = 'none';
      reactFalse.style.display = 'none';
    }, 300);
  };
  var bonusUp = function bonusUp() {
    var multiplierVal = Number(multiplier.innerHTML[1]);
    if (Number(multiplier.innerHTML[1]) < 5) {
      multiplier.innerHTML = 'x' + (Number(multiplier.innerHTML[1]) + 1);
      bonusCircle[multiplierVal].className = 'fa-solid fa-circle info__circle';
    }
  };
  var newCards = function newCards() {
    setTimeout(function () {
      cardsGrid.classList.replace('animation--disappearance', 'animation--appearance');
      targetNumber.classList.replace('animation--disappearance', 'animation--appearance');
    }, 500);
  };
  var rightChoice = function rightChoice() {
    cardsGrid.classList.replace('animation--appearance', 'animation--disappearance');
    targetNumber.classList.replace('animation--appearance', 'animation--disappearance');
  };
  var checkCards = function checkCards(card) {
    card.addEventListener('click', function (e) {
      if (e.currentTarget.innerHTML === targetNumber.innerHTML) {
        setTimeout(function () {
          newCards();
          checkLevel();
        }, 300);
        bgColor();
        rightChoice();
        reactTrue.style.display = 'grid';
        rightAnswers++;
        answers++;
        hideReaction();
        score.innerHTML = Number(score.innerHTML) + 42 * Number(multiplier.innerHTML[1]);
        level.innerHTML !== '9-9' ? level.innerHTML = Number(level.innerHTML[0]) + 1 + '-9' : '';
        bonusUp();
      } else {
        answers++;
        reactFalse.style.display = 'grid';
        hideReaction();
        Array.from(bonusCircle).slice(1).forEach(function (element) {
          element.className = 'fa-regular fa-circle info__circle';
          multiplier.innerHTML = 'x1';
        });
      }
      checkFinish();
    });
    targetCard();
  };
  var startGame = function startGame() {
    time.innerHTML = "00:".concat(String(timer).padStart(2, '0'));
    var gameTimer = setInterval(function () {
      if (timer <= 0) {
        countdownDiv.style.display = 'none';
        clearInterval(gameTimer);
      } else {
        timer--;
        time.innerHTML = "00:".concat(String(timer).padStart(2, '0'));
      }
    }, 1000);
    checkLevel();
  };
  var prepareTutor = function prepareTutor() {
    secs = 3;
    timer = 59;
    answers = 0;
    rightAnswers = 0;
    level.innerHTML = '1-9';
    score.innerHTML = '0';
    cardsGrid.style = '';
    gridCards.forEach(function (card) {
      card.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    });
    tutorial.style.display = 'grid';
  };
  next.addEventListener('click', function () {
    description.style.display = 'none';
    prepareTutor();
  });
  playAgain.addEventListener('click', function () {
    gameResults.style.display = 'none';
    prepareTutor();
    newCards();
  });
  tutorial.addEventListener('click', function () {
    tutorial.style.display = 'none';
    countdownDiv.style.display = 'grid';
    countdown.innerHTML = secs;
    var beforeGame = setInterval(function () {
      if (secs === 1) {
        countdownDiv.style.display = 'none';
        start.style.display = 'grid';
        startGame();
        clearInterval(beforeGame);
      } else {
        secs--;
        countdown.innerHTML = secs;
      }
    }, 1000);
  });
};
},{}],"scripts/index.js":[function(require,module,exports) {
"use strict";

var _game = require("./_game");
window.addEventListener('load', _game.Game);
},{"./_game":"scripts/_game.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57606" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map