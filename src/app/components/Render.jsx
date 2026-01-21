import { Button } from "./Button";

export const Render = ({ tasks, set, check, id, text }) => {
    const changeCheck = (taskId) => {
        const changed = tasks.map((task) => {
            if (task.id === taskId) { return { ...task, checked: !task.checked } } else {
                return task
            }
        })

        set(changed)
    }

    return <div className="bg-gray-50 hover:bg-gray-100 transition delay-50 duration-300 group break-all flex items-center p-4 rounded-md mt-5 " key={id}>
        <div className="flex items-center">
            <input className="h-5 absolute w-5" type="checkbox" checked={check} onChange={() => changeCheck(id)} />
            <p className={`${check && 'line-through'} ml-7.5 w-50`}>{text}</p>
        </div>
        <Button text="Delete" click={() => {
            if (window.confirm('Are you sure you want to delete this task?')) {
                const deleted = tasks.filter((task) => task.id !== id)
                set(deleted)
            }
        }} className={`${check && 'visible'} ml-2.5 text-[#EF4444] transition delay-50 duration-300 invisible group-hover:visible bg-[#FEF2F2] rounded-md px-3 h-8 hover:text-[#FEF2F2] hover:bg-[#EF4444] cursor-pointer`} />
    </div>
}