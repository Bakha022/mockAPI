import React from 'react'
import { Button, Form } from 'react-bootstrap'

const Searching = () => {
	return (
		<div className='container mt-4'>
			<div className='row justify-content-between'>
				<div className='col-6'>
					<Form.Control className='mb-3' type='text' placeholder='Searching by Product' />
				</div>
				<div className='col-4'>
					<Form.Select>
						<option value='increase'>Increase</option>
						<option value='decrease'>Decrease</option>
					</Form.Select>
				</div>
				<div className='col-2'>
					<Button style={{ width: '100%' }} variant='primary'>
						Add products
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Searching
