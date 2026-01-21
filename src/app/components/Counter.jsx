export const Counter = ({ taskLength, tasks, set }) => {
  const clearChecked = tasks.filter(task => task.checked === false)

  const completedDelete = (clearChecked) => {
    if (window.confirm('Are you sure you want to clear all completed tasks?')) {
      set(clearChecked)
    }
  }

  return (<div className="text-[#6B7280]">
    {taskLength > 0 ? (
      <div className="flex w-86 justify-between border-t pt-4 border-[#E4E4E7] ">
        <p>{taskLength- clearChecked.length} of {taskLength} tasks completed</p>
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