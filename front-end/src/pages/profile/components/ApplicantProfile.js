import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, TextField, Button } from "@material-ui/core";
import { Form, Formik } from "formik";

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

/*
props = {
	isReadOnly: true, 

	name: "",
	aboutMe: "",
	phone: "",
	email: "",
	address: "",
	education: "",
	experience: "",
	skills: "",
	hobbies: ""
};

*/
export const ApplicantProfile = (props) => {
	const classes = useStyles();
	const { profile, onUpdate } = props

	const onSubmit = (values) => {
		onUpdate(values)
	}

	const ReadOnlyProfile = () => (
		<div>
			<div className={classes.stickyName}>
				<Typography variant={"h3"}>{profile.name}</Typography>
			</div>

			<div style={{ height: "120px" }}></div>

			<SectionCard title={"About Me"} className={classes.spacing}>
				<Typography variant={"body1"} className={classes.preformatted}>
					{profile.aboutMe}
				</Typography>
			</SectionCard>

			<SectionCard title={"Contact"} className={classes.spacing}>
				<Typography>Phone: {profile.phoneNumber}</Typography>
				<Typography>Email: {profile.email}</Typography>
				<Typography>Address: {profile.address}</Typography>
			</SectionCard>

			<SectionCard title={"Education"} className={classes.spacing}>
				<div className={classes.spacing}>
					<Typography
						variant={"body2"}
						className={classes.preformatted}
					>{`${profile.education}`}</Typography>
				</div>
			</SectionCard>

			<SectionCard title={"Experience"} className={classes.spacing}>
				<div className={classes.spacing}>
					<Typography
						variant={"body2"}
						className={classes.preformatted}
					>{`${profile.experience}`}</Typography>
				</div>
			</SectionCard>

			<SectionCard title={"Skills"} className={classes.spacing}>
				<div className={classes.spacing}>
					<Typography variant={"body1"}>{profile.skills}</Typography>
				</div>
			</SectionCard>

			<SectionCard title={"Hobbies and Interests"} className={classes.spacing}>
				<Typography variant={"body1"}>{profile.hobbiesAndInterests}</Typography>
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
									label="Name"
									style={{ width: "500px" }}
									value={values.name}
									id="name"
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</div>

							<SectionCard title={"About Me"} className={classes.spacing}>
								<TextField
									multiline
									rows={7}
									variant="outlined"
									fullWidth
									value={values.aboutMe}
									id="aboutMe"
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</SectionCard>

							<SectionCard title={"Contact"} className={classes.spacing}>
								<div className={classes.spacing}>
									<TextField
										label="Phone"
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
										label="Address"
										variant="outlined"
										fullWidth
										value={values.address}
										id="address"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
							</SectionCard>

							<SectionCard title={"Education"} className={classes.spacing}>
								<div style={{ marginBottom: "10px" }}>
									<TextField
										variant={"outlined"}
										className={classes.spacing}
										fullWidth
										multiline
										rows={10}
										value={values.education}
										id="education"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
							</SectionCard>

							<SectionCard title={"Experience"} className={classes.spacing}>
								<div style={{ marginBottom: "10px" }}>
									<TextField
										variant={"outlined"}
										className={classes.spacing}
										fullWidth
										multiline
										rows={10}
										value={values.experience}
										id="experience"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
							</SectionCard>

							<SectionCard title={"Skills"} className={classes.spacing}>
								<TextField
									variant={"outlined"}
									className={classes.spacing}
									fullWidth
									multiline
									rows={7}
									value={values.skills}
									id="skills"
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</SectionCard>

							<SectionCard title={"Hobbies and Interests"} className={classes.spacing}>
								<TextField
									multiline
									rows={3}
									variant="outlined"
									fullWidth
									value={values.hobbiesAndInterests}
									id="hobbiesAndInterests"
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
