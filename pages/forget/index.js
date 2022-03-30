import Input from "../../components/Input/Input"
import Error from "../../components/ValidationMsgs/Error"
import Button from "../../components/Button/Button"
import validator from "email-validator"
import { useState } from 'react'
import Head from "next/head"
import axios from "axios"
import InfoAlert from "../../components/Alerts/InfoAlert"
import ErrorAlert from "../../components/Alerts/ErrorAlert"
import Loading from "../../components/Loading/Loading"
import url from '../../url/url'

export default () => {

    const [isLoad, setIsLoad] = useState(false)
    
    const [email, setEmail] = useState("")

    const [emailErr, setEmailErr] = useState("")

    const [errMsg, setErrMsg] = useState("")
    const [infoMsg, setInfoMsg] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        setEmailErr("")

        if (!validator.validate(email)) setEmailErr("Please enter correct email")
        else {

            setIsLoad(true)

            axios.post('/api/forget', { email, url }).then(res => {
                const { success, msg } = res.data

                setIsLoad(false)

                if (success) {
                    setInfoMsg(msg)
                    setEmail("")
                }
                else setErrMsg(msg)
                
            })
        }
    }
    
    return (
        <>
            {
                errMsg.length != 0 ? (
                    <ErrorAlert
                        msg={errMsg}
                        onClick={() => setErrMsg("")}
                    />
                ) : ''
            }

            {
                infoMsg.length != 0 ? (
                    <InfoAlert
                        title="Reset password"
                        msg={infoMsg}
                        onClick={() => setInfoMsg("")}
                    />
                ) : ''
            }

            <div className="max-w-screen-sm mt-24 mx-auto">
                <Head>
                    <title>
                        Forget password
                    </title>
                </Head>
                <div className="mx-4 px-4 py-8 bg-white rounded-md shadow-md">
                    <h2 className="text-3xl font-semibold text-center py-4">
                        Forget password
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="text-gray-500 py-3 block">
                                Email
                            </label>
                            <Input
                                className="w-full"
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <Error>
                                {emailErr}
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
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}