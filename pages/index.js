import Head from 'next/head'
import { useState } from 'react'
import Card from '../components/Card/Card'
import Filter from '../components/Filter/Filter'
// import LoadCardsBtn from '../components/LoadCardsBtn/LoadCardsBtn'
import { useRouter } from 'next/router'
import axios from 'axios'
import url from '../url/url'
import { useMenuContext } from '../context/contextApp'
import { homeHeader } from '../dictionary/dictionary'
import GetStartedBtn from '../components/GetStartedBtn/GetStartedBtn'
import parseCookie from '../parseCookie/parseCookie'
import { jwtVerify } from '../auth/jwt'

export default function Home({ posts, user }) {

  const router = useRouter()
  const { locale } = useMenuContext()
  const home = homeHeader[locale]

  console.log(user);

  // const [isLoad, setIsLoad] = useState(false)

  // const loadMore = () => {
  //   setIsLoad(true)
  // }

  return (
    <>
      <Head>
        <title>Help student</title>
        <meta name="description" content="Our mission is to build the future of humanity. We are committed to help millions of people, who are unable to get an education." />
      </Head>


      <main className="mt-24 mb-5 mx-auto px-4 max-w-screen-lg lg:px-8">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-4xl font-semibold">
            { home.title }
          </h1>
          <p className="mt-6 text-gray-500">
            { home.desc }
          </p>
        </div>
        {
          user?.value?.loggedIn ? '' : (
            <div>
              <GetStartedBtn />
            </div>
          )
        }
        <Filter />
        <div>
          <h3 className="text-2xl text-gray-800 font-semibold">
            { home.title2 }
          </h3>
          <ul className="mt-12 space-y-6">
            <Card posts={posts} />
          </ul>
        </div>
        <div className="mt-7 flex justify-center">
          {/* <LoadCardsBtn
            isLoad={isLoad}
            onClick={loadMore}
          /> */}
        </div>
      </main>
    </>
  )
}


export const getServerSideProps = async ({ req, locale }) => {

  const { data } = await axios.post(`${url}/api/posts`, { locale })

  const { token } = parseCookie(req)
  const user = token ? jwtVerify(token) : {}

  return {
    props: {
      posts: data.posts,
      user
    }
  }
}