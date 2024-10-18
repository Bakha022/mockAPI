import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TOKEN } from '../constants'

import LoadingComponent from '../components/Loading'
import loginSchema from '../schemas/loginSchema'

const LoginPage = ({ setIsLogin }) => {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(loginSchema) })

	const onSubmit = data => {
		const req = async values => {
			try {
				setLoading(true)
				let res = await axios.post('https://reqres.in/api/login', values)
				localStorage.setItem(TOKEN, res.data.token)
				setIsLogin(true)
				navigate('/')
				reset()
			} catch (error) {
				toast.error(error.response.data.error)
			} finally {
				setLoading(false)
			}
		}
		req(data)
	}
	return loading ? (
		<LoadingComponent />
	) : (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			className='w-25 mt-5 bg-info p-4 mx-auto rounded'
		>
			<Form.Group className='mb-3'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type='email'
					placeholder='name@example.com'
					{...register('email')}
				/>
				{errors.email && <p className='text-danger'>{errors.email.message}</p>}
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					placeholder='password'
					type='password'
					{...register('password')}
				/>
				{errors.password && (
					<p className='text-danger'>{errors.password.message}</p>
				)}
			</Form.Group>
			<Button type='submit' className='bg-success w-100'>
				Send
			</Button>
		</Form>
	)
}

export default LoginPage
