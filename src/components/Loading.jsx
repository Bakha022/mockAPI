import React from 'react'
import { ThreeDot } from 'react-loading-indicators'

const Loading = () => {
	return (
		<div
			style={{ height: '100vh' }}
			className='w-100 d-flex justify-content-center align-items-center'
		>
			<ThreeDot color='#0d6efd' size='medium' text='' textColor='' />
		</div>
	)
}

export default Loading
