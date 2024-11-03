import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import ReactPaginate from 'react-paginate'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ProductItem from '../components/ProductItem'
import { LIMIT } from '../constants'
import productSchema from '../schemas/productSchema'
import request from '../services/request'

const ProductsPage = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [total, setTotal] = useState(0)
	const [selected, setSelected] = useState(null)

	const [callBack, setCallBack] = useState(false)
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
	}, [params.page, callBack])

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		resolver: yupResolver(productSchema),
		defaultValues: {
			name: '',
			price: '',
			image: '',
			description: '',
		},
	})

	const handlePageClick = e => {
		const selectedPage = e.selected + 1
		setParams(prevParams => ({
			...prevParams,
			page: selectedPage,
		}))
	}

	const [show, setShow] = useState(false)

	const handleClose = () => {
		setShow(false)
		reset({
			name: '',
			price: '',
			image: '',
			description: '',
		})
	}
	const handleShow = () => {
		setShow(true)
		reset({
			name: '',
			price: '',
			image: '',
			description: '',
		})
	}

	const onSubmit = async data => {
		setShow(false)
		try {
			if (selected === null) {
				await request.post(`categories/${id}/products`, data)
			} else {
				await request.put(`categories/${id}/products/${selected}`, data)
			}
			setCallBack(!callBack)
		} catch (error) {
			console.log(error)
		}

		reset({
			name: '',
			price: '',
			image: '',
			description: '',
		})
	}

	const handleDeleted = async dataId => {
		try {
			await request.delete(`categories/${id}/products/${dataId}`)
			setCallBack(!callBack)
		} catch (error) {
			console.log(error)
		}
	}

	const handleEdit = async dataId => {
		try {
			const { data } = await request.get(`categories/${id}/products/${dataId}`)
			reset(data)
		} catch (error) {
			console.log(error)
		}
		setShow(true)
		setSelected(dataId)
	}

	return (
		<Container className='mt-5'>
			<>
				<div className='row justify-content-between my-5 align-items-center'>
					<div className='col-2'>
						<Link to={'/'}>Go to Home</Link>
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
				<Modal show={show} onHide={handleClose}>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Modal.Header closeButton>
							<Modal.Title>Form by Product added</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group className='mb-3'>
								<Form.Label>Product name</Form.Label>
								<Form.Control
									{...register('name')}
									type='text'
									placeholder='Product name'
								/>
								{errors.name ? (
									<p className='my-3 text-danger'>{errors.name.message}</p>
								) : null}
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Product price</Form.Label>
								<Form.Control
									{...register('price')}
									type='number'
									placeholder='Product price'
								/>
								{errors.price ? (
									<p className='my-3 text-danger'>{errors.price.message}</p>
								) : null}
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Product image</Form.Label>
								<Form.Control
									{...register('image')}
									type='text'
									placeholder='Product image'
								/>
								{errors.image ? (
									<p className='my-3 text-danger'>{errors.image.message}</p>
								) : null}
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Product description</Form.Label>
								<Form.Control
									{...register('description')}
									type='text'
									placeholder='Product description'
								/>
								{errors.description ? (
									<p className='my-3 text-danger'>
										{errors.description.message}
									</p>
								) : null}
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose}>
								Close
							</Button>
							<Button type='submit' variant='primary'>
								{selected ? 'Save Changes' : 'Add'} Products
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</>
			<Row className='gap-5 mb-3'>
				{loading ? (
					<Loading />
				) : (
					products?.map(item => (
						<ProductItem
							handleEdit={handleEdit}
							handleDeleted={handleDeleted}
							key={item.id}
							{...item}
						/>
					))
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
