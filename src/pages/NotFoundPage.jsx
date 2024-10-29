import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
	const navigate = useNavigate()
	return (
		<div className='d-flex flex-column gap-3 align-items-center'>
			<h1 className='text-danger pt-5 mb-3 text-center'>404</h1>
			<h4 className='text-center'>Not Found Page</h4>
			<Button onClick={() => navigate('/')}>Got to Home</Button>
		</div>
	)
}

export default NotFoundPage
