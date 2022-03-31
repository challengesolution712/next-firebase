import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar'
import { MenuProvider } from '../context/contextApp';
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  const { locale } = router

  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@500&display=swap" rel="stylesheet" />    
    </Head>
    
    <MenuProvider value={{
      locale,
      path: router.asPath
    }}>
      <div
        className={`${locale == 'ar' ? 'ar-font' : 'en-font'}`}
        style={{ direction: locale == 'en' ? 'ltr' : 'rtl' }}
      >
        <header>
          <Navbar />
        </header>
        <Component {...pageProps} />
      </div>
    </MenuProvider>
    </>
  )
}

export default MyApp
