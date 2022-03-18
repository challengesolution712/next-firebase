export default ({ info, className }) => (
    <div className={`${className} flex justify-center px-4 mt-12 mb-4`}>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-2 text-center text-gray-400">
                { info }
            </p>
        </div>
    </div>
)