import * as Yup from 'yup'

const ProductSchema = Yup.object().shape({
	name: Yup.string().required('Name is required!'),
	image: Yup.string().url('Enter a valid URL').required('Image is required!'),
	price: Yup.number()
		.typeError('Age must be a number')
		.required('Image is required!'),
	description: Yup.string.required('Description  is required!'),
	category: Yup.string()
		.oneOf(['One', 'Two', 'Three', 'Fourth'], 'Invalid category')
		.required('Category is required!'),
})

export default ProductSchema
