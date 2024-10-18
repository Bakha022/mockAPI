import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const ProductsPage = () => {
	const { id } = useParams()
	// console.log(id)
	const { data } = useFetch(`categories/${id}/products`)
	console.log(data)

	return <div>ProductsPage</div>
}

export default ProductsPage
