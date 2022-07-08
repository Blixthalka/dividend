

function Button({ text, children, className, onClick, design = "primary" }) {
    return (
        <button
            className={`
                ${design === "primary" && "bg-secondary hover:bg-primary border-secondary hover:border-primary"}
                ${design === "secondary" && "bg-transparent hover:bg-background border-background"}
                border px-5 py-2 rounded group ${className}`}
            onClick={onClick}
        >
            {text ?
                <span
                    className={`
                        ${design === "primary" && "text-white"}
                        ${design === "secondary" && "text-secondary group-hover:text-primary"}
                        font-medium`}
                >
                    {text}
                </span> :
                children}
        </button>
    )
}

export default Button;
