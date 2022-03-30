import { useState } from "react"
import { filter } from '../../dictionary/dictionary'
import { useMenuContext } from '../../context/contextApp'

export default ({ menuItems, selectedItem, setSelectedItem }) => {

    const { locale } = useMenuContext()
    const filterLang = filter[locale]

    const [state, setState] = useState(false)

    const handleSearch = (e) => {
        const menuEls = document.querySelectorAll('.menu-el-js')
        const searchVal = e.target.value.toLocaleLowerCase()

        menuEls.forEach(el => {
            el.classList.remove("hidden")
            if (!el.textContent.toLocaleLowerCase().includes(searchVal)) {
                el.classList.add("hidden")
            }
        })
    }

    return (
        <div className="relative text-[15px]">
            <button className="flex items-center justify-between w-full px-3 py-2.5 text-gray-500 bg-white border rounded-md shadow-sm cursor-default outline-none focus:border-indigo-600" 
                onClick={() => setState(!state)}
            >
                <p className="line-clamp-1 text-left">
                    { selectedItem.item || filterLang.selectedItem1 }
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
            </button>
            
            {
                state ? (
                    <div className="relative w-full">
                        <ul className="absolute w-full mt-3 bg-white border rounded-md shadow-sm z-10">
                            <div className="shadow flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input 
                                    type="text" 
                                    placeholder={locale == 'ar' ? 'البحث' : 'Search'}
                                    className="p-2 text-gray-500 w-full rounded-md outline-none"
                                    onInput={handleSearch}
                                />
                            </div>
                            <div className="max-h-64 mt-2 overflow-y-auto">
                                {
                                    menuItems.map((el, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() => {                                                
                                                setSelectedItem({
                                                    item: el,
                                                    idx
                                                })
                                                setState(false)
                                            }}
                                            className={`${selectedItem.idx == idx ? 'text-indigo-600 bg-indigo-50' : ''} menu-el-js flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50`}
                                        >
                                            { el }
                                            {
                                                selectedItem.idx == idx ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : ''
                                            }
                                        </li>
                                    ))
                                }
                            </div>
                        </ul>
                    </div>
                ) : ''
            }
        </div>
    )
}