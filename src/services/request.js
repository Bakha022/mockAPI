import axios from 'axios'

const request = axios.create({
	baseURL: 'https://670f42213e7151861657172b.mockapi.io/shop/',
	timeout: 10000,
})

export default request
