import React, { createContext, useContext } from 'react'






export const CRUDContext = createContext()


const CRUDContextProvider = ({children}) => {






	const state = {}

	return (
		<CRUDContext.Provider value={state}>{children}</CRUDContext.Provider>
	)
}

export default CRUDContextProvider