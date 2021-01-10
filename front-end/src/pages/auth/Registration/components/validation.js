import * as yup from 'yup';
import { USER_ROLE } from "../../../../constants/enum/UserRole"

export const validation = yup.object().shape({
	email: yup.string().required("This field is required!").email("Field must be email address!"),


})