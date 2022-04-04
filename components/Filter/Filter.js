import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import SelectMenu from "../SelectMenu/SelectMenu"
import SelectMenuSearch from "../SelectMenuSearch/SelectMenuSearch"
import countries from "../../countries/countries"
import countriesCities from "../../countries/countriesCities.json"
import Link from "next/link"
import { filter } from '../../dictionary/dictionary'
import { useMenuContext } from '../../context/contextApp'

export default () => {

    const router = useRouter()
    
    const { locale } = useMenuContext()
    const filterLang = filter[locale]

    const aids = filterLang.aids
    const [cities, setCity] = useState(null)

    const [selectedItem, setSelectedItem] = useState({
        item: null,
        idx: null
    })

    const handleAid = (e) => {
        router.push({
            pathname: '/search/q',
            query: { 
                ...router.query,
                aid:  e.target.value,
            }
        })
    }

    const handleCity = (e) => {
        router.push({
            pathname: '/search/q',
            query: { 
                ...router.query,
                city:  e.target.value,
            }
        })
    }

    useEffect(() => {
        if (selectedItem.item) {
            router.push({
                pathname: '/search/q',
                query: {
                    ...router.query,
                    country:  selectedItem.item,
                }
            })

        }
        
    }, [selectedItem.item])
    
    useEffect(() => {
        if (router.query.country) setCity(countriesCities[router.query.country])

    }, [router.query.country])

    const updateCountry = () => {
        if (router.query.country) {
            const idxOfCountry = countries.indexOf(router.query.country)
            return {
                item: router.query.country,
                idx: idxOfCountry
            }
        } else return {
            item: null,
            idx: null
        }
    }

    return (
        <div className="py-4 max-w-xl mx-auto mt-12">
            <h3 className="py-4 text-xl font-medium">
                { filterLang.title }
            </h3>
            <form
                className="gap-5 sm:flex"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="flex-1">
                    <label className="block py-3 text-gray-600">
                        { filterLang.label1 }
                    </label>
                    <SelectMenuSearch
                        menuItems={countries}
                        selectedItem={ updateCountry()}
                        setSelectedItem={setSelectedItem}
                    />
                </div>
                {
                    cities?.length > 0 ? (
                        <div className="flex-1">
                            <label className="block py-3 text-gray-600">
                                { filterLang.label3 }
                            </label>
                            <SelectMenu
                                disabledItem={router.query.city || filterLang.selectedItem3}
                                menuItems={cities}
                                onChange={handleCity}
                            />
                        </div>
                    ) : ''
                }
                <div className="flex-1">
                    <label className="block py-3 text-gray-600">
                        { filterLang.label2 }
                    </label>
                    <SelectMenu
                        disabledItem={ filterLang.selectedItem2 }
                        defaultValue={router.query.aid || filterLang.selectedItem2}
                        menuItems={aids}
                        onChange={handleAid}
                    />
                </div>
            </form>
            <div className="mt-5">
                {
                    router.pathname != '/' ? (
                    <Link href="/">
                        <a className={`px-8 ${locale == 'ar' ? 'py-2' : 'py-3'} text-white bg-indigo-600 hover:bg-indigo-700 rounded-md`}>
                            { filterLang.reset }
                        </a>
                    </Link>
                    ) : ''
                }
            </div>
        </div>
    )
}