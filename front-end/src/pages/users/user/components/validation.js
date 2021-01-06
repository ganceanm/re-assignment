import * as yup from 'yup';

export const validation = yup.object().shape({
	firstName: yup.string().required("This field is required!"),
	lastName: yup.string().required("This field is required!"),
	email: yup.string().required("This field is required!").email("Invalid e-mail address!"),
	phone: yup.string().required("This field is required!"),
})