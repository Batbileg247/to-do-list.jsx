export const Button = ({ text, click, className }) => {
    return <button className={className} onClick={click} >
        {text}
    </button>
}


