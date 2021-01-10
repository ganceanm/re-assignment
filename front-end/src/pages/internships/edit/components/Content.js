import React from "react";
import { makeStyles, Card, CardContent, TextField, CardActions, Button, CardHeader, CircularProgress, FormControlLabel, Switch, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { validation } from "./validation";
import WithAlert from "../../../../components/functional/withAlert";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { APP_BAR_HEIGHT } from "../../../../constants/theme";
import { useSelector } from "react-redux";
import { deleteInternship, postInternship, putInternship } from "../../../../store/internships/internship/actions";
import Confirm from "../../../../components/Confirm";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { CATEGORIES } from '../../../../store/types'

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

	inputField: {
		margin: theme.spacing(1),
		minWidth: 140,
		width: "100%"
	},

	buttonBox: {
		marginTop: theme.spacing(2),
		justifyContent: "flex-end",
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

	const item = useSelector(state => state.internships.element)

	const onSubmit = async (values) => {
		const data = {
			...values,
			duration: Number(values.duration),
			hoursPerDay: Number(values.hoursPerDay),
			id: item.id
		}


		const result = await putInternship(data)

		if (result) {
			showAlert("general.saveSuccess")
			setTimeout(() => history.goBack(), 3000)
		} else {
			showAlert("general.default")
		}

	}

	const _deleteInternship = async () => {
		const result = await deleteInternship(item.id)

		if (result) {
			showAlert("general.saveSuccess")
			setTimeout(() => history.goBack(), 3000)
		} else {
			showAlert("general.default")
		}
	}

	const mapMenuItems = (obj) => {
		const toReturn = [];

		for (let [key, value] of Object.entries(obj)) {
			if (key) {
				toReturn.push(value)
			}
		}

		return toReturn;
	}

	return (
		<div className={classes.content}>
			<Formik
				initialValues={{
					title: item.title,
					description: item.description,
					startingDate: new Date(item.startingDate),
					duration: item.duration,
					paid: item.paid,
					location: item.location,
					hoursPerDay: item.hoursPerDay,
					category: item.category
				}}
				onSubmit={(values, { setSubmitting }) => onSubmit(values)}
				validationSchema={validation}
				validateOnBlur={false}
				validateOnChange={false}
			>
				{formikProps => {
					const { values, handleChange, handleBlur, handleSubmit, errors, setFieldValue } = formikProps;

					return (
						<Form onSubmit={handleSubmit}>
							<Card className={classes.card}>
								<CardHeader title={"Edit internship"} />
								<CardContent>
									<div className={classes.selectorWrapper}>
										<TextField id="title"
											label="Title"
											variant="outlined"
											className={classes.textInput}
											required

											value={values.title}
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errors.title}
											helperText={errors.title}
										/>
										<TextField id="duration"
											label="Duration (in weeks)"
											variant="outlined"
											className={classes.textInput}
											required
											inputMode="numeric"

											value={values.duration}
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errors.duration}
											helperText={errors.duration}
										/>
									</div>

									<div className={classes.selectorWrapper}>
										<TextField id="location"
											label="Location"
											variant="outlined"
											className={classes.textInput}
											required

											value={values.location}
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errors.location}
											helperText={errors.location}
										/>
										<TextField id="hoursPerDay"
											label="Hours per day"
											variant="outlined"
											className={classes.textInput}
											required
											inputMode="numeric"

											value={values.hoursPerDay}
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errors.hoursPerDay}
											helperText={errors.hoursPerDay}
										/>
									</div>
									<div className={classes.selectorWrapper}>
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<KeyboardDatePicker
												className={classes.inputField}
												disableToolbar
												variant="inline"
												format="MM/dd/yyyy"
												margin="normal"
												id="startingDate"
												label="Date picker inline"
												value={values.startingDate}
												onChange={(val) => {
													console.log(val)
													setFieldValue("startingDate", val)
												}}
												KeyboardButtonProps={{
													'aria-label': 'change date',
												}}
											/>
										</MuiPickersUtilsProvider>
										<FormControlLabel
											className={classes.inputField}
											control={
												<Switch
													checked={values.paid}
													onChange={handleChange}
													name="paid"
													color="primary"

												/>
											}
											label="Paid"
										/>
									</div>
									<FormControl className={classes.textInput}>
										<InputLabel id="demo-simple-select-outlined-label">
											Category
                      </InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="month"
											value={values.category}
											onChange={(event) => handleChange({ target: { value: event.target.value, name: "category" } })}
											onBlur={handleBlur}
											disabled={values.type === "General"}
										>
											{mapMenuItems(CATEGORIES).map((item) => {
												return <MenuItem key={item.value} value={item.value}>{item.display}</MenuItem>
											})}
										</Select>
									</FormControl>
									<div className={classes.selectorWrapper}>
										<TextField id="description"
											label="Description of internship"
											variant="outlined"
											className={classes.textInput}
											required
											multiline

											value={values.description}
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errors.description}
											helperText={errors.description}
										/>
									</div>
								</CardContent>
								<CardActions className={classes.buttonBox}>
									<Confirm confirm={_deleteInternship}
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
		</div>
	)
}

export default WithAlert(Content)