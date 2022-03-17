import parseCookie from "../../parseCookie/parseCookie"
import { jwtVerify } from "../../auth/jwt"

const ProtectedRoute = (Component) => {
    
    Component.getInitialProps = ({ req, query }) => {
        const { token } = parseCookie(req)
        const { id } = query
        const data = token ? jwtVerify(token) : {}
        
        return { user: data, id }
    }

    return Component
    
}

export default ProtectedRoute