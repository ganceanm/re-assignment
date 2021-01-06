import React from 'react';
import { Button, Card, CardHeader, CardContent, CardActions, makeStyles, TextField } from '@material-ui/core';
// import api from '../api';
import WithAlert from '../../../components/functional/withAlert';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { resetPassword } from '../../../store/auth/actions';

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

	buttonBox: {
		justifyContent: "space-between"
	}
}));

const Login = (props) => {
	const { showAlert } = props;

	const classes = useStyles();
	let history = useHistory();


	const onSubmit = async (values) => {
		const result = await resetPassword(values);
		if (result === 200) {
			showAlert("login.resetPassSuccess")
		} else if (result === 204) {
			showAlert("login.userNameError")
		} else {
			showAlert("general.default")
		}
	}

	const goBack = () => {
		history.goBack()
	}


	return (
		<Formik
			initialValues={{ userName: '' }}
			onSubmit={(values, { setSubmitting }) => onSubmit(values)}
		// validation={validation}
		>
			{formikProps => {
				const { values, handleChange, handleBlur, handleSubmit } = formikProps;
				return (
					<Form onSubmit={handleSubmit}>
						<Card className={classes.formBox}>
							<CardHeader title="Reset password" />
							<CardContent>
								<TextField id="userName"
									label="E-mail address"
									variant="outlined"
									value={values.userName}
									onChange={handleChange}
									onBlur={handleBlur}
									autocomplete='new-password'
									required
									fullWidth
								/>
							</CardContent>
							<CardActions className={classes.buttonBox}>
								<Button onClick={() => goBack()} id={"back"} variant="contained" color="secondary">
									Cancel
                </Button>
								<Button type="submit" variant="contained" color="primary">
									Reset password
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
