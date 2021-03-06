import Input from "../../components/Input/Input"
import Error from "../../components/ValidationMsgs/Error"
import Button from "../../components/Button/Button"
import { useState, useEffect } from 'react'
import Head from "next/head"
import axios from "axios"
import Loading from "../../components/Loading/Loading"
import { useRouter } from "next/router"
import TextLoading from '../../components/TextLoading/TextLoading'
import InfoAlert from "../../components/Alerts/InfoAlert"
import { useMenuContext } from '../../context/contextApp'
import { reset } from '../../dictionary/dictionary'

export default () => {

    const { locale } = useMenuContext()
    const resetTrans = reset[locale]

    const router = useRouter()

    const [isLoad, setIsLoad] = useState(false)
    const [loading, setLoading] = useState(true)
    
    const [password, setPassword] = useState("")

    const [passErr, setPassErr] = useState("")

    const [infoMsg, setInfoMsg] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        setPassErr("")

        if (password.length < 8) setPassErr(resetTrans.passwordE)
        else {

            setIsLoad(true)

            axios.post(`/api/reset/${router.query.token}/?id=${router.query.id}`, { password }).then( async res => {
                if (res.data.updated) {
                    
                    setInfoMsg(res.data.msg[locale])
                    setIsLoad(false)
                    document.getElementById('info-alert')
                    .scrollIntoView({behavior: "smooth"})
                    setPassword("")
                    setTimeout(() => {
                        router.push('/login')
                    }, 1500)
                }
            })
        }
        
    }

    useEffect(() => {
        if (router.query.token) {
            axios.get(`/api/reset/${router.query.token}/?id=${router.query.id}`).then(res => {
                if (res.data.empty) router.push('/')
                else setLoading(false)
            })
        }

    }, [router.query.token])
    
    return (
        !loading ? (
            <>
                {
                    infoMsg.length != 0 ? (
                        <InfoAlert
                            title={locale == 'ar' ? "?????????? ???????? ????????" : "Reset password"}
                            msg={infoMsg}
                            onClick={() => setInfoMsg("")}
                        />
                    ) : ''
                }
                <div className="max-w-screen-sm mt-24 mx-auto">
                    <Head>
                        <title>
                            Reset password
                        </title>
                    </Head>
                    <div className="mx-4 px-4 py-8 bg-white rounded-md shadow-md">
                        <h2 className="text-3xl font-semibold text-center py-4">
                            { resetTrans.title }
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="text-gray-500 py-3 block">
                                    { resetTrans.passwordL }
                                </label>
                                <Input
                                    className="w-full"
                                    type="password"
                                    placeholder={ resetTrans.password }
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <Error>
                                    {passErr}
                                </Error>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="flex items-center justify-center mt-3 w-full ring-offset-2 ring-indigo-500 focus:ring-2"
                                >
                                    {
                                        isLoad ? (
                                            <Loading />
                                        ) : ''
                                    }
                                    { resetTrans.submit }
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        ) : <TextLoading />
    )
}