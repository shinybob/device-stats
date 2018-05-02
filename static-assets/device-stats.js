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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
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
            var fs = document.fullscreenElement && document.fullscreenElement !== null || document.webkitFullscreenElement && document.webkitFullscreenElement !== null || document.mozFullScreenElement && document.mozFullScreenElement !== null || document.msFullscreenElement && document.msFullscreenElement !== null;

            return fs || false;
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Main = __webpack_require__(5).default;

window.onload = init;

function init() {
    var main = new Main();
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = __webpack_require__(6).default;
var DeviceList = __webpack_require__(7).default;
var DeviceRecorder = __webpack_require__(8).default;
var FullScreenUtil = __webpack_require__(2).default;
var ScreenGuide = __webpack_require__(9).default;

var Main = function () {
    function Main() {
        _classCallCheck(this, Main);

        this.createComponentContainer();
        this.screenGuide = new ScreenGuide();

        this.menu = new Menu(this);
        this.deviceList = new DeviceList(this);
        this.deviceRecorder = new DeviceRecorder(this);

        this.showMenu();
    }

    _createClass(Main, [{
        key: 'createComponentContainer',
        value: function createComponentContainer() {
            this.container = document.createElement('div');
            this.container.id = 'container';
            this.container.className = 'container';
            document.body.appendChild(this.container);
        }
    }, {
        key: 'showDeviceRecorder',
        value: function showDeviceRecorder(event) {
            event.stopPropagation();
            this.emptyContainer();
            this.screenGuide.show();
            this.deviceRecorder.show();
        }
    }, {
        key: 'showDeviceList',
        value: function showDeviceList() {
            FullScreenUtil.exitFullScreen();
            this.emptyContainer();
            this.deviceList.show();
            this.screenGuide.hide();
        }
    }, {
        key: 'showMenu',
        value: function showMenu() {
            FullScreenUtil.exitFullScreen();
            this.emptyContainer();
            this.menu.show();
            this.screenGuide.hide();
        }
    }, {
        key: 'emptyContainer',
        value: function emptyContainer() {
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }
        }
    }]);

    return Main;
}();

exports.default = Main;

/***/ }),
/* 6 */
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
            var container = document.getElementById('container');

            var header = document.createElement('div');
            header.className = 'header';
            header.innerText = 'Monocle';

            var deviceRecorderButton = document.createElement('div');
            deviceRecorderButton.innerText = "Add New Device";
            deviceRecorderButton.className = "button";
            deviceRecorderButton.addEventListener('click', this.controller.showDeviceRecorder.bind(this.controller));

            var deviceListButton = document.createElement('div');
            deviceListButton.innerText = "Device List";
            deviceListButton.className = "button";
            deviceListButton.addEventListener('click', this.controller.showDeviceList.bind(this.controller));

            container.appendChild(header);
            container.appendChild(deviceRecorderButton);
            container.appendChild(deviceListButton);
        }
    }]);

    return Menu;
}();

exports.default = Menu;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = __webpack_require__(10).default;
var Message = __webpack_require__(11).default;

var DeviceList = function () {
    function DeviceList(controller) {
        _classCallCheck(this, DeviceList);

        this.controller = controller;
        this.tableHeaders = [{ id: 'delete', label: '', width: '20px' }, { id: 'make', label: 'make', width: '100px' }, { id: 'model', label: 'model', width: '100px' }, { id: 'pixelRatio', label: 'pixel ratio', width: '60px' }, { id: 'screenHeight', label: 'screen height', width: '60px' }, { id: 'screenWidth', label: 'screen width', width: '60px' }, { id: 'innerWidthLandscape', label: 'Landscape width', width: '60px' }, { id: 'innerHeightLandscape', label: 'Landscape height', width: '60px' }, { id: 'innerWidthPortrait', label: 'portrait width', width: '60px' }, { id: 'innerHeightPortrait', label: 'portrait height', width: '60px' }, { id: 'userAgent', label: 'userAgent', width: '1000px' }];

        this.matcheValues = [{ id: 'innerWidthLandscape', match: 'screenHeight' }, { id: 'innerHeightLandscape', match: 'screenWidth' }, { id: 'innerWidthPortrait', match: 'screenWidth' }, { id: 'innerHeightPortrait', match: 'screenHeight' }];
    }

    _createClass(DeviceList, [{
        key: 'show',
        value: function show() {
            this.resultsTable = document.createElement('TABLE');

            var container = document.getElementById('container');

            var tableContainer = document.createElement('div');
            tableContainer.className = 'table-container';
            tableContainer.appendChild(this.resultsTable);

            var header = document.createElement('div');
            header.className = 'header';
            header.innerText = 'Device List';

            var backButton = document.createElement('div');
            backButton.innerText = "Back";
            backButton.className = "back-button";
            backButton.addEventListener('click', this.controller.showMenu.bind(this.controller));

            container.appendChild(backButton);
            container.appendChild(header);
            container.appendChild(tableContainer);

            this.addTableHeaders();
            this.requestResults();
        }
    }, {
        key: 'addTableHeaders',
        value: function addTableHeaders() {
            var row = this.resultsTable.insertRow(-1);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.tableHeaders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    var cell = row.insertCell(-1);
                    cell.innerHTML = key.label;
                    cell.className = "table-header";
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = results[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var data = _step2.value;

                    this.addResult(data);
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
                for (var _iterator3 = this.tableHeaders[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var key = _step3.value;

                    var cell = row.insertCell(-1);
                    cell.style.width = key.width;

                    if (key.id === 'delete') {
                        cell.innerHTML = "x";
                        cell.className = 'td-delete';
                        cell.addEventListener('click', function () {
                            deleteCallback(data.cell_id, row.rowIndex);
                        });
                    } else {
                        var value = data[key.id];
                        var field = document.createElement("input");
                        field.className = 'cell-input';
                        cell.appendChild(field);

                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = this.matcheValues[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var match = _step4.value;

                                if (key.id === match.id) {
                                    var valueToMatch = data[match.match];

                                    if (value !== valueToMatch) {
                                        cell.className = 'td-warning';
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }

                        field.value = value === undefined ? "" : value;
                        field.style.width = key.width;
                        // cell.style.width = key.width;
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputScreen = __webpack_require__(10).default;
var MessageScreen = __webpack_require__(11).default;
var FullScreenUtil = __webpack_require__(2).default;

var DeviceRecorder = function () {
    function DeviceRecorder(controller) {
        _classCallCheck(this, DeviceRecorder);

        this.controller = controller;
    }

    _createClass(DeviceRecorder, [{
        key: 'show',
        value: function show() {
            this.container = document.getElementById('container');

            this.stats = {
                make: '',
                model: '',
                innerWidthPortrait: 0,
                innerHeightPortrait: 0,
                innerWidthLandscape: 0,
                innerHeightLandscape: 0,
                screenWidth: Math.min(screen.width, screen.height),
                screenHeight: Math.max(screen.width, screen.height),
                pixelRatio: window.devicePixelRatio,
                userAgent: navigator.userAgent
            };

            this.inputScreen = new InputScreen();
            this.messageScreen = new MessageScreen();
            this.messageScreen.show('Tap Screen');

            this.resizeCallback = this.onResize.bind(this);
            this.fullScreenCallback = this.enterFullScreen.bind(this);
            this.container.addEventListener('click', this.fullScreenCallback);

            this.showMake();
        }
    }, {
        key: 'enterFullScreen',
        value: function enterFullScreen() {
            this.container.removeEventListener('click', this.fullScreenCallback);
            window.addEventListener('resize', this.resizeCallback);
            // FullScreenUtil.enterFullScreen();
            this.messageScreen.show('Rotate The Device');
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
                window.removeEventListener('resize', this.resizeCallback);
                this.showMake();
            }
        }
    }, {
        key: 'showMake',
        value: function showMake() {
            this.controller.emptyContainer();
            this.inputScreen.show('Make', this.showModel.bind(this));
        }
    }, {
        key: 'showModel',
        value: function showModel() {
            this.controller.emptyContainer();
            this.stats.make = this.inputScreen.getValue();
            this.inputScreen.show('Model', this.submit.bind(this));
        }
    }, {
        key: 'submit',
        value: function submit() {
            this.stats.model = this.inputScreen.getValue();
            this.controller.emptyContainer();
            this.messageScreen.show('Submitting device stats...');

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
            this.messageScreen.show('Values submitted!');
            setTimeout(this.controller.showMenu.bind(this.controller), 3000);
        }
    }]);

    return DeviceRecorder;
}();

exports.default = DeviceRecorder;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FullScreenUtil = __webpack_require__(2).default;

var ScreenGuide = function () {
    function ScreenGuide() {
        _classCallCheck(this, ScreenGuide);

        this.container = document.createElement('div');
        this.container.className = 'screen-guide-container';

        this.windowSize = document.createElement('div');
        this.windowSize.className = 'screen-guide';

        var topLeft = document.createElement('div');
        topLeft.className = 'guide-dot top-left';

        var topRight = document.createElement('div');
        topRight.className = 'guide-dot top-right';

        var bottomLeft = document.createElement('div');
        bottomLeft.className = 'guide-dot bottom-left';

        var bottomRight = document.createElement('div');
        bottomRight.className = 'guide-dot bottom-right';

        this.container.appendChild(this.windowSize);
        this.container.appendChild(topLeft);
        this.container.appendChild(topRight);
        this.container.appendChild(bottomLeft);
        this.container.appendChild(bottomRight);

        this.updateCallback = this.update.bind(this);
    }

    _createClass(ScreenGuide, [{
        key: 'show',
        value: function show() {
            window.addEventListener('resize', this.updateCallback);
            document.body.appendChild(this.container);
            this.update();
        }
    }, {
        key: 'hide',
        value: function hide() {
            window.removeEventListener('resize', this.updateCallback);
            if (document.body.contains(this.container)) {
                document.body.removeChild(this.container);
            }
        }
    }, {
        key: 'update',
        value: function update() {
            this.windowSize.innerText = window.innerWidth + ' x ' + window.innerHeight;
        }
    }]);

    return ScreenGuide;
}();

exports.default = ScreenGuide;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputScreen = function () {
    function InputScreen() {
        _classCallCheck(this, InputScreen);

        this.container = document.getElementById('container');

        this.button = document.createElement('BUTTON');
        this.button.addEventListener("click", this.onClick.bind(this));
        this.button.className = 'button';
        this.button.innerText = "Next";

        var button = this.button;

        this.input = document.createElement('INPUT');
        this.input.className = 'input';
        this.input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                button.click();
            }
        });
    }

    _createClass(InputScreen, [{
        key: 'onClick',
        value: function onClick() {
            if (this.input.value.length > 1) {
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
    }]);

    return InputScreen;
}();

exports.default = InputScreen;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageScreen = function () {
    function MessageScreen() {
        _classCallCheck(this, MessageScreen);

        this.container = document.getElementById('container');

        this.message = document.createElement('div');
        this.message.className = 'message';
    }

    _createClass(MessageScreen, [{
        key: 'show',
        value: function show(message) {
            this.container.appendChild(this.message);
            this.message.innerText = message;
        }
    }]);

    return MessageScreen;
}();

exports.default = MessageScreen;

/***/ })
/******/ ]);