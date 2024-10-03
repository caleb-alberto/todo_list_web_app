import fetch from "node-fetch";

export class newTask {
  constructor(name, desc, status) {
    this.name = name;
    this.desc = desc;
    this.status = status;

  }
}

export async function sendToServer(taskObj) {
  const data = JSON.stringify(taskObj);

  await fetch('http://localhost:3000/api/submit', {
    method: 'post', 
    headers: {
      'Content-Type': 'application/json' 
    },
    body: data
  })
    .then(data => data.json())
    .then(console.log(data))
}
