import { useMenuContext } from '../../context/contextApp'

export default ({ className, doteBg }) => {

    const { locale } = useMenuContext()

    return (
        <div className={`flex justify-center mt-24 px-4 text-gray-800 text-3xl text-center font-medium ${className}`}>
            <div className={`text-loading ${locale == 'ar' ? 'ar-text-loading' : ''}`}>
                {locale == 'ar' ? 'جاري البحث' : 'Loading'}
                <span className={`dote-container text-4xl ${doteBg}`}>
                    ...
                </span>
            </div>
        </div>
    )
}