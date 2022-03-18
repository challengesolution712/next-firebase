import Head from "next/head"
import Page404 from "../Page404/Page404"

const CustomPage404 = () => (
    <>
        <Head>
            <title>404: This page could not be found</title>
        </Head>
        <Page404 />
    </>
)

export default (props) => {

    const { children, data, id } = props

    return (
        data?.value?.loggedIn ? (
            data?.value?.user.id == id ? (
                children
            ) : <CustomPage404 />
        ) : (
            <CustomPage404 />
        )
    )
}