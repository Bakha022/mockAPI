import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import Categories from '../components/Categories'

const HomePage = () => {
	return (
		<div className='container mt-3'>
			<InputGroup className='mb-3'>
				<Form.Control placeholder='Searching of Category' />
				<Button>Add Categories</Button>
			</InputGroup>
			<Categories />
		</div>
	)
}

export default HomePage
