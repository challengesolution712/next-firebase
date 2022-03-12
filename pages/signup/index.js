import Input from "../../components/Input/Input"
import SelectMenu from '../../components/SelectMenu/SelectMenu'
import Loading from "../../components/Loading/Loading"
import { useState } from 'react'
import Button from "../../components/Button/Button"
import validator from "email-validator"
import TokenGenerator from "uuid-token-generator"
import Error from "../../components/ValidationMsgs/Error"
import ErrorAlert from "../../components/Alerts/ErrorAlert"
import InfoAlert from "../../components/Alerts/InfoAlert"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import signup from "../../Firebase/signup"


const index = () => {

    const tokgen = new TokenGenerator(256, TokenGenerator.BASE62)
    const router = useRouter()

    const [isLoad, setIsLoad] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [selecedtItem, setSelecedtItem] = useState("")

    const [emailErr, setEmailErr] = useState("")
    const [passErr, setPassErr] = useState("")
    const [selecedtItemErr, setSelecedtItemErr] = useState("")

    const [errMsg, setErrMsg] = useState("")
    const [infoMsg, setInfoMsg] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        setEmailErr("")
        setPassErr("")
        setSelecedtItemErr("")

        // Error messages
        setErrMsg("")
        setInfoMsg("")

        if (!validator.validate(email)) setEmailErr("Please enter correct email")
        else if (password.length < 8) setPassErr("Password should not be less than 8 character")
        else if (!selecedtItem) setSelecedtItemErr("Please select a role")
        else {

            // Back end
            const data = {
                email,
                password,
                role: selecedtItem,
                token: tokgen.generate(),
                conirmed: false
            }
            signup(email, password, data.role).then(res => {
                console.log(res);   
            })
            // router.push('/login')

        }
    }

    const menuItems = ["Student", "Organization", "Mentor"]

    return (
        <>
            <Head>
                <title>Sign up</title>
            </Head>


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
                        title="Email confirmation"
                        msg={infoMsg}
                        onClick={() => setInfoMsg("")}
                    />
                ) : ''
            }

            <div className="mt-24 max-w-2xl mx-4 p-4 bg-white rounded-md shadow sm:p-8 sm:mx-auto">
                <h2 className="text-3xl font-semibold text-center py-4">
                    Sign up
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
                        <label className="text-gray-500 py-3 block">
                            Role
                        </label>
                        <SelectMenu
                            disabledItem="Select your role"
                            menuItems={menuItems}
                            onChange={(e) => setSelecedtItem(e.target.value)}
                        />
                        <Error>
                            {selecedtItemErr}
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
                        Already have an account? <Link href="/login">
                            <a className="text-indigo-600">
                                Log in
                            </a>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default index