export const Button = ({ text, click }) => {
    return <button className="bg-[#F3F4F6] rounded-md px-3 h-8 hover:text-white hover:bg-[#3C82F6]" onClick={click} >
        {text}
    </button>
}


