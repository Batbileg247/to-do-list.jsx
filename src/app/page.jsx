"use client"

import { useState } from "react"

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

  const clearChecked = tasks.filter(task => task.checked === false)

  const completedDelete = (clearChecked) => {
    if (window.confirm('Are you sure you want to clear all completed tasks?')) {
      setTasks(clearChecked)
    }
  }

  const Delete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const deleted = tasks.filter((task) => task.id !== taskId)
      setTasks(deleted)
    }
  }

  const Counter = () => {
    return (<div>
      {tasks.length > 0 ? (
        <div className="flex w-86 justify-between border-t pt-4 border-[#E4E4E7] ">
          <p>{tasks.length - clearChecked.length} of {tasks.length} tasks completed</p>
          <button onClick={() => { completedDelete(clearChecked) }} className="text-[#EF4444] cursor-pointer">
            Clear completed
          </button>
        </div>
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

  const changeCheck = (taskId) => {
    const changed = tasks.map((task) => {
      if (task.id === taskId) { return { ...task, checked: !task.checked } } else {
        return task
      }
    })

    setTasks(changed)
  }

  return (<div className="flex justify-center items-center">
    <div className="w-94 my-15 flex gap-5 flex-col bg-white items-center px-4 py-6 rounded-md shadow-[0px_0px_10px_5px_rgba(0,_0,_0,_0.1)]">
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
          <button onClick={clickAdd} className="h-10 bg-blue-400 cursor-pointer text-white rounded-md w-15">Add</button>
        </div>
        <div className="flex mt-5 gap-1.5">
          <button className={`${bttns === 'all' ? ' bg-blue-400 text-white ' : ' text-black bg-gray-100 '} rounded-md px-3 h-8`} onClick={() => setBttns("all")} >
            All
          </button>
          <button className={`${bttns === 'active' ? ' bg-blue-400 text-white ' : ' text-black bg-gray-100 '} rounded-md px-3 h-8`} onClick={() => setBttns("active")} >
            Active
          </button>
          <button className={`${bttns === 'completed' ? ' bg-blue-400 text-white ' : ' text-black bg-gray-100 '} rounded-md px-3 h-8`} onClick={() => setBttns("completed")} >
            Completed
          </button>
        </div>
        <div>
          {
            render.map((task) => (
              <div className="bg-gray-50 group break-all flex items-center p-4 rounded-md mt-5 " key={task.id}>
                <div className="flex items-center">
                  <input className="h-5 absolute w-5" type="checkbox" checked={task.checked} onChange={() => changeCheck(task.id)} />
                  <p className={`${task.checked && 'line-through'} ml-7.5 w-50`}>{task.text}</p>
                </div>
                <button onClick={() => { Delete(task.id) }} className={`${task.checked && 'visible'} ml-2.5 text-[#EF4444] invisible group-hover:visible bg-[#FEF2F2] rounded-md px-3 h-8 hover:text-[#FEF2F2] hover:bg-[#EF4444] cursor-pointer`}>
                  Delete
                </button>
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