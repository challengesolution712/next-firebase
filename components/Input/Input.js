export default ({
    placeholder,
    type,
    defaultValue,
    className,
    onChange
}) => (
    <input 
        type={type}
        placeholder={placeholder}
        defaultvalue={defaultValue}
        required
        onChange={onChange}
        className={`${className} p-3 border rounded-md outline-none focus:border-indigo-600`}
    />
)