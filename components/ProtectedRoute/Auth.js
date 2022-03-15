import parseCookie from "../../parseCookie/parseCookie"
import { jwtVerify } from "../../auth/jwt"

const ProtectedRoute = (Component) => {
    
    Component.getInitialProps = ({ req }) => {
        const { token } = parseCookie(req)
        const data = token ? jwtVerify(token) : {}
        
        return { user: data }
    }

    return Component
    
}

export default ProtectedRoute