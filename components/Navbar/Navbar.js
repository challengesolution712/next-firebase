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
      const customStyle = ["sticky-nav", "fixed", "border-b"]
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

          <div className="items-center px-4 py-2 max-w-screen-lg mx-auto lg:flex">
              <div className="flex justify-between items-center py-3 lg:py-5 lg:block">
                    <a href="/">
                        <img
                            src="/logo.svg" 
                            width={150} 
                            height={60}
                            alt="Students aids logo"
                        />
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
                                <Link href="/about">
                                    <a className="block">
                                        Support
                                    </a>
                                </Link>
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