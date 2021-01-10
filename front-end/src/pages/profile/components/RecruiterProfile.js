import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { USER } from "../../../store/types";
import { Form, Formik } from "formik";
import { updateProfile } from "../../../store/me/actions";

const useStyles = makeStyles((theme) => ({
	stickyName: {
		// position: "fixed",
		top: "0px",
		left: "0px",
		width: "100%",
		background: "white",
		marginTop: 40,
		padding: "30px 20px",
		boxShadow: "0 6px 8px 0 #BDC9D7",
		verticalAlign: "middle",
		zIndex: "1000",
	},
	cardShadow: {
		borderRadius: 16,
		boxShadow: "0 3px 4px 0 #BDC9D7",
		width: "100%"
	},
	cardTitle: {
		fontSize: "36px",
		lineHeight: "42px",
	},
	spacing: {
		marginTop: "10px",
		marginBottom: "10px",
	},
	preformatted: {
		whiteSpace: "pre-wrap",
	},
}));

export const RecruiterProfile = (props) => {
	const classes = useStyles();

	const { profile, onUpdate } = props

	const onSubmit = (values) => {
		onUpdate(values)
	}

	const ReadOnlyProfile = () => (
		<div style={{ maxWidth: "80%", width: "100%" }}>
			<div className={classes.stickyName}>
				<Typography variant={"h3"}>{profile.companyName}</Typography>
			</div>


			<SectionCard title={"Contact"} className={classes.spacing}>
				<Typography>Recruiter: {profile.recruiterName}</Typography>
				<Typography>Phone: {profile.phoneNumber}</Typography>
				<Typography>Email: {profile.email}</Typography>
				<Typography>Company Address: {profile.address}</Typography>
			</SectionCard>

			<SectionCard
				title={"Company Description"}
				className={[classes.spacing, classes.preformatted]}
			>
				<Typography variant={"body1"}>{profile.companyDescription}</Typography>
			</SectionCard>
		</div>
	);

	const EditeableProfile = () => (
		<div style={{ maxWidth: "80%", width: "100%" }}>
			<Formik
				initialValues={{
					...profile
				}}
				onSubmit={(values, { setSubmitting }) => onSubmit(values)}
				enableReinitialize

			>
				{formikProps => {
					const { values, handleChange, handleBlur, handleSubmit, errors, setFieldValue } = formikProps;

					return (
						<Form onSubmit={handleSubmit}>

							<div className={classes.stickyName}>
								<TextField
									required
									label="Company Name"
									style={{ width: "100%" }}
									value={values.companyName}
									id="companyName"
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</div>


							<SectionCard title={"Contact"} className={classes.spacing}>
								<div className={classes.spacing}>
									<TextField
										label="Recruiter Name"
										variant="outlined"
										fullWidth
										value={values.name}
										id="name"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
								<div className={classes.spacing}>
									<TextField
										label="Phone Number"
										variant="outlined"
										fullWidth
										value={values.phoneNumber}
										id="phoneNumber"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
								<div className={classes.spacing}>
									<TextField
										label="Email"
										variant="outlined"
										fullWidth
										value={values.email}
										id="email"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
								<div className={classes.spacing}>
									<TextField
										label="Company Address"
										variant="outlined"
										fullWidth
										value={values.address}
										id="address"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
							</SectionCard>

							<SectionCard
								title={"Company Description"}
								className={[classes.spacing, classes.preformatted]}
							>
								<TextField
									multiline
									rows={30}
									variant="outlined"
									fullWidth
									value={values.companyDescription}
									id="companyDescription"
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<Button type="submit" variant="contained" color="primary">
									Save
                    </Button>
							</SectionCard>
						</Form>
					)
				}}
			</Formik>
		</div>
	);

	return props.isReadOnly ? <ReadOnlyProfile /> : <EditeableProfile />;
};

const SectionCard = (props) => {
	const classes = useStyles();

	return (
		<Card className={[props.className, classes.cardShadow]}>
			<CardContent>
				<Typography className={classes.cardTitle}>{props.title}</Typography>
				<hr />
				<div>{props.children}</div>
			</CardContent>
		</Card>
	);
};
