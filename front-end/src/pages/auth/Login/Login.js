import React from 'react';
import { TextField, Button, Card, CardHeader, CardContent, CardActions, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import withAlert from '../../../components/functional/withAlert';
import { Formik, Form } from "formik";
import { logIn } from '../../../store/auth/actions';
import { validation } from './validation';
import PasswordInput from "../../../components/input/PasswordInput";

const useStyles = makeStyles(theme => ({
	formBox: {
		margin: theme.spacing(2),
		padding: theme.spacing(2),
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.default,
		// height: "100%",
		maxWidth: theme.breakpoints.values.sm - 200,
	},

	textInput: {
		marginTop: theme.spacing(3)
	},

	buttonBox: {
		justifyContent: "space-between"
	}
}));

const Login = (props) => {
	const { showAlert } = props;

	const classes = useStyles();
	let history = useHistory();


	const onSubmit = async (values) => {

		const response = await logIn(values);

		if (response === 406) {
			showAlert("login.userNameError")
			return;
		} else if (response === 401) {
			showAlert("login.passwordError")
			return;
		} else {
			history.push("/dashboard")
		}
	}

	const handleResetPassword = () => {
		history.push("/resetpassword")
	}


	return (
		<Formik
			initialValues={{
				userName: "",
				password: ""
			}}
			onSubmit={(values, { setSubmitting }) => onSubmit(values)}
			validationSchema={validation}
		>
			{formikProps => {
				const { values, handleChange, handleBlur, handleSubmit, errors } = formikProps;
				return (
					<Form onSubmit={handleSubmit}>
						<Card className={classes.formBox}>
							<CardHeader title="Sign in" />
							<CardContent>
								<TextField id="userName"
									label="E-mail address"
									variant="outlined"
									value={values.userName}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.userName}
									helperText={errors.userName}
									required
									fullWidth
								/>
								<PasswordInput
									id="password"
									label="Password"
									wrapperclassname={classes.textInput}
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.password}
									helpertext={errors.password}
								/>
							</CardContent>
							<CardActions className={classes.buttonBox}>
								<Button onClick={() => handleResetPassword()}
									id={"reset"}
									color="secondary">
									Forgot my password
                </Button>

								<Button type="submit" variant="contained" color="primary">
									Sign in
                </Button>
							</CardActions>
						</Card>
					</Form>
				)
			}}
		</Formik>
	)
}

export default withAlert(Login);
