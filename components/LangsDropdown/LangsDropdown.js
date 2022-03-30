import Link from "next/link"
import { useState, useEffect } from "react"

export default ({ locale, path }) => {

    const [state, setState] = useState(false)

    useEffect(()=>  document.onscroll = () => setState(false), [])

    return (
        <div className="relative text-gray-500">
            <button className="flex items-center p-2 border rounded-md"
                onClick={() => setState(!state)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {
                    locale == 'en' ? 'English' : 'العربية'
                }
            </button>
            {
                state ? (
                    <ul className="absolute top-12 py-3 w-36 border rounded-md bg-white">
                        <li className="block w-full hover:bg-gray-50"
                            onClick={() => setState(false)}
                        >
                            <Link href={path} locale="en">
                                <a className="block py-3 px-4 w-full">
                                    { locale == 'en' ? 'English' : 'اﻹنجليزية' }
                                </a>
                            </Link>
                        </li>
                        <li className="block w-full hover:bg-gray-50"
                            onClick={() => setState(false)}
                        >
                            <Link href={path} locale="ar">
                                <a className="block py-3 px-4 w-full">
                                    { locale == 'en' ? 'Arabic' : 'العربية' }
                                </a>
                            </Link>
                        </li>
                    </ul>
                ) : ''
            }
        </div>
    )
}