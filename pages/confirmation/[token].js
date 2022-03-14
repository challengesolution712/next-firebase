import axios from "axios";
import { useRouter } from "next/router"
import { useEffect } from "react";
import url from "../../url/url";
import jwt from "jsonwebtoken";
import { setTokenCookie } from "../../auth/cookies";
import { jwtSign } from "../../auth/jwt";

const token = ({ data }) => {

    const router = useRouter()

    // useEffect( async () => {
    //     if (token) {
    //         // const { data } = await axios.get(`${url}/api/confirmation/${token}`, { params: {token} })
    //         console.log(data);
    //         if (data && data.exist) {
    //             router.push(`/dashboard/${data.id}`)
    //         } else router.push("/signup")
    //     }
    // }, [token])

    useEffect( async () => {
        if (data && data.exist) {

            const { id, user } = data

            const token = await jwtSign(user)
            
            await setTokenCookie(token)

            await router.push(`/dashboard/${id}`)
            
        } else router.push("/signup")
    }, [])

    
    return (
        <div className="mt-24 text-gray-800 text-3xl text-center font-medium">
            Loading...
        </div>
    )
}

token.getInitialProps = async ({ query }) => {
    const { token } = query
    const { data } = await axios.get(`${url}/api/confirmation/${token}`, { params: {token} })
    return {
        data
    }

}

export default token



