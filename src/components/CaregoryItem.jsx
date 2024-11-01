import React from 'react'
import { Button, Card, Col, Container } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'

const CaregoryItem = ({ name, products, id, image, handleDelete, handleEdit }) => {
	return (
		<Col xs={12} sm={6} md={4} lg={3} xl={2}>
			<Card style={{ width: '14rem' }}>
				<LazyLoadImage
					style={{ width: '14rem', borderRadius: '0.375rem' }}
					alt={`${name} image`}
					effect='blur'
					src={image}
				/>
				<Card.Body>
					<span className='badge text-bg-warning text-light mb-2'>
						Id: {id}
					</span>
					<Card.Title>{name}</Card.Title>
					<Card.Text>{products}</Card.Text>
					<Link to={`/categories/${id}`}>Get Products</Link>
				</Card.Body>
				<Container>
					<div className='d-flex gap-3'>
						<Button
							className='my-3 w-50'
							variant='danger'
							onClick={() => handleDelete(id)}
						>
							Delete
						</Button>
						<Button
							className='my-3 w-50'
							variant='warning'
							onClick={() => handleEdit(id)}
						>
							Edit
						</Button>
					</div>
				</Container>
			</Card>
		</Col>
	)
}

export default CaregoryItem
