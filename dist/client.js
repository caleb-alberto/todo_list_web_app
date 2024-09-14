"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
var _App = _interopRequireDefault(require("./App"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const domNode = document.getElementById('root');
const root = (0, _client.hydrateRoot)(domNode, /*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));