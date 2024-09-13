"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
var _App = _interopRequireDefault(require("./App"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const domNode = document.getElementById('root');
const root = (0, _client.hydrateRoot)(domNode, reactNode);
root.render(/*#__PURE__*/_react.default.createElement(_App.default, null));