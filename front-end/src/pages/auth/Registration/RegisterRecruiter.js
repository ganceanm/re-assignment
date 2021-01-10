import React from "react";
import { makeStyles, Card, CardContent, TextField, CardActions, Button, CardHeader } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { validation } from "./components/validation";
import WithAlert from "../../../components/functional/withAlert";
import { APP_BAR_HEIGHT } from "../../../constants/theme";
import { registerUser } from "../../../store/auth/actions";
import { USER_ROLE } from "../../../constants/enum/UserRole";

const useStyles = makeStyles(theme => ({
	content: {
		marginTop: APP_BAR_HEIGHT,
		width: "100%",
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},

	card: {
		margin: theme.spacing(2),
		padding: theme.spacing(2),
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.paper,
		// height: "100%",
		display: "flex",
		flexDirection: "column",
		width: "100%",
		maxWidth: theme.breakpoints.values.md,
	},

	textInput: {
		margin: theme.spacing(1),
		minWidth: 140,
		width: "100%"
	},

	buttonBox: {
		marginTop: theme.spacing(2),
		justifyContent: "space-between",
		marginRight: theme.spacing(2)
	},

	selectorWrapper: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
	},
}));

const Content = (props) => {
	const { showAlert } = props;

	const classes = useStyles();
	let history = useHistory();

	const onSubmit = async (values) => {
		const data = {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			phoneNumber: values.phone,
			userRole: USER_ROLE[1].value,
		}

		const result = await registerUser(data)

		if (result) {
			showAlert("general.saveSuccess")
			setTimeout(() => history.goBack(), 3000)
		} else {
			showAlert("users.notuniqueemail")
		}

	}

	return (
		<div className={classes.content}>
			<Formik
				validateOnChange={false}
				validateOnBlur={false}
				initialValues={{
					firstName: "",
					lastName: "",
					email: '',
					phone: "",
				}}
				onSubmit={(values) => onSubmit(values)}
				validationSchema={validation}
			>
				{formikProps => {
					const { values, handleChange, handleBlur, handleSubmit, errors } = formikProps;
					return (
						<Form onSubmit={handleSubmit}>
							<Card className={classes.card}>
								<CardHeader title={"Sign up (Recruiter)"} />
								<CardContent>
									<div className={classes.selectorWrapper}>
										<TextField id="firstName"
											label="First Name"
											variant="outlined"
											className={classes.textInput}
											required

											value={values.firstName}
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errors.firstName}
											helperText={errors.firstName}
										/>
										<TextField id="lastName"
											label="Last Name"
											variant="outlined"
											className={classes.textInput}
											required

											value={values.lastName}
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errors.lastName}
											helperText={errors.lastName}
										/>
									</div>

									<div className={classes.selectorWrapper}>
										<TextField id="email"
											label="E-mail address"
											variant="outlined"
											className={classes.textInput}
											required

											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errors.email}
											helperText={errors.email}
										/>
										<TextField id="phone"
											label="Phone number"
											variant="outlined"
											className={classes.textInput}
											required

											value={values.phone}
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errors.phone}
											helperText={errors.phone}
										/>
									</div>

								</CardContent>
								<CardActions className={classes.buttonBox}>
									<Button color="secondary"
										onClick={() => history.goBack()}>
										Cancel
        					</Button>

									<Button type="submit" variant="contained" color="primary">
										Sign up
                  </Button>
								</CardActions>
							</Card>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default WithAlert(Content)