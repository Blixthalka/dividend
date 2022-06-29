

function Card({ title, children, className, headerComponent }) {
  return (
    <div className={`bg-white border border-zinc-200 rounded-lg p-5 ${className}`}>
      {title &&
        <div className="flex justify-between ">
          <p className="text-secondary text-sm">{title}</p>
          {headerComponent && headerComponent}
        </div>
      }
      {children}
    </div>
  );
}

export default Card;
