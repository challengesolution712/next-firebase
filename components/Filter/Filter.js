import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import SelectMenu from "../SelectMenu/SelectMenu"
import SelectMenuSearch from "../SelectMenuSearch/SelectMenuSearch"
import countries from "../../countries/countries"
import countriesCities from "../../json/countriesCities.json"

export default () => {

    const router = useRouter()

    const menuItems = countries
    const menuItems2 = ["Scholarships", "Volunteer mentor", "Volunteer instructor", "Financial Aid"]

    const [selectedItem, setSelectedItem] = useState({
        item: null,
        idx: null
    })

    const onchange = (e) => {
        console.log(e.target.value)
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
                        menuItems={menuItems}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />
                </div>
                <div className="flex-1">
                    <label className="block py-3 text-gray-600">
                        Type of aid
                    </label>
                    <SelectMenu
                        disabledItem="Type"
                        menuItems={menuItems2}
                        onChange={onchange}
                    />
                </div>
            </form>
        </div>
    )
}