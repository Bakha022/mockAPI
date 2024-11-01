import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Button, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import useFetch from '../hooks/useFetch'
import categorySchema from '../schemas/categorySchema'
import request from '../services/request'
import CategoryItem from './CaregoryItem'
import Loading from './Loading'

const Categories = () => {
	const [search, setSearch] = useState('')
	const [show, setShow] = useState(false)
	const [seleceted, setSelected] = useState(null)

	const params = JSON.stringify({ search })

	const {
		loading,
		data: category,
		refetch,
	} = useFetch({
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
		defaultValues: {
			name: '',
			image: '',
			products: '',
		},
	})

	const handleClose = () => {
		setShow(false)
		setSelected(null)
		reset({
			name: '',
			image: '',
			products: '',
		})
	}
	const handleShow = () => {
		reset({
			name: '',
			image: '',
			products: '',
		})

		setSelected(null)
		setShow(true)
	}

	const onSubmit = async data => {
		try {
			if (seleceted === null) {
				await request.post('categories', data)
			} else {
				await request.put(`categories/${seleceted}`, data)
			}
			handleClose()
			refetch()
		} catch (error) {
			console.log(error)
		}
		reset({
			name: '',
			image: '',
			products: '',
		})
	}
	const handleDelete = async id => {
		try {
			await request.delete(`categories/${id}`)
			refetch()
		} catch (err) {
			console.log(err)
		}
	}

	const handleEdit = async id => {
		try {
			const { data } = await request.get(`categories/${id}`)
			reset(data)
		} catch (error) {
			console.log(error)
		}
		setShow(true)
		setSelected(id)
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
						category?.map(item => (
							<CategoryItem
								handleDelete={handleDelete}
								handleEdit={handleEdit}
								key={item.id}
								{...item}
							/>
						))
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
							{seleceted == null ? 'Add' : 'Save chages'} category
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}

export default Categories
