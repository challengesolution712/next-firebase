import Page404 from "../Page404/Page404"

export default (props) => {
    const { children, data } = props

    return (
        data.value && data.value.loggedIn ? <Page404 /> : (
            children
        )
    )
}