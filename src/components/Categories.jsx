import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import request from '../services/request'
import CategoryItem from './CaregoryItem'
import Loading from './Loading'

const Categories = () => {
	const [loading, setLoading] = useState(false)
	const [category, setCategory] = useState([])
	useEffect(() => {
		const getCategories = async () => {
			try {
				setLoading(true)
				const { data } = await request.get('categories')
				setCategory(data)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		getCategories()
	}, [])
	return (
		<div className='mt-3'>
			<Row className='justify-content-between gap-1'>
				{
					loading ? <Loading/> : category?.map(item => (
						<CategoryItem key={item.id} {...item} />
					))
				}
			</Row>
		</div>
	)
}

export default Categories
