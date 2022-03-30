import moment from "moment"
import 'moment/locale/ar'
import 'moment/locale/en-nz'
import Link from "next/link"
import { useMenuContext } from '../../context/contextApp'

export default ({ posts }) => {

    const { locale } = useMenuContext()

    moment.locale(locale)
    return (
        posts.map(item => (
            <li className="p-5 bg-white rounded-md shadow-sm">
                <Link href={`/post/${item.id}`}>
                    <a>
                        <div>
                            <div>
                                <h3 className="text-xl font-medium text-cyan-600">
                                    { item.title }
                                </h3>
                                <p className="text-gray-500 mt-2 pr-2 line-clamp-2">
                                    { item.details }
                                </p>
                            </div>
                            <div className="mt-4 items-center space-y-4 text-sm gap-4 sm:flex sm:space-y-0">
                                <span className="flex items-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${locale == 'ar' ? 'ml-2' : 'mr-2'}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    { item.country } {item.city ? `, ${item.city}` : ''}
                                </span>
                                <span className="flex items-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${locale == 'ar' ? 'ml-2' : 'mr-2'}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    { moment(item.postedAt).format("dddd, MMMM Do YYYY") }
                                </span>
                            </div>
                        </div>
                    </a>
                </Link>
            </li>
        ))
    )
}