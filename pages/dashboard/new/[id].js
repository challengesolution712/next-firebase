import Input from "../../../components/Input/Input"
import Error from "../../../components/ValidationMsgs/Error"
import SelectMenu from "../../../components/SelectMenu/SelectMenu"
import SelectMenuSearch from "../../../components/SelectMenuSearch/SelectMenuSearch"
import countries from "../../../countries/countries"
import countriesCities from "../../../countries/countriesCities.json"
import { useState, useEffect } from "react"
import Button from "../../../components/Button/Button"
import Loading from "../../../components/Loading/Loading"
import validator from "email-validator"
import Auth from '../../../components/ProtectedRoute/Auth'
import Layout from '../../../components/ProtectedRoute/Layout'
import { useRouter } from "next/router"
import axios from "axios"
import { useMenuContext } from '../../../context/contextApp'
import { dashNewEdit, filter, dashNewEditFds } from '../../../dictionary/dictionary'

const index = ({ user, id }) => {

    const router = useRouter()

    const { locale } = useMenuContext()
    const newTrans = dashNewEdit[locale]
    const fds = dashNewEditFds[locale]

    const [state, setState] = useState({
        title: "",
        phone: "",
        email: "",
        aid: "",
        country: "",
        city: "",
        details: "",
        authorId: id
    })

    const [errors, setErrors] = useState({
        title: "",
        phone: "",
        email: "",
        aid: "",
        country: "",
        details: ""
    })

    const aids = filter[locale].aids
    
    const [cities, setCity] = useState([])
    const [selectedItem, setSelectedItem] = useState({
        item: null,
        idx: null
    })

    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        const { item } = selectedItem
        if (item) {
            setCity(countriesCities[item] || [])
            setState({
                ...state,
                country: item,
                city: ""
            })
        }

    }, [selectedItem])

    const setErrosFunc = msg => {

        setErrors({
            title: "",
            phone: "",
            email: "",
            aid: "",
            country: "",
            details: "",
            ...msg
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const { title, phone, email, aid, country, details } = state
        const detailsWords = details.split(" ").length

        setErrors({
            title: "",
            phone: "",
            email: "",
            aid: "",
            country: "",
            details: ""
        })
        
        if (title.length < 10) setErrosFunc({title: fds.title})
        else if (phone.length < 8) setErrosFunc({phone: fds.phone})
        else if (!validator.validate(email)) setErrosFunc({email: fds.email})
        else if (!aid) setErrosFunc({aid: fds.aid})
        else if (!country) setErrosFunc({country: fds.country})
        else if (detailsWords < 50) setErrosFunc({details: fds.details})
        else {
            
            setIsLoad(true)
            axios.post(`/api/new/${id}`, { data: state }).then(res => {
                if (res.data.success) {
                    setIsLoad(false)
                    setState({
                        title: "",
                        phone: "",
                        email: "",
                        aid: "",
                        country: "",
                        city: "",
                        details: ""
                    })
                    router.push('/dashboard/'+id)
                }
            })
        }

    }

    const { title, phone, email, aid, country, details } = errors

    return (
        <Layout id={id} data={user}>
            <div className="my-24 mx-auto px-4 max-w-screen-lg">
                <div className="bg-white shadow rounded-md p-4">
                    <h2 className="mt-2 text-center text-gray-800 text-2xl font-medium">
                        { locale == 'ar' ? 'نشر منشور' : 'Create a new post'}
                    </h2>

                    <div className="mt-12">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-3"
                        >
                            <div className="grid-cols-2 gap-x-8 sm:grid">
                                <div>
                                    <label className="text-gray-500 py-3 block">
                                        { newTrans.titleL }
                                    </label>
                                    <Input
                                        onChange={(e) => setState({
                                            ...state,
                                            title: e.target.value
                                        })}
                                        className="w-full"
                                        type="text"
                                        placeholder={newTrans.title}
                                    />
                                    <Error>
                                        { title }
                                    </Error>
                                </div>
                                <div>
                                    <label className="text-gray-500 py-3 block">
                                        { newTrans.phoneL }
                                    </label>
                                    <Input
                                        onChange={(e) => setState({
                                            ...state,
                                            phone: e.target.value
                                        })}
                                        className="w-full"
                                        type="number"
                                        placeholder={ newTrans.phone }
                                    />
                                    <Error>
                                        { phone }
                                    </Error>
                                </div>
                                <div>
                                    <label className="text-gray-500 py-3 block">
                                        { newTrans.emailL }
                                    </label>
                                    <Input
                                        onChange={(e) => setState({
                                            ...state,
                                            email: e.target.value
                                        })}
                                        className="w-full"
                                        type="email"
                                        placeholder={ newTrans.email }
                                    />
                                    <Error>
                                        { email }
                                    </Error>
                                </div>
                                <div>
                                    <label className="text-gray-500 py-3 block">
                                        { newTrans.aidL }
                                    </label>
                                    <SelectMenu
                                        onChange={(e) => setState({
                                            ...state,
                                            aid: e.target.value
                                        })}
                                        disabledItem={newTrans.aidSelected}
                                        menuItems={aids}
                                    />
                                    <Error>
                                        { aid }
                                    </Error>
                                </div>
                                <div>
                                    <label className="text-gray-500 py-3 block">
                                        { newTrans.countryL }
                                    </label>
                                    <SelectMenuSearch
                                        menuItems={countries}
                                        selectedItem={selectedItem}
                                        setSelectedItem={setSelectedItem}
                                    />
                                    <Error>
                                        { country }
                                    </Error>
                                </div>
                                {
                                    cities.length > 0 ? (
                                        <div>
                                            <label className="text-gray-500 py-3 block">
                                                { newTrans.cityL }
                                            </label>
                                            <SelectMenu
                                                onChange={(e) => setState({
                                                    ...state,
                                                    city: e.target.value
                                                })}
                                                disabledItem={newTrans.city}
                                                menuItems={cities}
                                                setSelectedItem={setSelectedItem}
                                            />
                                        </div>
                                    ) : ""
                                }
                            </div>
                            <div>
                                <label className="text-gray-500 py-3 block">
                                    { newTrans.details }
                                </label>
                                <textarea
                                    onChange={(e) => setState({
                                        ...state,
                                        details: e.target.value
                                    })}
                                    className="outline-none border rounded-md p-3 w-full h-48"
                                    placeholder={newTrans.textArea}
                                />
                                <Error>
                                    { details }
                                </Error>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="flex flex-row-reverse items-center justify-center mt-4 w-full ring-offset-2 ring-indigo-500 focus:ring-2"
                                >
                                    {
                                        locale == 'ar' ? 'نشر' : 'Create'
                                    }
                                    {
                                        isLoad ? (
                                            <Loading />
                                        ) : ''
                                    }
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Auth(index)