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
import {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
} from '../../Firebase/firebase'


const index = () => {

    const [isLoad, setIsLoad] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailErr, setEmailErr] = useState("")
    const [passErr, setPassErr] = useState("")

    const [errMsg, setErrMsg] = useState("")
    const [infoMsg, setInfoMsg] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        setEmailErr("")
        setPassErr("")

        // Error messages
        setErrMsg("")
        setInfoMsg("")

        if (!validator.validate(email)) setEmailErr("Please enter correct email")
        else if (password.length < 8) setPassErr("Password should not be less than 8 character")
        else {

            // Back end
            logInWithEmailAndPassword(email, password)

        }
    }

    return (
        <>
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
                    log in
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-3">
                    <div>
                        <label className="text-gray-500 py-3 block">
                            Email
                        </label>
                        <Input
                            className="w-full"
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Error>
                            {emailErr}
                        </Error>
                    </div>
                    <div>
                        <label className="text-gray-500 py-3 block">
                            Password
                        </label>
                        <Input
                            className="w-full"
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
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
                            Submit
                        </Button>
                    </div>
                    <div className="text-gray-500">
                        Don't have an account? <Link href="/signup">
                            <a className="text-indigo-600">
                                Sign Up
                            </a>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default index