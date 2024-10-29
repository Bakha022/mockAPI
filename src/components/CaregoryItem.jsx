import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'

const CaregoryItem = ({ name, products, id, image }) => {
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
					<span className='badge text-bg-warning text-light mb-2'>
						Id: {id}
					</span>
					<Card.Title>{name}</Card.Title>
					<Card.Text>{products}</Card.Text>
					<Link to={`/categories/${id}`}>Get Products</Link>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default CaregoryItem
