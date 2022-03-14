import axios from "axios";
import { useRouter } from "next/router"
import { useEffect } from "react";
import url from "../../url/url";

const token = ({ data }) => {

    const router = useRouter()
    const { token } = router.query

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
            // const { data } = await axios.get(`${url}/api/confirmation/${token}`, { params: {token} })
        if (data && data.exist) {
            router.push(`/dashboard/${data.id}`)
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



