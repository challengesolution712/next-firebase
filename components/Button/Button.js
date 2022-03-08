export default ({
    children,
    onClick,
    type,
    className
}) => (
    <button
        onClick={onClick}
        type={type}
        className={`${className} outline-none px-4 py-3 bg-indigo-600 text-white shadow-md rounded-md hover:bg-indigo-700`}
    >
        { children }
    </button>
)