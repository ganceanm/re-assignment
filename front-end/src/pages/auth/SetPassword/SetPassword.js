import React from 'react';
import { Button, CardActions, CardContent, CardHeader, Card, makeStyles } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import PasswordInput from '../../../components/input/PasswordInput';
import WithAlert from '../../../components/functional/withAlert';
import { Form, Formik } from 'formik';
import { validation } from './validation';
import { setNewPassword, verifyToken } from '../../../store/auth/actions';



const useStyles = makeStyles(theme => ({
	formBox: {
		width: theme.breakpoints.values.sm - 200,
		margin: theme.spacing(2),
		padding: theme.spacing(2),
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.default,
	},

	textInput: {
		marginTop: theme.spacing(3)
	},

	cardContent: {
		display: "flex",
		flexDirection: "column",
	},

	buttonBox: {
		justifyContent: "space-between"
	}
}));

const Login = (props) => {
	const { showAlert } = props;

	const classes = useStyles();
	let history = useHistory();
	let resetToken = useParams().id;

	const onSubmit = async (values) => {
		const data = {
			token: resetToken,
			password: values.newPassword
		}

		const response = await verifyToken(resetToken);
		if (response === 204) {
			setTimeout(() => history.push("/login"), 6000)
			showAlert("login.linkExpired")
			return;
		}

		const result = await setNewPassword(data);

		if (result === 200) {
			showAlert("general.saveSuccess")
			setTimeout(() => history.push("/login"), 6000)
		} else if (result === 204) {
			showAlert("login.userNameError")
		} else {
			showAlert("general.default")
		}
	}

	const goBack = () => {
		history.push("/login")
	}


	return (
		<Formik
			initialValues={{ newPassword: "", passwordAgain: "" }}
			onSubmit={(values, { setSubmitting }) => onSubmit(values)}
			validationSchema={validation}
		>
			{formikProps => {
				const { values, handleChange, handleBlur, handleSubmit, errors } = formikProps;

				return (
					<Form onSubmit={handleSubmit} autoComplete="off">
						<Card className={classes.formBox}>
							<CardHeader title="Configure password" />
							<CardContent className={classes.cardContent}>
								<PasswordInput
									id="newPassword"
									label="New password"

									value={values.newPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.newPassword}
									helpertext={errors.newPassword}
								/>

								<PasswordInput
									wrapperclassname={classes.textInput}
									id="passwordAgain"
									label="Confirm new password"

									value={values.passwordAgain}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.passwordAgain}
									helpertext={errors.passwordAgain}
								/>
							</CardContent>
							<CardActions className={classes.buttonBox}>
								<Button onClick={() => goBack()} id={"back"} variant="contained" color="secondary">
									Cancel
                </Button>
								<Button type="submit" variant="contained" color="primary">
									Save
                </Button>
							</CardActions>
						</Card>
					</Form>
				)
			}}
		</Formik>
	)
}

export default WithAlert(Login);