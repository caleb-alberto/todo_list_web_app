"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;
var _react = _interopRequireWildcard(require("react"));
var _Modal = _interopRequireDefault(require("./Modal"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Internal = _interopRequireDefault(require("./Internal"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Modal.default, {
    onClose: () => setbool(false),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      children: "Create your Task:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: "make a name: "
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      onChange: e => setNameInput(e.target.value)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: "make a description: "
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      onChange: e => setDescInput(e.target.value)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Button, {
      onClick: () => {
        createTask();
        setbool(false);
        setNameInput("");
        setDescInput("");
      },
      theme: "blue",
      style: {
        float: 'right'
      },
      children: "create task"
    })]
  });
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: taskListIncomplete.map((it, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
      children: [it.name, /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        type: "checkbox",
        onChange: () => {
          setComplete(!taskListComplete);
          it.status = true;
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), " ", it.desc]
    }, index))
  });
}
function App() {
  const [isModalOpen, setModalOpen] = (0, _react.useState)(false);
  const [taskListArray, setTaskListArray] = (0, _react.useState)([]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        backgroundColor: "lightblue",
        padding: "20px"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Button, {
        onClick: () => setModalOpen(true),
        theme: "pink",
        children: "Open the Modal"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Popup, {
        bool: isModalOpen,
        setbool: setModalOpen,
        taskList: taskListArray,
        setTaskList: setTaskListArray
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(RenderTasks, {
        taskList: taskListArray
      })
    })]
  });
}
;