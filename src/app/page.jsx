"use client"

import { useState } from "react"
import { Button } from "./components/Button";
import { Render } from "./components/Render";
import { Counter } from "./components/Counter";

export default function Home() {

  const [value, setValue] = useState("")
  const [tasks, setTasks] = useState([])
  const [bttns, setBttns] = useState('all');

  const render = tasks.reduce((acc, task) => {
    const isChecked = task.checked === false;
    const tasksAll = bttns === 'all';
    const tasksActive = bttns === 'active' && isChecked;
    const tasksCompleted = bttns === 'completed' && !isChecked;

    if (tasksAll || tasksActive || tasksCompleted) {
      acc.push(task);
    }

    return acc;
  }, []);

  const clickAdd = () => {
    const task = {
      id: Date.now(),
      text: value,
      checked: false,
    };
    console.log(task.checked);

    if (value === "") {
      return alert("Please enter a task!");
    } else {
      const newTasks = [...tasks, task]
      setTasks(newTasks)
      setValue("")
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (<div className="flex justify-center items-center">
    <div className="w-94 my-25 flex gap-5 flex-col bg-white items-center px-4 py-6 rounded-md shadow-[0px_0px_10px_5px_rgba(0,_0,_0,_0.1)]">
      <header className="font-semibold text-xl">To-Do List</header>
      <section className="w-full flex flex-col">
        <div className="w-full flex gap-1.5">
          <input
            type="text"
            placeholder="Add a new task..."
            className="border pl-4 rounded-md border-[#E4E4E7] w-full h-10"
            value={value}
            onChange={handleChange}
          />
          <Button text='Add' click={clickAdd} className="h-10 bg-blue-400 cursor-pointer text-white rounded-md w-15" />
        </div>
        <div className="flex mt-5 gap-1.5">
          <Button text="All" click={() => setBttns("all")} className={`${bttns === 'all' ? ' bg-blue-400 text-white ' : ' text-black bg-gray-100 '} transition delay-50 duration-300 rounded-md px-3 h-8`} />
          <Button text="Active" click={() => setBttns("active")} className={`${bttns === 'active' ? ' bg-blue-400 text-white ' : ' text-black bg-gray-100 '} transition delay-50 duration-300 rounded-md px-3 h-8`} />
          <Button text="Completed" click={() => setBttns("completed")} className={`${bttns === 'completed' ? ' bg-blue-400 text-white ' : ' text-black bg-gray-100 '} transition delay-50 duration-300 rounded-md px-3 h-8`} />
        </div>
        <div>
          {render.map((task) => (<Render key={task.id} tasks={tasks} set={setTasks} check={task.checked} id={task.id} text={task.text} />))}
        </div>
      </section>
      <Counter taskLength={tasks.length} tasks={tasks} set={setTasks} />
      <footer className="text-[#6B7280] text-xs">Powered by <a className="text-[#3B73ED]" href="https://pinecone.mn/">Pincone academy</a></footer>
    </div>
  </div>
  )
}