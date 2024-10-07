import React from "react";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { newTask, sendToServer } from "./Internal";

function Popup({ bool, setbool, taskList, setTaskList }) {
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");

  
  if (!bool) return null;

  function createTask() {
    let newObject = new newTask(nameInput, descInput, false);
    setTaskList([...taskList, newObject]);
    sendToServer(newObject, 'submit');
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

function RenderTasks({ taskList, setTaskList }) {
  const [taskListComplete, setComplete] = useState(false);
  const taskListIncomplete = []

  const fetchData = async () => {
    try {
      const taskData = await fetch('http://localhost:3000/api/data'); 
      const jsonData = await taskData.json();
      console.log(jsonData);
      return jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      const tasksFromDB = await fetchData();

      const newTasks = tasksFromDB.map(task => {
        return new newTask(
          task.name,
          task.desc,
          task.status
        );
      });

      setTaskList(prevTaskList => [...prevTaskList, ...newTasks]);
    };

    loadTasks(); 
  }, [setTaskList]);

  taskList.forEach((task) => {
    if (!task.status) {
      taskListIncomplete.push(task);
    } 
  });

  return (
  <>
    {taskListIncomplete.map((it, index) => (
      <li key={index}>{it.name} 
      <input type="checkbox" checked={false} onChange={() => {
        setComplete(!taskListComplete);
        it.status = true;
        sendToServer(it, 'delete');
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
      <RenderTasks taskList={taskListArray} setTaskList={setTaskListArray}/>
      </div>
    </div>
  );
};
