import moment from "moment"
import 'moment/locale/ar'
import 'moment/locale/en-nz'
import Link from "next/link"
import Button from "../Button/Button"
import { useMenuContext } from '../../context/contextApp'

export default ({ posts, id, onClick }) => {

    const { locale } = useMenuContext()
    moment.locale(locale)
    
    return (
        posts.map((items, idx) => (
            <li key={idx} className="relative p-5 bg-white rounded-md shadow-md border">
                <Link href={`/post/${items.id}`}>
                    <a>
                        <div>
                            <div>
                                <h3 className="text-xl font-medium text-cyan-600">
                                    { items.title }
                                </h3>
                                <p className="text-gray-500 mt-2 pr-2 line-clamp-2">
                                    { items.details }
                                </p>
                            </div>
                            <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
                                <span className="flex items-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    { items.country } {items.city ? `, ${items.city}` : ''}
                                </span>
                                <span className="flex items-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    { moment(items.postedAt).format("dddd, MMMM Do YYYY") }
                                </span>
                            </div>
                        </div>
                    </a>
                </Link>
                <div className="absolute -top-6 right-5 flex items-center gap-3">
                    <Button
                        className="bg-[#fff] text-red-600 py-2 px-2 rounded-full border hover:bg-[#fff] focus:shadow-none"
                        onClick={() => onClick({id: items.id, bool: true})}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </Button>
                    <Link href={`/dashboard/edit/${id}/?post=${items.id}`}>
                        <a className="px-2 py-2 bg-indigo-600 text-white shadow-md rounded-full border hover:bg-indigo-700 focus:shadow-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </a>
                    </Link>
                </div>
            </li>
        ))
    )
}