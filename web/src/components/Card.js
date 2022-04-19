

function Card({title, children, className}) {
  return (
    <div className={`bg-white border border-zinc-200 rounded-lg p-5 ${className}`}>
        {title && <p className="text-secondary text-sm">{title}</p>}
        {children}
    </div>
  );
}

export default Card;
