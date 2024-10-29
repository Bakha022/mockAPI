import * as Yup from 'yup'

const CategorySchema = Yup.object().shape({
	name: Yup.string().required('Name is required!'),
	image: Yup.string().required('Image is required!'),
	products: Yup.string().required('Products  is required!'),
})

export default CategorySchema
