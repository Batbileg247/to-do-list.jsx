"use client"

import { useState } from "react"
import { Button } from "./compiler/Button";

export default function Home() {
  const [value, setValue] = useState("")
  const [tasks, setTasks] = useState([])
  const [isChecked, setIsChecked] = useState(false)

  const Counter = () => {
    return ( <div>
    {isChecked ? (
        <div className="flex w-86 justify-between border-t pt-4 border-[#E4E4E7] "><p>0 of 0 tasks completed</p> <button className="text-[#EF4444] cursor-pointer">Clear completed</button></div>
      ) : (
        <p>No tasks yet. Add one above!</p>
      )}
    </div>
    )
  }

  const clickAdd = () => {

    const task = {
      id: tasks.length,
      text: value,
      checked: false,
    };

    const newTasks = [...tasks, task]
    setTasks(newTasks)
    setValue("")
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (<div className="flex justify-center items-center h-screen">
    <div className="w-94 flex gap-5 flex-col items-center px-4 py-6 rounded-md shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)]">
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
          <button onClick={clickAdd} className="h-10 bg-[#2463EB] text-white rounded-md w-15">Add</button>
        </div>
        <div className="flex mt-5 gap-1.5">
          <Button text="All" />
          <Button text="Active" />
          <Button text="Completed" />
        </div>
        <div>
          {
            tasks.map((task) => (
              <div className="bg-[#F9FAFB] flex items-center pl-4 gap-2.5 rounded-md mt-5 h-15.5" key={task.id}><input className="h-5 w-5" type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}  />{task.text}</div>
            ))
          }
        </div>
      </section>
      <div className="text-[#6B7280]">
        <Counter />
      </div>
      <footer className="text-[#6B7280] text-xs">Powered by <a className="text-[#3B73ED]" href="https://pinecone.mn/">Pincone academy</a></footer>
    </div>
  </div>
  )
}