import Navbar from '../components/Navbar/Navbar'
import Page404 from '../components/Page404/Page404'
import Head from 'next/head'

export default () => {
    return (
        <>
            <Head>
                <title>404: This page could not be found</title>
            </Head>
            <Page404 />
        </>
    )
}