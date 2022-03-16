export default ({ className }) => (
    <div className={`flex justify-center mt-24 px-4 text-gray-800 text-3xl text-center font-medium ${className}`}>
        <div className="text-loading">
            Loading
            <span className="dote-container text-4xl">
                ...
            </span>
        </div>
    </div>
)