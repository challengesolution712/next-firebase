export default () => (
    <main className="max-w-screen-lg mx-auto pt-24 pb-4 overflow-hidden">
        <section className="mx-auto px-4 gap-12 sm:max-w-xl lg:flex lg:max-w-max">
            <div className="flex-1 relative">
                <div className="about-img-container">
                    <img 
                        src="/about.jpeg"
                        className="rounded-md relative z-10" 
                    />
                </div>
            </div>
            <div className="flex-1 mt-8 lg:mt-0">
                <h1 className="text-3xl text-gray-900 font-semibold">
                    On a mission to help students
                </h1>

                <div className="max-w-lg mt-8 text-[17px] text-gray-400 leading-relaxed space-y-3">
                    <p>
                        Students aids program is built to help students who are unable to continue their studies, for some reason, to report their problems, and the organizations, volunteers start help them, even the organizations can share offers, or something like that to help the students.
                    </p>
                    <p>
                        Our mission is to build the future of humanity. We are committed to help millions of people, who are unable to get an education.
                    </p>
                    <p>
                        And we are here to make the changes, and make the world a better place.
                    </p>
                    <p className="mt-5 text-gray-600 text-lg font-medium" style={{ wordSpacing: '30px' }}>
                        Let's build the future
                    </p>
                </div>
            </div>
        </section>

        <style jsx>
            {`

                .about-img-container::after {
                    position: absolute;
                    content: '';
                    top: -1.5em;
                    right: -1.5em;
                    width: 300px;
                    height: 250px;
                    background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
                }

            `}
        </style>
    </main>
)