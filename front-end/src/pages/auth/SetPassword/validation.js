import * as yup from 'yup';

export const validation = yup.object().shape({
	newPassword: yup.string().min(6, "The new password should have at least 6 characters!").required("This field is required!"),
	passwordAgain: yup.string().oneOf([yup.ref('newPassword'), null], "The passwords don't match!")
})