

function Card({ text, children, className }) {
    return (
        <button className="bg-primary text-white px-5 py-2 rounded hover:bg-teal-800 font-semibold">
            {text}
        </button>
    )
}

export default Card;
