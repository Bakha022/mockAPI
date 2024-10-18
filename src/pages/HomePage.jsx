import React from 'react'
import Categories from '../components/Categories'
import Searching from '../components/Searching'

const HomePage = () => {
	return (
		<div className='container mt-3'>
			<Searching />
			<Categories />
		</div>
	)
}

export default HomePage
