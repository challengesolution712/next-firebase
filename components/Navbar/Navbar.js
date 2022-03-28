import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { getCookie } from '../../auth/cookies';
import { jwtVerify } from '../../auth/jwt'
import logout from '../../auth/logout'
import { useRouter } from 'next/router';
import { AuthLink, ProtectedLink } from '../ProtectedLink/ProtectedLink';


export default (props) => {

    const [state, setState] = useState(false)
    const navRef = useRef()
    const router = useRouter()
    const toekn = getCookie('token')
    const [user, setUser] = useState(null)

  // Replace javascript:void(0) path with your path
  const navigation = [
      { title: "Home", path: "/" },
      { title: "About us", path: "/about" },
      { title: "Dashboard", path: "/dashboard/sdfsgfdddssadgdghf" },
  ]

    useEffect(() => {
      
      const body = document.body

      // Disable scrolling
      const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"]
      if (state) body.classList.add(...customBodyStyle)
      // Enable scrolling
      else body.classList.remove(...customBodyStyle)

      // Sticky strick
      const customStyle = ["sticky-nav", "fixed"]
      window.onscroll = () => {
          if (window.scrollY > 550) navRef.current.classList.add(...customStyle)
          else navRef.current.classList.remove(...customStyle)
      }

      document.querySelectorAll('.nav-item')
      .forEach(items => {
          items.onclick = () => setState(false)
      })

    }, [state])

    useEffect(() => {
        if (toekn) {
            const { value } = jwtVerify(toekn)
            setUser(value)
        } else {
            setUser(null)
        }
    }, [toekn])

    const handleLogout = () => {
        logout()
        router.push('/')
    }


  return (
      <nav ref={navRef} className="bg-white w-full shadow top-0 z-20 border-b lg:border-0">

          <div className="items-center px-4 max-w-screen-lg mx-auto lg:flex">
              <div className="font-bold text-lg flex justify-between items-center py-3.5 lg:block">
                    <a 
                        href="/"
                        className="font-semibold text-gray-700 text-lg flex items-center"
                    >
                        <svg className="w-12 h-12 fill-current text-[#38bdf8] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"><path class="cls-1" d="M1633.92,650.48c-2.42.31-11.32,1.71-18.07,8.18a21.51,21.51,0,0,0-6.72,12.84l1,155.51c-16.74,8.41-26.22,23.37-24.33,38.5,2.36,18.87,21.26,28.79,23.66,30-5.5,16.65-10.71,30-14.27,38.64-4.9,11.94-22.34,53.63-26.19,89.29-.45,4.2-1.11,12.32,4.63,15.63,6.86,4,18.71-1.34,26-3.72,8.15-2.68,19.26-4.56,34.49-3.2,20.7,1.84,38.05-12.59,35.1-29.14,0-.14,0-.27-.07-.4a589.8,589.8,0,0,0-29.66-106.4c1.54-.72,23.43-11.26,24.67-31.92.91-15-9.47-29.32-26.53-36.54Q1635.79,739.12,1633.92,650.48Z"></path><path class="cls-1" d="M608.52,731.6l381.33,92.85a44.19,44.19,0,0,0,21.29-.09l364.49-92.16a44.2,44.2,0,0,1,55,42.85V926.69a44.2,44.2,0,0,1-18.58,36c-63.33,45.13-200.76,127.23-391.8,134.63C799,1105.9,638,1009.12,572.55,962.73a44.24,44.24,0,0,1-18.68-36.09V774.54A44.19,44.19,0,0,1,608.52,731.6Z"></path><path class="cls-2" d="M220.19,557.39,997.3,402.47a16.46,16.46,0,0,1,6.41,0l776.1,154.92c17.14,3.42,17.75,27.7.81,32l-776.1,196.27a16.29,16.29,0,0,1-8,0L219.38,589.37C202.44,585.09,203.05,560.81,220.19,557.39Z"></path><path class="cls-2" d="M879.48,1421.58l-476.89,46a93.22,93.22,0,0,1-32.53,1.9c-24.61-2.93-41-15.14-47.75-20.11-46.83-34.73-50.45-105.22-51.12-118.31-1.05-20.33-3.61-70.29,29.7-109.4,8.82-10.35,25.81-30.29,53.31-32.79,35.63-3.24,60.13,25.41,62.9,28.76,18.83,22.76,18.14,48.63,17.73,63.84-.42,15.94-1,37.35-17.19,51.22-2,1.75-15.51,12.94-32.49,10.61-29.06-4-39.78-43.62-40.91-48a76.89,76.89,0,0,1-1.87-27.3l-21.52-3.39c-2.55,9.16-6.07,23-9.11,40.15-6.11,34.53-9.17,51.79-3.73,71.49,2.18,7.86,10.64,34.26,34.53,49.82s51.46,12.46,61.65,11.33c55-6.12,226.93-22.37,460.62-46.35,6.06.06,20.14-.67,29.59-10.6,8.58-9,9-21.11,9.16-29.1.88-56.88-11-106.88-11-106.88-13-54.67-20.72-66-32.12-73A54.17,54.17,0,0,0,834.1,1164c-16.39-.52-44.38-1.52-79.1-3.33-116.47-6.09-168.63-14.06-281.32-20.53-24.23-1.39-62.16-3.34-109.28-4.71a91.55,91.55,0,0,0-33.7.74c-35.69,7.61-55.94,35.21-64.86,47.38-19.7,26.86-24.7,52.6-30.4,83.82-4.71,25.77-12.27,69.76.59,124.36,7.68,32.63,16.35,69.47,48.68,94.5,17.58,13.61,35.87,18.86,48.34,22.43,24.5,7,46.17,7.48,82.54,4.84,41.55-3,66.23-7.46,95.25-11.49,61.62-8.55,110.29-10.7,133.61-11.68,17.76-.74,15.5-.29,129-2.35l41.84-.78c2.25.27,32.12,3.3,51.62-20C883,1448,880,1425.21,879.48,1421.58Z"></path><path class="cls-1" d="M954.32,1164l147.42.89a32.88,32.88,0,0,1,29.94,19.79,355.44,355.44,0,0,1,6.17,269.1,32.78,32.78,0,0,1-30.5,21l-147.18.7a32.83,32.83,0,0,1-31.89-41.31,401.69,401.69,0,0,0-5.43-227.36A32.83,32.83,0,0,1,954.32,1164Z"></path><path class="cls-1" d="M958.71,1503.34l148.4-3.94a13.28,13.28,0,0,1,2.18.12,40.71,40.71,0,0,1,18.5,7.32c4.61,3.35,11.21,9.71,18.7,30.71a187.62,187.62,0,0,1,7.41,27c1.94,9.93-9.16,17.53-18.46,12.64l-72.11-38a12.91,12.91,0,0,0-17.24,4.91l-26,47.24c-5,9.14-19.1,8.34-22.89-1.32a170.07,170.07,0,0,0-26.37-45.34,161.71,161.71,0,0,0-20.17-20.66C942.22,1516.91,947.38,1503.64,958.71,1503.34Z"></path><path class="cls-2" d="M1727.3,1477a141.27,141.27,0,0,1-44,25.78c-34.32,12.28-64.43,7.21-83.67,4.27-20.44-3.11-61.94-6.75-145-14-28.61-2.51-35.93-2.16-84.59-3.53-8.75-.25-32.41-.94-79.71-2.67-21.57-.78-52.55-2-90.5-3.74-14.14-1.09-25.17-11-26.84-22.31-2.12-14.43,11.11-30.77,30.29-30.87,33.51,2.07,76.74,4.92,127.12,8.69,107.3,8,187.3,15.78,206.19,17.62C1590.28,1461.4,1654.54,1468.19,1727.3,1477Z"></path><path class="cls-2" d="M1164.35,1162.62c240.38-24.66,419.55-36.35,480.71-34,15.19.6,40.54,2.85,64.41,19.07,28.4,19.31,38.78,46.88,47.6,70.29,14.9,39.57,14.52,73.46,13.7,113.06a505.79,505.79,0,0,1-9.65,88.38c-2.55,6.88-8,18.16-19.26,23.33-9,4.16-17.54,2.4-28.28.72-16.8-2.64-34-2.08-50.77-5-6.49-1.13-44.9-4.44-121.71-11-59.31-5.1-165.12-13.55-300.75-23.17-7.41-1.09-17.85-3.8-26.83-11.48-26.15-22.39-15.39-66.06-18.21-115.3C1193.69,1249.13,1187,1209.65,1164.35,1162.62Z"></path></svg>
                        Help student
                    </a>
                    <button className="text-gray-700 outline-none p-2 rounded-lg focus:border-gray-400 focus:border lg:hidden"
                        onClick={() => setState(!state)}
                    >
                        {
                            state ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                </svg>
                            )
                        }
                    </button>
              </div>
              <div className={`flex-1 justify-center pb-3 mt-8 lg:flex lg:pb-0 lg:mt-0 ${ state ? 'block' : 'hidden'}`}>
                    <ul className="order-2 flex flex-col-reverse space-x-0 mb-6 lg:space-x-6 lg:flex-row lg:mb-0">
                        <AuthLink isLoggedIn={user?.loggedIn}>
                            <li className="nav-item mt-4 lg:mt-0">
                                <Link href="/login">
                                    <a className="py-3 px-4 text-center border text-gray-600 hover:text-indigo-600 rounded-lg block lg:inline lg:border-0">
                                        Login
                                    </a>
                                </Link>
                            </li>
                        </AuthLink>
                        <AuthLink isLoggedIn={user?.loggedIn}>
                            <li className="nav-item mt-8 lg:mt-0">
                                <Link href="/signup">
                                    <a className="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow block lg:inline">
                                        Sign Up
                                    </a>
                                </Link>
                            </li>
                        </AuthLink>
                        <ProtectedLink isLoggedIn={user?.loggedIn}>
                            <li className="nav-item mt-8 lg:mt-0">
                                <button className="w-full text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center justify-between border rounded-md p-2.5 md:border-none md:p-0 md:hover:bg-transparent"
                                    onClick={handleLogout}
                                >
                                    Logout
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </li>
                        </ProtectedLink>
                    </ul>
                    <div className="flex-1">
                        <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                            <li className="nav-item text-gray-600 hover:text-indigo-600">
                                <Link href="/">
                                    <a className="block">
                                        Home
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item text-gray-600 hover:text-indigo-600">
                                <Link href="/about">
                                    <a className="block">
                                        About us
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item text-gray-600 hover:text-indigo-600">
                                <a 
                                    className="block"
                                    href="mailto:studentsaids1@gmail.com"
                                >
                                    Support
                                </a>
                            </li>
                            <ProtectedLink isLoggedIn={user?.loggedIn}>                                
                                <li className="nav-item text-gray-600 hover:text-indigo-600">
                                    <Link href={'/dashboard/'+user?.user?.id}>
                                        <a className="block">
                                            Dashboard
                                        </a>
                                    </Link>
                                </li>
                            </ProtectedLink>
                        </ul>
                    </div>
              </div>
          </div>
      </nav>
  )
}