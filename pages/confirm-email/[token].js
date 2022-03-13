import axios from "axios";
import { useRouter } from "next/router"
import { useEffect } from "react/cjs/react.development";
import url from "../../url/url";

const index = ({ data }) => {

    const router = useRouter()

    useEffect(() => {
        console.log(data);
        if (data && data.exist) {
            router.push(`/dashboard/${data.id}`)
        }
        else router.push("/signup")
    }, [])

    
    return (
        <div className="mt-24 text-gray-800 text-3xl text-center font-medium">
            Loading...
        </div>
    )
}

index.getInitialProps = async ({ query }) => {
    const { token } = query
    const { data } = await axios.get(`${url}/api/${token}`)
    return {
        data
    }

}

export default index



