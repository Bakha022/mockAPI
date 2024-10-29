import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import ReactPaginate from 'react-paginate'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ProductItem from '../components/ProductItem'
import { LIMIT } from '../constants'
import request from '../services/request'
const ProductsPage = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [total, setTotal] = useState(0)

	const { id } = useParams()
	const [params, setParams] = useState({
		page: 1,
		limit: LIMIT,
	})

	const page = Math.ceil(total / LIMIT)

	useEffect(() => {
		const getProducts = async () => {
			try {
				setLoading(true)
				const totalNum = await request.get(`categories/${id}/products`)
				const { data } = await request.get(`categories/${id}/products`, {
					params: params,
				})
				setTotal(totalNum?.data?.length)
				setProducts(data)
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

	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()

	return (
		<Container className='mt-5'>
			<>
				<div className='row justify-content-between'>
					<div className='col-6'>
						<Form.Control
							className='mb-3'
							type='text'
							placeholder='Searching by Product'
						/>
					</div>
					<div className='col-4'>
						<Form.Select>
							<option value='increase'>Increase</option>
							<option value='decrease'>Decrease</option>
						</Form.Select>
					</div>
					<div className='col-2'>
						<Button
							onClick={handleShow}
							style={{ width: '100%' }}
							variant='primary'
						>
							Add products
						</Button>
					</div>
				</div>
				<div className='mb-5'>
					<Link to={'/'}>Go to Home</Link>
				</div>
				<Form>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Form by Product added</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group className='mb-3'>
								<Form.Label>Product name</Form.Label>
								<Form.Control type='text' placeholder='Product name' />
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Product price</Form.Label>
								<Form.Control type='number' placeholder='Product price' />
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Product image</Form.Label>
								<Form.Control type='text' placeholder='Product image' />
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Product description</Form.Label>
								<Form.Control type='text' placeholder='Product description' />
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose}>
								Close
							</Button>
							<Button variant='primary' onClick={handleClose}>
								Add Products
							</Button>
						</Modal.Footer>
					</Modal>
				</Form>
			</>
			<Row className='gap-5 mb-3'>
				{loading ? (
					<Loading />
				) : (
					products?.map(item => <ProductItem key={item.id} {...item} />)
				)}
			</Row>
			<div className='w-100 d-flex justify-content-center my-3'>
				<ReactPaginate
					breakLabel='...'
					nextLabel='next >'
					onPageChange={handlePageClick}
					pageRangeDisplayed={7}
					pageCount={page}
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
