import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ProductItem from '../components/ProductItem'
import { LIMIT } from '../constants'
import request from '../services/request'

const ProductsPage = () => {
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	// const [activePage, setActigePage] = useState(1)
	const [loading, setLoading] = useState(false)

	const { id } = useParams()
	const [params, setParams] = useState({
		page: 1,
		limit: LIMIT,
	})

	useEffect(() => {
		const getProducts = async () => {
			try {
				setLoading(true)
				const { data } = await request.get(`categories/${id}/products`, {
					params: params,
				})
				setProducts(data)
				setTotal(data.length)
			} finally {
				setLoading(false)
			}
		}

		getProducts()
	}, [params.page])

	const handlePageClick = e => {
	
		const selectedPage = e.selected + 1 
		setParams(prevParams => ({
			...prevParams,
			page: selectedPage,
		}))
	}
	return (
		<Container>
			<Row className='gap-5 mb-3'>
				{loading ? (
					<Loading />
				) : (
					products?.map(item => <ProductItem key={item.id} {...item} />)
				)}
			</Row>
			<div className='w-100 d-flex justify-content-center my-3'>
				<ReactPaginate
					initialPage={0}
					breakLabel='...'
					nextLabel='next >'
					onPageChange={handlePageClick}
					pageRangeDisplayed={total}
					pageCount={4}
					previousLabel='< previous'
					renderOnZeroPageCount={null}
					className='pagination user-select-none'
					pageClassName='page-item'
					pageLinkClassName='page-link'
					previousLinkClassName='page-link'
					nextLinkClassName='page-link'
					activeLinkClassName='active'
					breakLinkClassName='page-link'
				/>
			</div>
		</Container>
	)
}

export default ProductsPage
