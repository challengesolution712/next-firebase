import { useMenuContext } from '../../context/contextApp'
import { about } from '../../dictionary/dictionary'

export default () => {

    const { locale } = useMenuContext()
    const aboutTrans = about[locale]

    return (
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
                       { aboutTrans.title }
                    </h1>

                    <div className="max-w-lg mt-8 text-[17px] text-gray-400 leading-relaxed space-y-3" dangerouslySetInnerHTML={{__html:aboutTrans.desc}}>
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
}