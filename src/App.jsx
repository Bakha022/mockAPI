import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { TOKEN } from './constants'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductsPage from './pages/ProductsPage'

const App = () => {
	const [isLogin, setIsLogin] = useState(!!localStorage.getItem(TOKEN))

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/login'
						element={<LoginPage setIsLogin={setIsLogin} />}
					/>
					<Route element={<Layout />}>
						<Route
							index
							element={isLogin ? <HomePage /> : <Navigate to={'/login'} />}
						/>
						<Route path='categories/:id' element={<ProductsPage />} />
					</Route>
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
