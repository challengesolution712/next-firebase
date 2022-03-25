import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import SelectMenu from "../SelectMenu/SelectMenu"
import SelectMenuSearch from "../SelectMenuSearch/SelectMenuSearch"
import countries from "../../countries/countries"
import countriesCities from "../../countries/countriesCities.json"
import Link from "next/link"

export default () => {

    const router = useRouter()

    const aids = ["Scholarships", "Volunteer instructor", "Financial Aid"]
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
            <form
                className="gap-5 sm:flex"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="flex-1">
                    <label className="block py-3 text-gray-600">
                        Country
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
                                City
                            </label>
                            <SelectMenu
                                defaultValue={router.query.city || "Select a city"}
                                menuItems={cities}
                                onChange={handleCity}
                            />
                        </div>
                    ) : ''
                }
                <div className="flex-1">
                    <label className="block py-3 text-gray-600">
                        Type of aid
                    </label>
                    <SelectMenu
                        disabledItem="Type"
                        defaultValue={router.query.aid || "Type"}
                        menuItems={aids}
                        onChange={handleAid}
                    />
                </div>
            </form>
            <div className="mt-5">
                {
                    router.pathname != '/' ? (
                    <Link href="/">
                        <a className="px-8 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
                            Reset
                        </a>
                    </Link>
                    ) : ''
                }
            </div>
        </div>
    )
}