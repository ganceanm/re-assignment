const alertKeys = {
	login: {
		expired: {
			text: "Login expired!",
			severity: "error"
		},
		passwordError: {
			text: "Password incorrect!",
			severity: "error"
		},
		userNameError: {
			text: "Username incorrect!",
			severity: "error"
		},
		userExists: {
			text: "E-mail already in use!",
			severity: "error"
		},
		registrationSuccess: {
			text: "Registration successful!",
			severity: "success"
		},
		resetPassSuccess: {
			text: "Check your inbox! You will receive instructions on resetting your password!",
			severity: "success"
		},
		linkExpired: {
			text: "This link has expired!",
			severity: "error"
		},
	},
	general: {
		default: {
			text: "Error!",
			severity: "error"
		},
		saveSuccess: {
			text: "Save successful!",
			severity: "success"
		}
	},
	users: {
		notuniqueemail: {
			text: "E-mail already in use!",
			severity: "error"
		}
	},
}

const getAlert = (path) => {
	if (!path) {
		return alertKeys.general.default
	}

	const items = path.split('.')

	const response = alertKeys[items[0]][items[1]]

	if (response) {
		return response;
	} else {
		return alertKeys.general.default
	}
}


export default getAlert;