import Head from "next/head"
import moment from "moment"
import Link from "next/link"

export default () => {
    return (
        <main className="mt-24 mb-20 mx-4 md:max-w-screen-lg md:mx-auto">
            <Head>
                <title>
                    Content page
                </title>
            </Head>
            <div className="bg-white shadow rounded-md">            
                <div className="p-4 py-5 border-b sm:px-8">
                    <span className="text-gray-800 text-lg font-medium">
                        Student Aid
                    </span>
                    <p className="mt-1 text-gray-500">
                        More information and details about the student
                    </p>
                </div>
                <article className="px-4 py-8 sm:px-8">
                    <h1 className="text-3xl font-semibold">
                        I need Help to pay for the school
                    </h1>
                    <div className="mt-10 flex flex-wrap gap-4 items-center">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-500">
                                { moment(Date.now()).format("dddd, MMMM Do YYYY") }
                            </span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-500">
                                United state, Los Angles
                            </span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-500">
                                Volunteer mentor
                            </span>
                        </div>                    
                    </div>
                    <div className="mt-10">
                        <h3 className="text-xl text-gray-800 font-medium">
                            Details
                        </h3>

                        <p className="max-w-screen-md text-gray-500 leading-relaxed mt-3">
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </p>
                    </div>
                    <div className="mt-10 justify-between items-center max-w-screen-md sm:flex">
                        <span className=" text-gray-800 font-medium">
                            Contact the student for more details and to help him.
                        </span>
                        <div className="items-center gap-2 sm:flex">
                            <a 
                                className="w-full inline-flex items-center justify-center mt-3 py-2.5 px-3 border shadow rounded-md text-gray-500 sm:mt-0"
                                href="mailto:example@gmail.com">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                Message
                            </a>

                            <a 
                                className="w-full inline-flex items-center justify-center mt-3 py-2.5 px-3 border shadow rounded-md text-gray-500 sm:mt-0"
                                href="tel:46703284">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                Call
                            </a>
                        </div>
                    </div>
                </article>
            </div>

            <Link href="/">
                <a className="mt-10 inline-flex items-center py-3 px-8 shadow drop-shadow-xl rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Back
                </a>
            </Link>
        </main>
    )
}