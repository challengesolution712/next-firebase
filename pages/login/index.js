import Input from "../../components/Input/Input"
import Loading from "../../components/Loading/Loading"
import { useState } from 'react'
import Button from "../../components/Button/Button"
import validator from "email-validator"
import Error from "../../components/ValidationMsgs/Error"
import ErrorAlert from "../../components/Alerts/ErrorAlert"
import jwt from "jsonwebtoken"
import jsCookie from "js-cookie"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import Auth from "../../components/ProtectedRoute/Auth"
import FormLayout from "../../components/ProtectedRoute/FormLayout"
import axios from "axios"
import { jwtSign } from "../../auth/jwt"
import { setTokenCookie } from "../../auth/cookies"
import { useMenuContext } from '../../context/contextApp'
import { login } from '../../dictionary/dictionary'

const index = ({ user }) => {

    const { locale } = useMenuContext()
    const loginTrans = login[locale]

    const [isLoad, setIsLoad] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailErr, setEmailErr] = useState("")
    const [passErr, setPassErr] = useState("")

    const [errMsg, setErrMsg] = useState("")

    const router = useRouter()

    const handleSubmit = e => {
        e.preventDefault()

        setEmailErr("")
        setPassErr("")

        // Error messages
        setErrMsg("")

        if (!validator.validate(email)) setEmailErr(loginTrans.emailE)
        else if (password.length < 8) setPassErr(loginTrans.passwordE)
        else {

            setIsLoad(true)
            axios.post('/api/login', { email, password }).then( async res => {
                const { empty, msg } = res.data
                if (empty) {
                    setIsLoad(false)
                    setErrMsg(msg);
                } else {
                    
                    setIsLoad(false)

                    setEmail("")
                    setPassword("")

                    const auth = {
                        user: {
                            id: res.data.id,
                            ...res.data.user
                        },
                        loggedIn: true
                    }
        
                    const token = await jwtSign(auth)
                    
                    await setTokenCookie(token)
        
                    await router.push(`/dashboard/${res.data.id}`)
                }
            })
        }
    }

    return (
        <FormLayout data={user}>
            <Head>
                <title>Login</title>
            </Head>


            {
                errMsg.length != 0 ? (
                    <ErrorAlert
                        msg={errMsg}
                        onClick={() => setErrMsg("")}
                    />
                ) : ''
            }

            <div className="mt-24 max-w-2xl mx-4 p-4 bg-white rounded-md shadow sm:p-8 sm:mx-auto">
                <h2 className="text-3xl font-semibold text-center py-4">
                    { loginTrans.title }
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-3">
                    <div>
                        <label className="text-gray-500 py-3 block">
                            { loginTrans.emailL }
                        </label>
                        <Input
                            className="w-full"
                            type="email"
                            placeholder={ loginTrans.email }
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Error>
                            {emailErr}
                        </Error>
                    </div>
                    <div>
                        <label className="text-gray-500 py-3 block">
                            { loginTrans.passwordL }
                        </label>
                        <Input
                            className="w-full"
                            type="password"
                            placeholder={ loginTrans.password }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Error>
                            {passErr}
                        </Error>
                    </div>
                    <Link href="/forget">
                        <a className="text-indigo-600">
                            { loginTrans.forgetNote }
                        </a>
                    </Link>
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
                            { loginTrans.submit }
                        </Button>
                    </div>
                    <div className="text-gray-500">
                        { loginTrans.signupNote } <Link href="/signup">
                            <a className="text-indigo-600">
                                { loginTrans.signup }
                            </a>
                        </Link>
                    </div>
                </form>
            </div>
        </FormLayout>
    )
}

export default Auth(index)