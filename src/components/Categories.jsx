import React, { useState } from 'react'
import { Button, Form, InputGroup, Row } from 'react-bootstrap'
import useFetch from '../hooks/useFetch'
import CategoryItem from './CaregoryItem'
import Loading from './Loading'

const Categories = () => {
	const [search, setSearch] = useState('')
	const params = JSON.stringify({ search })
	const { loading, data: category } = useFetch({
		url: 'categories',
		initialData: [],
		params,
	})
	return (
		<div className='mt-3'>
			<InputGroup className='mb-3'>
				<Form.Control
					onChange={e => setSearch(e.target.value)}
					value={search}
					placeholder='Searching of Category'
				/>
				<Button>Add Categories</Button>
			</InputGroup>
			<Row className='gap-5 my-5'>
				{loading ? (
					<Loading />
				) : (
					category?.map(item => <CategoryItem key={item.id} {...item} />)
				)}
			</Row>
		</div>
	)
}

export default Categories
