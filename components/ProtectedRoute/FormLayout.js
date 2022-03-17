import Head from "next/head"
import Page404 from "../Page404/Page404"

export default (props) => {
    const { children, data } = props
    return (
        data.value && data.value.loggedIn ? (
            <>
                <Head>
                    <title>404: This page could not be found</title>
                </Head>
                <Page404 />
            </>
        ) : (
            children
        )
    )
}