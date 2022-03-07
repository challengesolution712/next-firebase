import Navbar from '../components/Navbar/Navbar'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
