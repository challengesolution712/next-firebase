import { useMenuContext } from '../../context/contextApp'

export default ({ menuItems, disabledItem, onChange, defaultValue }) => {

    const { locale } = useMenuContext()
    
    return (
        <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className={`${locale == 'ar' ? 'left-2.5' : 'right-2.5'} absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <select
                value={defaultValue}
                onChange={onChange}
                className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option value={disabledItem} selected disabled>
                        { disabledItem }
                    </option>
                    {
                        menuItems.map((item, idx) => (
                            <option value={item} key={idx}>
                                { item }
                            </option>
                        ))
                    }
            </select>
        </div>
    )
}