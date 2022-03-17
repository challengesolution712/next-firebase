export const ProtectedLink = (props) => {
    const { children, isLoggedIn } = props
    return isLoggedIn ? children : ''
}

export const AuthLink = (props) => {
    const { children, isLoggedIn } = props
    return isLoggedIn ? '' : children
}