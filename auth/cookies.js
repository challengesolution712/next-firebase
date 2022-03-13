import cookies from 'js-cookie'

export const getUserFromCookie = () => {
    const cookie = cookies.get('auth')
    if (!cookie) {
        return
    }
    return cookie
}

export const setUserCookie = (user) => {
    cookies.set('auth', user, {
        secure: true,  
        expires: 1,
    })
}
