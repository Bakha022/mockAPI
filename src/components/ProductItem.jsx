import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ProductItem = ({ name, image, price, description, id, categoryId }) => {
	return (
		<Col xs={12} sm={6} md={4} lg={3} xl={2}>
			<Card style={{ width: '14rem' }}>
				<LazyLoadImage
					style={{ width: '14rem' }}
					alt={`${name} image`}
					effect='blur'
					src={image}
				/>
				<Card.Body>
					<span className='badge text-bg-danger text-light mb-2 me-3'>
						Category: {categoryId}
					</span>
					<span className='badge text-bg-warning text-light mb-2'>
						Id: {id}
					</span>
					<Card.Title>{name}</Card.Title>
					<Card.Text className='product-text'>{description}</Card.Text>
					<span className='badge text-bg-primary text-light mb-2'>
						Price: {price}
					</span>
					<div className='d-flex gap-2 mt-y align-items-center' >
						<Button variant='danger'>Delete</Button>
						<Button variant='warning'>Edit</Button>
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default ProductItem
