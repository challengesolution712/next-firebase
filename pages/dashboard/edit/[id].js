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
import TextLoading from '../../../components/TextLoading/TextLoading'
import axios from "axios"
import { useRouter } from "next/router"
import InfoAlert from "../../../components/Alerts/InfoAlert"

const index = ({ user, id }) => {

    const router = useRouter()

    const [state, setState] = useState({
        title: "",
        phone: "",
        email: "",
        aid: "",
        country: "",
        city: "",
        details: "",
        authorId: ""
    })

    const [errors, setErrors] = useState({
        title: "",
        phone: "",
        email: "",
        aid: "",
        country: "",
        details: ""
    })

    const [infoMsg, setInfoMsg] = useState("")

    const aids = ["Scholarships", "Volunteer instructor", "Financial Aid"]
    
    const [cities, setCity] = useState([])
    const [selectedItem, setSelectedItem] = useState({
        item: null,
        idx: null
    })

    const [isLoad, setIsLoad] = useState(false)
    const [dataLoad, setDataLoad] = useState(true)

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
        
        if (title.length < 20) setErrosFunc({title: "Title should not be less than 20 characters"})
        else if (phone.length < 8) setErrosFunc({phone: "Phone number should not be less than 8 numbers"})
        else if (!validator.validate(email)) setErrosFunc({email: "Please enter correct email"})
        else if (!aid) setErrosFunc({aid: "Please select aid type"})
        else if (!country) setErrosFunc({country: "Please select a country"})
        else if (detailsWords < 50) setErrosFunc({details: "Details should not be less than 50 words"})
        else {

            setIsLoad(true)

            const data = {...state}
            
            axios.post(`/api/edit/${id}/?post=${router.query.post}`, { data }).then(res => {
                const { updated, msg } = res.data
                if (updated) {
                    setIsLoad(false)
                    setInfoMsg(msg)
                    document.getElementById('info-alert')
                    .scrollIntoView({behavior: 'smooth'})
                }
            })
        }

    }

    useEffect(() => {

        if (id) {
            axios.get(`/api/edit/${id}/?post=${router.query.post}`).then(res => {
                const { empty, post } = res.data
                if (empty) router.push('/')
                else {
                    setDataLoad(false)
                    // const { title, phone, email, aid, country, city, details } = doc
                    setState({
                        ...post
                    })

                    const selectedIdx = countries.indexOf(post.country)

                    setSelectedItem({
                        item: post.country,
                        idx: selectedIdx
                    })
                }
            })
        }        

    }, [id])

    const { title, phone, email, aid, country, details } = errors

    return (
        <Layout id={id} data={user}>

            {
                infoMsg.length != 0 ? (
                    <InfoAlert
                        title="Update post"
                        msg={infoMsg}
                        onClick={() => setInfoMsg("")}
                    />
                ) : ''
            }
            
            {
                dataLoad ? (
                    <TextLoading />
                ) : (
                    <div className="my-24 mx-auto px-4 max-w-screen-lg">
                        <div className="bg-white shadow rounded-md p-4">
                            <h2 className="mt-2 text-center text-gray-800 text-2xl font-medium">
                                Edit post
                            </h2>

                            <div className="mt-12">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-3"
                                >
                                    <div className="grid-cols-2 gap-x-8 sm:grid">
                                        <div>
                                            <label className="text-gray-500 py-3 block">
                                                Title
                                            </label>
                                            <Input
                                                onChange={(e) => setState({
                                                    ...state,
                                                    title: e.target.value
                                                })}
                                                value={state.title}
                                                className="w-full"
                                                type="text"
                                                placeholder="Enter post title"
                                            />
                                            <Error>
                                                { title }
                                            </Error>
                                        </div>
                                        <div>
                                            <label className="text-gray-500 py-3 block">
                                                Phone number
                                            </label>
                                            <Input
                                                onChange={(e) => setState({
                                                    ...state,
                                                    phone: e.target.value
                                                })}
                                                value={state.phone}
                                                className="w-full"
                                                type="number"
                                                placeholder="Enter phone number"
                                            />
                                            <Error>
                                                { phone }
                                            </Error>
                                        </div>
                                        <div>
                                            <label className="text-gray-500 py-3 block">
                                                Email
                                            </label>
                                            <Input
                                                onChange={(e) => setState({
                                                    ...state,
                                                    email: e.target.value
                                                })}
                                                value={state.email}
                                                className="w-full"
                                                type="email"
                                                placeholder="Enter email"
                                            />
                                            <Error>
                                                { email }
                                            </Error>
                                        </div>
                                        <div>
                                            <label className="text-gray-500 py-3 block">
                                                Aid type
                                            </label>
                                            <SelectMenu
                                                onChange={(e) => setState({
                                                    ...state,
                                                    aid: e.target.value
                                                })}
                                                defaultValue={state.aid}
                                                disabledItem="Type"
                                                menuItems={aids}
                                            />
                                            <Error>
                                                { aid }
                                            </Error>
                                        </div>
                                        <div>
                                            <label className="text-gray-500 py-3 block">
                                                Country
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
                                                        City
                                                    </label>
                                                    <SelectMenu
                                                        onChange={(e) => setState({
                                                            ...state,
                                                            city: e.target.value
                                                        })}
                                                        defaultValue={state.city}
                                                        disabledItem="Select a city"
                                                        menuItems={cities}
                                                    />
                                                </div>
                                            ) : ""
                                        }
                                    </div>
                                    <div>
                                        <label className="text-gray-500 py-3 block">
                                            Details
                                        </label>
                                        <textarea
                                            onChange={(e) => setState({
                                                ...state,
                                                details: e.target.value
                                            })}
                                            value={state.details}
                                            className="outline-none border rounded-md p-3 w-full h-48"
                                            placeholder="Please write full, clear, enough details"
                                        />
                                        <Error>
                                            { details }
                                        </Error>
                                    </div>
                                    <div>
                                        <Button
                                            type="submit"
                                            className="flex items-center justify-center mt-4 w-full ring-offset-2 ring-indigo-500 focus:ring-2"
                                        >
                                            {
                                                isLoad ? (
                                                    <Loading />
                                                ) : ''
                                            }
                                            Update
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                )
            }
        </Layout>
    )
}

export default Auth(index)