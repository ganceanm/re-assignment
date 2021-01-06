import React from "react";
import { makeStyles, Card, CardContent, TextField, CardActions, Button, CardHeader, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { validation } from "./validation";
import WithAlert from "../../../../components/functional/withAlert";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { APP_BAR_HEIGHT } from "../../../../constants/theme";
import { useSelector } from "react-redux";
import { putUser, deleteUser } from "../../../../store/users/user/actions";
import Confirm from "../../../../components/Confirm";

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
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2)
	},

	deleteButton: {
		color: "red"
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

	const user = useSelector(state => state.users.element)

	const onSubmit = async (values) => {
		const data = {
			id: user.id,
			firstName: values.firstName,
			lastName: values.lastName,
			userName: values.email,
			phoneNumber: values.phone,
		}


		const result = await putUser(data)

		if (result) {
			showAlert("general.saveSuccess")
			setTimeout(() => history.goBack(), 3000)
		} else {
			showAlert("users.notuniqueemail")
		}

	}

	const _deleteUser = async () => {
		const result = await deleteUser(user.id)

		if (result) {
			showAlert("general.saveSuccess")
			setTimeout(() => history.goBack(), 3000)
		} else {
			showAlert("general.default")
		}
	}

	return (
		<div className={classes.content}>
			{user.firstName ?
				<Formik
					initialValues={{
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.userName,
						phone: user.phoneNumber,
					}}
					onSubmit={(values, { setSubmitting }) => onSubmit(values)}
					validationSchema={validation}
				>
					{formikProps => {
						const { values, handleChange, handleBlur, handleSubmit, errors } = formikProps;
						console.log(values)
						return (
							<Form onSubmit={handleSubmit}>
								<Card className={classes.card}>
									<CardHeader title={"Felhasználó szerkesztése"} />
									<CardContent>
										<div className={classes.selectorWrapper}>
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
										<Confirm confirm={_deleteUser}
											icon
											content={(<DeleteOutlineIcon className={classes.deleteButton} />)}
										/>
										<Button type="submit" variant="contained" color="primary">
											Save
                    </Button>
									</CardActions>
								</Card>
							</Form>
						)
					}}
				</Formik>
				:
				<CircularProgress color={"primary"} />}
		</div>
	)
}

export default WithAlert(Content)