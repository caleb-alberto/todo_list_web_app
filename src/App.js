import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import newTask from "./Internal";

function Popup({ bool, setbool, taskList, setTaskList }) {
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");

  
  if (!bool) return null;

  function createTask() {
    let newObject = new newTask(nameInput, descInput, false);
    setTaskList([...taskList, newObject]);
  }

  return (
    <Modal onClose={() => setbool(false)}>
      <h2>Create your Task:</h2>
      <p>make a name: </p>
      <input onChange={(e) => setNameInput(e.target.value)} />
      <p>make a description: </p>
      <input onChange={(e) => setDescInput(e.target.value)} />
      <Button onClick={() => {createTask(); setbool(false); setNameInput(""); setDescInput("")}} theme={"blue"} style={{ float: 'right' }}>
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

function RenderTasks({ taskList }) {
  const [taskListComplete, setComplete] = useState(false);
  const taskListIncomplete = []

  taskList.forEach((task) => {
    if (!task.status) {
      taskListIncomplete.push(task);
    } 
  });

  
  return (
  <>
    {taskListIncomplete.map((it, index) => (
      <li key={index}>{it.name} 
      <input type="checkbox" onChange={() => {
        setComplete(!taskListComplete);
        it.status = true;
      }}/>
      <br /> {it.desc}</li>
    ))}
  </>
)}


export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskListArray, setTaskListArray] = useState([]); 

  return (
    <div>
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
      <RenderTasks taskList={taskListArray}/>
      </div>
    </div>
  );
};
