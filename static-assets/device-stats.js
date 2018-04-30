/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Main = __webpack_require__(2).default;

window.onload = init;

function init() {
    var main = new Main();
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = __webpack_require__(3).default;
var Message = __webpack_require__(4).default;

var Main = function () {
    function Main() {
        _classCallCheck(this, Main);

        var container = document.createElement('div');
        container.id = 'container';
        container.className = 'container';
        document.body.appendChild(container);

        this.stats = {
            make: '',
            model: '',
            innerWidthPortrait: 0,
            innerHeightPortrait: 0,
            innerWidthLandscape: 0,
            innerHeightLandscape: 0,
            screenWidth: screen.width,
            screenHeight: screen.height,
            pixelRatio: window.devicePixelRatio,
            userAgent: navigator.userAgent
        };

        this.input = new Input();
        this.message = new Message();
        this.message.show('Tap Screen');

        this.onClickCallback = this.onClick.bind(this);
        document.addEventListener('click', this.onClickCallback);
    }

    _createClass(Main, [{
        key: 'onClick',
        value: function onClick() {
            window.onresize = this.onResize.bind(this);
            this.enterFullScreen(document.documentElement);
            this.message.show('Rotate The Device');
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
            this.updateStats();
            this.checkStats();
        }
    }, {
        key: 'updateStats',
        value: function updateStats() {

            if (this.orientation === 'landscape') {
                this.stats.innerWidthLandscape = Math.max(window.innerWidth, this.stats.innerWidthLandscape);
                this.stats.innerHeightLandscape = Math.max(window.innerHeight, this.stats.innerHeightLandscape);
            } else {
                this.stats.innerWidthPortrait = Math.max(window.innerWidth, this.stats.innerWidthPortrait);
                this.stats.innerHeightPortrait = Math.max(window.innerHeight, this.stats.innerHeightPortrait);
            }
        }
    }, {
        key: 'checkStats',
        value: function checkStats() {
            var done = false;

            if (this.stats.innerWidthLandscape > 0 && this.stats.innerHeightLandscape > 0 && this.stats.innerWidthPortrait > 0 && this.stats.innerHeightPortrait > 0 && this.stats.innerWidthLandscape > this.stats.innerHeightLandscape && this.stats.innerWidthPortrait < this.stats.innerHeightPortrait) {
                done = true;
            }

            if (done) {
                window.onresize = null;
                document.removeEventListener('click', this.onClickCallback);
                this.showMake();
            }
        }
    }, {
        key: 'showMake',
        value: function showMake() {
            this.message.hide();
            this.input.show('Type device make', this.showModel.bind(this));
        }
    }, {
        key: 'showModel',
        value: function showModel() {
            this.stats.make = this.input.getValue();
            this.input.show('Type device model', this.submit.bind(this));
        }
    }, {
        key: 'submit',
        value: function submit() {
            this.stats.model = this.input.getValue();
            this.input.hide();
            this.message.show('Submitting device stats...');

            var callback = this.onSubmitSuccefull.bind(this);
            var request = new XMLHttpRequest();
            var url = '/screenStats';

            request.open("POST", url, true);
            request.setRequestHeader('Content-type', 'application/json');
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    callback();
                }
            };

            request.send(JSON.stringify(this.stats));
        }
    }, {
        key: 'onSubmitSuccefull',
        value: function onSubmitSuccefull() {
            this.message.show('Values submitted!');
        }
    }, {
        key: 'enterFullScreen',
        value: function enterFullScreen(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    }]);

    return Main;
}();

exports.default = Main;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = function () {
    function Input() {
        _classCallCheck(this, Input);

        this.container = document.getElementById('container');

        this.input = document.createElement('INPUT');
        this.input.className = 'input';

        this.button = document.createElement('BUTTON');
        this.button.addEventListener("click", this.onClick.bind(this));
        this.button.className = 'button';
        this.button.innerText = "Next";
    }

    _createClass(Input, [{
        key: 'onClick',
        value: function onClick() {
            if (this.input.value.length > 3) {
                this.callback();
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.input.value;
        }
    }, {
        key: 'show',
        value: function show(message, callback) {
            this.input.value = '';
            this.callback = callback;
            this.container.appendChild(this.input);
            this.container.appendChild(this.button);
            this.input.placeholder = message;
            this.input.focus();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.container.removeChild(this.input);
            this.container.removeChild(this.button);
        }
    }]);

    return Input;
}();

exports.default = Input;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
    function Message() {
        _classCallCheck(this, Message);

        this.container = document.getElementById('container');
        this.message = document.createElement('div');
        this.message.className = 'message';
    }

    _createClass(Message, [{
        key: 'show',
        value: function show(message) {
            this.container.appendChild(this.message);
            this.message.innerText = message;
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.container.removeChild(this.message);
        }
    }]);

    return Message;
}();

exports.default = Message;

/***/ })
/******/ ]);