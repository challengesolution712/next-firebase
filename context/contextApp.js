import { createContext, useContext } from 'react'

// Create Context object.
const MenuContext = createContext()

// Export Provider.
export function MenuProvider(props) {
	const {value, children} = props
	
	return (
	   <MenuContext.Provider value={value}>
		{children}
	   </MenuContext.Provider>
	)
}

// Export useContext Hook.
export function useMenuContext() {
	return useContext(MenuContext);
}