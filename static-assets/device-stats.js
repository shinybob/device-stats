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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

        this.button = document.createElement('BUTTON');
        this.button.addEventListener("click", this.onClick.bind(this));
        this.button.className = 'button';
        this.button.innerText = "Next";

        var b = this.button;

        this.input = document.createElement('INPUT');
        this.input.className = 'input';
        this.input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                b.click();
            }
        });
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
/* 1 */
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Controller = __webpack_require__(4).default;

window.onload = init;

function init() {
    var controller = new Controller();
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = __webpack_require__(5).default;
var DeviceList = __webpack_require__(9).default;
var Header = __webpack_require__(8).default;
var DeviceRecorder = __webpack_require__(10).default;
var FullScreenUtil = __webpack_require__(11).default;

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);

        this.menu = new Menu(this);
        this.deviceRecorder = new DeviceRecorder(this);
        this.deviceList = new DeviceList(this);
        this.header = new Header(this);

        this.showMenu();
    }

    _createClass(Controller, [{
        key: 'showDeviceRecorder',
        value: function showDeviceRecorder() {
            this.hideAll();
            this.deviceRecorder.show();
        }
    }, {
        key: 'showDeviceList',
        value: function showDeviceList() {
            this.hideAll();
            this.header.show('Device List', true);
            this.deviceList.show();
        }
    }, {
        key: 'showMenu',
        value: function showMenu() {
            FullScreenUtil.isFullScreen();
            FullScreenUtil.exitFullScreen();
            FullScreenUtil.isFullScreen();
            this.hideAll();
            this.header.show('Device Monkey', false);
            this.menu.show();
        }
    }, {
        key: 'hideAll',
        value: function hideAll() {
            var node = document.body;

            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        }
    }]);

    return Controller;
}();

exports.default = Controller;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
    function Menu(controller) {
        _classCallCheck(this, Menu);

        this.controller = controller;
    }

    _createClass(Menu, [{
        key: 'show',
        value: function show() {
            var container = document.createElement('div');
            container.id = 'container';
            container.className = 'container';

            var deviceRecorderButton = document.createElement('div');
            deviceRecorderButton.innerText = "Add New Device";
            deviceRecorderButton.className = "button";
            deviceRecorderButton.addEventListener('click', this.controller.showDeviceRecorder.bind(this.controller));

            var deviceListButton = document.createElement('div');
            deviceListButton.innerText = "Device List";
            deviceListButton.className = "button";
            deviceListButton.addEventListener('click', this.controller.showDeviceList.bind(this.controller));

            container.appendChild(deviceRecorderButton);
            container.appendChild(deviceListButton);
            document.body.appendChild(container);
        }
    }]);

    return Menu;
}();

exports.default = Menu;

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
    function Header(controller) {
        _classCallCheck(this, Header);

        this.controller = controller;
    }

    _createClass(Header, [{
        key: 'show',
        value: function show(headerText, showButton) {
            var container = document.createElement('div');
            container.className = 'header-container';

            var title = document.createElement('div');
            title.innerText = headerText;
            title.className = "header-text";

            if (showButton === true) {
                var backButton = document.createElement('div');
                backButton.innerText = "Back";
                backButton.className = "header-back";
                backButton.addEventListener('click', this.controller.showMenu.bind(this.controller));
                container.appendChild(backButton);
            }

            container.appendChild(title);
            document.body.appendChild(container);
        }
    }]);

    return Header;
}();

exports.default = Header;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = __webpack_require__(0).default;
var Message = __webpack_require__(1).default;

var DeviceList = function () {
    function DeviceList() {
        _classCallCheck(this, DeviceList);

        this.headers = [{ id: 'delete', label: '' }, { id: 'make', label: 'make' }, { id: 'model', label: 'model' }, { id: 'pixelRatio', label: 'pixel ratio' }, { id: 'screenHeight', label: 'screen height' }, { id: 'screenWidth', label: 'screen width' }, { id: 'innerHeightLandscape', label: 'innerWidth Landscape' }, { id: 'innerWidthLandscape', label: 'innerWidth Landscape' }, { id: 'innerHeightPortrait', label: 'innerHeight portrait' }, { id: 'innerWidthPortrait', label: 'innerWidth portrait' }, { id: 'userAgent', label: 'userAgent' }];
    }

    _createClass(DeviceList, [{
        key: 'show',
        value: function show() {
            var container = document.createElement('div');
            container.id = 'container';
            container.className = 'table-container';

            this.resultsTable = document.createElement('TABLE');

            container.appendChild(this.resultsTable);
            document.body.appendChild(container);

            this.addHeaders();
            this.requestResults();
        }
    }, {
        key: 'requestResults',
        value: function requestResults() {
            var callback = this.onResultsReceived.bind(this);
            var request = new XMLHttpRequest();
            var url = '/screenStats';

            request.open("GET", url, true);
            request.setRequestHeader('Content-type', 'application/json');
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    callback(request);
                }
            };

            request.send();
        }
    }, {
        key: 'onResultsReceived',
        value: function onResultsReceived(request) {
            var results = JSON.parse(request.response);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var data = _step.value;

                    this.addResult(data);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'addHeaders',
        value: function addHeaders() {
            var row = this.resultsTable.insertRow(-1);

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.headers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    var cell = row.insertCell(-1);
                    cell.innerHTML = key.label;
                    cell.className = "table-header";
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'addResult',
        value: function addResult(data) {
            var row = this.resultsTable.insertRow(-1);
            var deleteCallback = this.deleteEntry.bind(this);

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.headers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var key = _step3.value;

                    var cell = row.insertCell(-1);
                    if (key.id === 'delete') {
                        cell.innerHTML = "x";
                        cell.className = 'td-delete';
                        cell.addEventListener('click', function () {
                            deleteCallback(data.cell_id, row.rowIndex);
                        });
                    } else {
                        var value = data[key.id];
                        cell.innerHTML = value === undefined ? "" : value;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'deleteEntry',
        value: function deleteEntry(cell_id, rowIndex) {
            var callback = this.deleteEntryComplete.bind(this);
            var request = new XMLHttpRequest();
            var url = '/delete';

            request.open("POST", url, true);
            request.setRequestHeader('Content-type', 'application/json');
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    callback(rowIndex);
                }
            };

            request.send(JSON.stringify({ cell_id: cell_id }));
        }
    }, {
        key: 'deleteEntryComplete',
        value: function deleteEntryComplete(rowIndex) {
            this.resultsTable.deleteRow(rowIndex);
        }
    }]);

    return DeviceList;
}();

exports.default = DeviceList;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = __webpack_require__(0).default;
var Message = __webpack_require__(1).default;
var FullScreenUtil = __webpack_require__(11).default;

var DeviceRecorder = function () {
    function DeviceRecorder(controller) {
        _classCallCheck(this, DeviceRecorder);

        this.controller = controller;
    }

    _createClass(DeviceRecorder, [{
        key: 'show',
        value: function show() {
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
    }, {
        key: 'onClick',
        value: function onClick() {
            window.onresize = this.onResize.bind(this);
            FullScreenUtil.enterFullScreen();
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
            setTimeout(this.controller.showMenu.bind(this.controller), 3000);
        }
    }]);

    return DeviceRecorder;
}();

exports.default = DeviceRecorder;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FullScreenUtil = function () {
    function FullScreenUtil() {
        _classCallCheck(this, FullScreenUtil);
    }

    _createClass(FullScreenUtil, null, [{
        key: "isFullScreen",
        value: function isFullScreen() {
            return document.fullscreenElement && document.fullscreenElement !== null || document.webkitFullscreenElement && document.webkitFullscreenElement !== null || document.mozFullScreenElement && document.mozFullScreenElement !== null || document.msFullscreenElement && document.msFullscreenElement !== null;
        }
    }, {
        key: "enterFullScreen",
        value: function enterFullScreen() {
            var docElm = document.documentElement;

            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        }
    }, {
        key: "exitFullScreen",
        value: function exitFullScreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }]);

    return FullScreenUtil;
}();

exports.default = FullScreenUtil;

/***/ })
/******/ ]);