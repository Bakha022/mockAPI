import { useEffect, useState } from 'react'
import request from '../services/request'

const useFetch = (url) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])
	useEffect(() => {
		const getCategories = async () => {
			try {
				setLoading(true)
				const { data } = await request.get(url)
				setData(data)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		getCategories()
	}, [])
	return { loading, data }
}

export default useFetch
