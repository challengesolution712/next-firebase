import Link from "next/link"
import Button from "../../components/Button/Button"
import Auth from "../../components/ProtectedRoute/Auth"
import Layout from "../../components/ProtectedRoute/Layout"
import UserPost from "../../components/UserPost/UserPost"
import TextLoading from "../../components/TextLoading/TextLoading"
import useSWR from 'swr'
import FetchDataAlert from "../../components/FetchDataAlert/FetchDataAlert"
import { useState } from "react"
import ModalDanger from "../../components/Modals/ModalDanger"
import axios from "axios"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const index = ({ user, id }) => {

    const [state, setState] = useState({
        bool: false,
        id: ''
    })

    const [loading, setLoading] = useState(false)

    const { data, error } = useSWR(`/api/user/${id}`, fetcher)

    const deletePost = () => {

        setLoading(true)

        axios.post(`/api/delete/${id}`, { id: state.id }).then(res => {
            if (res.data.success) {
                setLoading(false)
                setState({
                    bool: false,
                    id: ''
                })
            }
        })
    }
    
    return (
        <Layout id={id} data={user}>
            <div className="mt-24 mx-auto px-4 max-w-screen-lg">
                <div className="bg-white shadow rounded-md p-4">
                    <div className="py-3 border-b items-center justify-between sm:flex">
                        <div>
                            <h3 className="text-gray-800 text-lg font-medium">
                                post
                            </h3>
                            <p className="text-gray-500">
                                Create a new post easily and quickly
                            </p>
                        </div>
                        <Link href={`/dashboard/new/${id}`}>
                            <a className="block mt-3 sm:mt-0">
                                <Button className="py-2.5 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    New post
                                </Button>
                            </a>
                        </Link>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-gray-800 text-xl font-medium">
                            All posts
                        </h3>
                        {
                            !data ? <TextLoading doteBg="bg-white" /> : (
                                data.empty ? (
                                    <FetchDataAlert 
                                        info="You have not create any post yet!"
                                    />
                                ) : (
                                    <ul className="mt-12 space-y-14">
                                        <UserPost 
                                            id={id} 
                                            posts={data?.posts}
                                            onClick={setState}
                                        />
                                    </ul>
                                )
                            )
                        }

                    </div>
                </div>
            </div>
            {
                state.bool ? (
                    <ModalDanger 
                        title="Delete Post"
                        desc="Are you sure you want to delete this post? Please click the delete button below"
                        setState={() => setState({bool: false, id: ''})}
                        loading={loading}
                        onClick={deletePost}
                    />
                ) : ""
            }
        </Layout>
    )
}

export default Auth(index)