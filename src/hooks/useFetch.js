import { useEffect, useState } from 'react'
import request from '../services/request'

const useFetch = ({ url, params, initialData = null }) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(initialData)
	const [callback, setCallback] = useState(false)

	function refetch() {
		setCallback(!callback)
	}

	useEffect(() => {
		const getData = async () => {
			try {
				setLoading(true)
				const { data } = await request.get(url, {
					params: params ? JSON.parse(params || '') : {},
				})
				setData(data)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		getData()
	}, [url, params, callback])
	return { loading, data, refetch }
}

export default useFetch
