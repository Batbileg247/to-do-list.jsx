"use client"

import { useState } from "react"
import { Button } from "./compiler/Button";

export default function Home() {
  const [value, setValue] = useState("")
  const [tasks, setTasks] = useState([])

  const checkedTrue = tasks.filter(task => task.checked===true)
  const checkedFalse = tasks.filter(task => task.checked===false)
  

  const Counter = () => {
    return (<div>
      {tasks.length > 0 ? (
        <div className="flex w-86 justify-between border-t pt-4 border-[#E4E4E7] "><p>{checkedTrue.length} of {tasks.length} tasks completed</p> <button onClick={() => { setTasks(checkedFalse) }} className="text-[#EF4444] cursor-pointer">Clear completed</button></div>
      ) : (
        <p>No tasks yet. Add one above!</p>
      )}
    </div>
    )
  }

  const clickAdd = () => {
    const task = {
      id: Date.now(),
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

  const changeCheck = (taskId) => {
    const changed = tasks.map((task) => {
      if (task.id === taskId) { return { ...task, checked: !task.checked } } else {
        return task
      }
    })

    setTasks(changed)
  }

  const Delete = (taskId) => {
    const deleted = tasks.filter((task) => task.id !== taskId)
    setTasks(deleted)
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
          <Button text="All" click={() => { setTasks(tasks) }} />
          <Button text="Active" click={() => { setTasks(checkedFalse) }} />
          <Button text="Completed" click={() => { setTasks(checkedTrue) }} />
        </div>
        <div>
          {
            tasks.map((task) => (
              <div className="bg-[#F9FAFB] justify-between flex items-center p-4 rounded-md mt-5 " key={task.id}>
                <div className="flex gap-2.5 items-center">
                  <input className="h-5 w-5" type="checkbox" checked={task.checked} onChange={() => changeCheck(task.id)} />
                  <p className={`${task.checked && 'line-through'} w-full`}>{task.text}</p>
                </div>
                <button onClick={Delete(task.id)} className="text-[#EF4444] bg-[#FEF2F2] rounded-md px-3 h-8 hover:text-[#FEF2F2] hover:bg-[#EF4444] mr-2 cursor-pointer">Delete</button>
              </div>
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