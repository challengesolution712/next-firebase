import Link from "next/link"
import Button from "../../components/Button/Button"
import UserPost from "../../components/UserPost/UserPost"

const index = () => {
    return (
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
                    <Link href="/dashboard/new/dsfgdfsdfgf">
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

                    <ul className="mt-12 space-y-14">
                        <UserPost />
                        <UserPost />
                        <UserPost />
                        <UserPost />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default index