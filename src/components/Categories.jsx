import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Button, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import useFetch from '../hooks/useFetch'
import categorySchema from '../schemas/categorySchema'
import CategoryItem from './CaregoryItem'
import Loading from './Loading'

const Categories = () => {
	const [search, setSearch] = useState('')
	const [show, setShow] = useState(false)

	const params = JSON.stringify({ search })

	const { loading, data: category } = useFetch({
		url: 'categories',
		initialData: [],
		params,
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(categorySchema),
	})

	const handleClose = () => setShow(false)
	const handleShow = () => {
		setShow(true)
		reset()
	}

	const onSubmit = data => {
		setShow(false)
		console.log(data)
	}
	return (
		<>
			<div className='mt-3'>
				<InputGroup className='mb-3'>
					<Form.Control
						onChange={e => setSearch(e.target.value)}
						value={search}
						placeholder='Searching of Category'
					/>
					<Button onClick={handleShow}>Add Categories</Button>
				</InputGroup>
				<Row className='gap-5 my-5'>
					{loading ? (
						<Loading />
					) : (
						category?.map(item => <CategoryItem key={item.id} {...item} />)
					)}
				</Row>
			</div>
			<Modal show={show} onHide={handleClose}>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Header closeButton>
						<Modal.Title>Form by Category added</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group className='mb-3'>
							<Form.Label>Category name</Form.Label>
							<Form.Control
								{...register('name')}
								type='text'
								placeholder='Category name'
							/>
							{errors.name ? (
								<p className='my-3 text-danger'>{errors.name.message}</p>
							) : null}
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Category Image</Form.Label>
							<Form.Control
								{...register('image')}
								type='text'
								placeholder='Category Image'
							/>
							{errors.image ? (
								<p className='my-3 text-danger'>{errors.image.message}</p>
							) : null}
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Category of products name</Form.Label>
							<Form.Control
								{...register('products')}
								type='text'
								placeholder='Category of products name'
							/>
							{errors.products ? (
								<p className='my-3 text-danger'>{errors.products.message}</p>
							) : null}
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						<Button type='submit' variant='primary'>
							Save Changes
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}

export default Categories
