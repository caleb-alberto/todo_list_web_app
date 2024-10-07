"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newTask = void 0;
exports.sendToServer = sendToServer;
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class newTask {
  constructor(name, desc, status) {
    this.name = name;
    this.desc = desc;
    this.status = status;
  }
}
exports.newTask = newTask;
async function sendToServer(taskObj, endpoint) {
  const data = JSON.stringify(taskObj);
  await (0, _nodeFetch.default)(`http://localhost:3000/api/${endpoint}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  }).then(data => data.json()).then(console.log(data));
}