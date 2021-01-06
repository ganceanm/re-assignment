import * as yup from 'yup';

export const validation = yup.object().shape({
	userName: yup.string().required("This field is required!"),
	password: yup.string().required("This field is required!")
})