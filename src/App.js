import React, { useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import newTask from "./Internal";

function Popup({ bool, setbool, taskList, setTaskList }) {
  const [nameInput, setNameInput] = useState("");
  
  if (!bool) return null;

  function createTask() {
    let newObject = new newTask(nameInput);
    setTaskList([...taskList, newObject]);
  }
  

  return (
    <Modal onClose={() => setbool(false)}>
      <h2>Create your Task:</h2>
      <p>make a name: </p>
      <input onChange={(e) => setNameInput(e.target.value)} />
      <Button onClick={() => {createTask(); setbool(false)}} theme={"blue"} style={{ float: 'right' }}>
      create task</Button>
    </Modal>
  );
}

const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593",
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457",
  },
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
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
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 1;
  background: white;
  border: 0;
  outline: 0;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const types = ["Current Tasks", "Completed Tasks"];

function TabGroup({ taskList }) {
  const [active, setActive] = useState(types[0]);

  return (
    <>
      <div>
        {types.map((type) => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </div>
      <p />
      <ul>
        {taskList.map((it, index) => (
          <li key={index}>{it.name}</li>
        ))}
      </ul>
    </>
  );
}

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskListArray, setTaskListArray] = useState([]); 

  return (
    <>
      <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
        <Button onClick={() => setModalOpen(true)} theme="pink">
          Open the Modal
        </Button>
        <Popup
          bool={isModalOpen}
          setbool={setModalOpen}
          taskList={taskListArray}
          setTaskList={setTaskListArray}
        />
      </div>
      <div>
        <TabGroup taskList={taskListArray} />
      </div>
    </>
  );
}
