import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { TOKEN } from './constants'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

const App = () => {
	const [isLogin, setIsLogin] = useState(
		!!localStorage.getItem(TOKEN)
	)

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						index
						element={isLogin ? <HomePage /> : <Navigate to={'/login'} />}
					/>
					<Route
						path='/login'
						element={<LoginPage setIsLogin={setIsLogin} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
