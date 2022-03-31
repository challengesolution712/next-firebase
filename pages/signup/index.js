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
import axios from "axios"
import Auth from "../../components/ProtectedRoute/Auth"
import FormLayout from "../../components/ProtectedRoute/FormLayout"
import { useMenuContext } from '../../context/contextApp'
import { signup } from '../../dictionary/dictionary'

const index = ({ user }) => {

    const { locale } = useMenuContext()
    const signupTrans = signup[locale]

    const tokgen = new TokenGenerator(256, TokenGenerator.BASE62)

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

        if (!validator.validate(email)) setEmailErr(signupTrans.emailE)
        else if (password.length < 8) setPassErr(signupTrans.passwordE)
        else if (!selecedtItem) setSelecedtItemErr(signupTrans.roleE)
        else {

            setIsLoad(true)

            // Back end
            const data = {
                email,
                password,
                role: selecedtItem,
                token: tokgen.generate(),
                confirmed: false
            }

            axios.post("/api/signup", { data,  url: location.origin}).then(res => {
                
                const { success, msg } = res.data
                if (success) {
                    setInfoMsg(msg)
                    setIsLoad(false)
                    setEmail("")
                    setPassword("")
                    setSelecedtItem("")
                } else {
                    setErrMsg(msg)
                    setIsLoad(false)
                }
            })
        }
    }

    const menuItems = signupTrans.roleItems

    return (
        <FormLayout data={user}>
            <Head>
                <title>{ signupTrans.title }</title>
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
                        title={locale == 'ar' ? 'تأكيد البريد اﻹلكتروني' : 'Email confirmation'}
                        msg={infoMsg}
                        onClick={() => setInfoMsg("")}
                    />
                ) : ''
            }

            <div className="mt-24 max-w-2xl mx-4 p-4 bg-white rounded-md shadow sm:p-8 sm:mx-auto">
                <h2 className="text-3xl font-semibold text-center py-4">
                    { signupTrans.title }
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-3">
                    <div>
                        <label className="text-gray-500 py-3 block">
                            { signupTrans.emailL }
                        </label>
                        <Input
                            value={email}
                            className="w-full"
                            type="email"
                            placeholder={signupTrans.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Error>
                            {emailErr}
                        </Error>
                    </div>
                    <div>
                        <label className="text-gray-500 py-3 block">
                            { signupTrans.passwordL }
                        </label>
                        <Input
                            value={password}
                            className="w-full"
                            type="password"
                            placeholder={ signupTrans.password }
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Error>
                            {passErr}
                        </Error>
                    </div>
                    <div>
                        <label className="text-gray-500 py-3 block">
                            { signupTrans.roleL }
                        </label>
                        <SelectMenu
                            value={selecedtItem}
                            disabledItem={ signupTrans.role }
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
                            className="flex flex-row-reverse items-center justify-center mt-3 w-full ring-offset-2 ring-indigo-500 focus:ring-2"
                        >
                            { signupTrans.submit }
                            {
                                isLoad ? (
                                    <Loading />
                                ) : ''
                            }
                        </Button>
                    </div>
                    <div className="text-gray-500">
                        { signupTrans.loginNote } <Link href="/login">
                            <a className="text-indigo-600">
                                { signupTrans.login }
                            </a>
                        </Link>
                    </div>
                </form>
            </div>
        </FormLayout>
    )
}

export default Auth(index)