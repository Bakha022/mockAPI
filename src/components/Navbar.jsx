import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
	const navigate = useNavigate()
	return (
		<div className='container mt-4'>
			<div className='d-flex align-items-center justify-content-between w-100'>
				<h3 className='text-center my-4'>MockAPI</h3>

				<Button
					onClick={() => navigate('/login')}
					variant='warning'
					className='text-white'
				>
					Log In
				</Button>
			</div>
		</div>
	)
}

export default Navbar
