import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { Link } from 'react-router-dom'

const Searching = () => {
	// const [search, setSearch] = useState('')

	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()
	// useEffect(() => {
	// 	const getFilter = async () => {
	// 		const { data } = await request.get('categories/1/products', {
	// 			params: { title: 'h' },
	// 		})
	// 		console.log(data)
	// 	}

	// 	getFilter()
	// }, [search])
	// const handleSearching = e => {
	// 	setSearch(e.target.value)
	// }

	return (
		<div className='container mt-4'>
			<div className='row justify-content-between'>
				<div className='col-6'>
					<Form.Control
						// value={search}
						// onChange={handleSearching}
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
						<Form.Label>Product category</Form.Label>

						<Form.Select>
							<option value='1'>One</option>
							<option value='2'>Two</option>
							<option value='3'>Three</option>
							<option value='4'>Fourth</option>
						</Form.Select>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						<Button variant='primary' onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</Form>
		</div>
	)
}

export default Searching
