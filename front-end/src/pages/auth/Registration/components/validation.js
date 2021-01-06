import * as yup from 'yup';
import { USER_ROLE } from "../../../../constants/enum/UserRole"

export const validation = yup.object().shape({
	firstName: yup.string().required("This field is required!"),
	lastName: yup.string().required("This field is required!"),
	email: yup.string().required("This field is required!").email("Érvénytelen e-mail cím!"),
	phone: yup.string().required("This field is required!"),
	userRole: yup.string().required("This field is required!")
		.test("student-teacher-test", "Ez a felhasználó nem lehet bentlakó!", function test(userRole) {
			if (userRole === USER_ROLE[0].value) {
				return true;
			} else if (this.parent.roomNumber !== "0") {
				return false;
			} else return true;
		})
		.test("student-group-test", "Ez a felhasználó nem hallgató!", function test(userRole) {
			if (userRole === USER_ROLE[0].value) {
				return true;
			} else if (this.parent.studentClass !== "0" || this.parent.studentYear !== "0") {
				return false;
			} else return true;
		}),
	roomNumber: yup.string().required("This field is required!").max(3),
	studentClass: yup.string().required("This field is required!"),
	studentYear: yup.string().required("This field is required!")
		.test("class-year-test", "Válasszon évfolyamot!", function test(studentYear) {
			if (studentYear !== "0") {
				return true;
			} else if (this.parent.studentClass !== "0") {
				return false;
			} else return true;
		}),
})