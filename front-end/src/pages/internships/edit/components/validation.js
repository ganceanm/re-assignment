import * as yup from 'yup';

export const validation = yup.object().shape({
	title: yup.string().required("This field is required!"),
	description: yup.string().required("This field is required!"),
	startingDate: yup.date().required("This field is required!"),
	duration: yup.number().typeError("This must be a number!").required("This field is required!"),
	location: yup.string().required("This field is required!"),
	hoursPerDay: yup.number().typeError("This must be a number!").required("This field is required!"),
})