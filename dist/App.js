"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;
var _react = require("react");
var _Modal = _interopRequireDefault(require("./Modal"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Internal = _interopRequireDefault(require("./Internal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Popup(_ref) {
  let {
    bool,
    setbool,
    taskList,
    setTaskList
  } = _ref;
  const [nameInput, setNameInput] = (0, _react.useState)("");
  const [descInput, setDescInput] = (0, _react.useState)("");
  if (!bool) return null;
  function createTask() {
    let newObject = new _Internal.default(nameInput, descInput, false);
    setTaskList([...taskList, newObject]);
  }
  return /*#__PURE__*/React.createElement(_Modal.default, {
    onClose: () => setbool(false)
  }, /*#__PURE__*/React.createElement("h2", null, "Create your Task:"), /*#__PURE__*/React.createElement("p", null, "make a name: "), /*#__PURE__*/React.createElement("input", {
    onChange: e => setNameInput(e.target.value)
  }), /*#__PURE__*/React.createElement("p", null, "make a description: "), /*#__PURE__*/React.createElement("input", {
    onChange: e => setDescInput(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      createTask();
      setbool(false);
      setNameInput("");
      setDescInput("");
    },
    theme: "blue",
    style: {
      float: 'right'
    }
  }, "create task"));
}
const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457"
  }
};
const Button = _styledComponents.default.button`
  background-color: ${props => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${props => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;
function RenderTasks(_ref2) {
  let {
    taskList
  } = _ref2;
  const [taskListComplete, setComplete] = (0, _react.useState)(false);
  const taskListIncomplete = [];
  taskList.forEach(task => {
    if (!task.status) {
      taskListIncomplete.push(task);
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, taskListIncomplete.map((it, index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, it.name, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    onChange: () => {
      setComplete(!taskListComplete);
      it.status = true;
    }
  }), /*#__PURE__*/React.createElement("br", null), " ", it.desc)));
}
function App() {
  const [isModalOpen, setModalOpen] = (0, _react.useState)(false);
  const [taskListArray, setTaskListArray] = (0, _react.useState)([]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "lightblue",
      padding: "20px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => setModalOpen(true),
    theme: "pink"
  }, "Open the Modal"), /*#__PURE__*/React.createElement(Popup, {
    bool: isModalOpen,
    setbool: setModalOpen,
    taskList: taskListArray,
    setTaskList: setTaskListArray
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(RenderTasks, {
    taskList: taskListArray
  })));
}
;