import React from 'react'
import { Row } from 'react-bootstrap'
import useFetch from '../hooks/useFetch'
import CategoryItem from './CaregoryItem'
import Loading from './Loading'

const Categories = () => {
	const { loading, data: category } = useFetch('categories')
	return (
		<div className='mt-3'>
			<Row className='justify-content-between gap-1'>
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
