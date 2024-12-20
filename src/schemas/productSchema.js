import * as Yup from 'yup'

const ProductSchema = Yup.object().shape({
	name: Yup.string().required('Name is required!'),
	image: Yup.string().required('Image is required!'),
	price: Yup.number()
		.typeError('Age must be a number')
		.required('Image is required!'),
	description: Yup.string().required('Description  is required!'),
})

export default ProductSchema
