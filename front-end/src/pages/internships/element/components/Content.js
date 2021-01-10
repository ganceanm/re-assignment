import React from "react";
import { makeStyles, Card, CardContent, TextField, CardActions, Button, CardHeader, CircularProgress, FormControlLabel, Switch, FormControl, InputLabel, Select, MenuItem, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { APP_BAR_HEIGHT } from "../../../../constants/theme";
import { useSelector } from "react-redux";
import moment from "moment";
import { CATEGORIES } from "../../../../store/types";
import { applyForInternship, withdrawInternshipApplication } from "../../../../store/internships/internship/actions";
import WithAlert from "../../../../components/functional/withAlert";

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
	const { showAlert } = props
	const classes = useStyles();
	let history = useHistory();

	const item = useSelector(state => state.internships.element)
	const role = useSelector(state => state.me.userRole)

	const withdrawAplication = async () => {
		const result = await withdrawInternshipApplication(item.id)

		if (result) {
			showAlert("general.saveSuccess")
			setTimeout(() => history.goBack(), 3000)
		} else {
			showAlert("general.default")
		}
	}

	const submitAplication = async () => {
		const result = await applyForInternship(item.id)

		if (result) {
			showAlert("general.saveSuccess")
			setTimeout(() => history.goBack(), 3000)
		} else {
			showAlert("general.default")
		}
	}

	return (
		<div className={classes.content}>
			<Card className={classes.card}>
				<CardHeader title={item.title} />
				<CardContent>
					<Typography>Category: {CATEGORIES[item.category].display}</Typography>
					<Typography>Starting date: {moment(new Date(item.startingDate)).format('DD/MM/YYYY')}</Typography>
					<Typography>Duration: {item.duration} weeks</Typography>
					<Typography>Is paid internship: {item.paid ? "Yes" : "No"}</Typography>
					<Typography>Location: {item.location}</Typography>
					<Typography>Hours of work per day: {item.hoursPerDay}</Typography>
					<Typography>{item.description}</Typography>
				</CardContent>
				<CardActions className={classes.buttonBox}>
					{role !== "RECRUITER" && (
						item.hasApplied ? <Button onClick={() => withdrawAplication()} variant="contained" color="secondary">
							WITHDRAW APPLICATION
            </Button> :
							<Button onClick={() => submitAplication()} variant="contained" color="primary">
								APPLY
            </Button>)}
				</CardActions>
			</Card>
		</div>
	)
}

export default WithAlert(Content)