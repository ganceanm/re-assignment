import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	stickyName: {
		position: "fixed",
		top: "0px",
		left: "0px",
		width: "100%",
		background: "white",
		padding: "30px 20px",
		boxShadow: "0 6px 8px 0 #BDC9D7",
		verticalAlign: "middle",
		zIndex: "1000",
	},
	cardShadow: {
		borderRadius: 5,
		boxShadow: "0 3px 4px 0 #BDC9D7",
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

	const ReadOnlyProfile = () => (
		<div>
			<div className={classes.stickyName}>
				<Typography variant={"h3"}>{props.name}</Typography>
			</div>

			<div style={{ height: "120px" }}></div>

			<SectionCard title={"About Me"} className={classes.spacing}>
				<Typography variant={"body1"} className={classes.preformatted}>
					{props.aboutMe}
				</Typography>
			</SectionCard>

			<SectionCard title={"Contact"} className={classes.spacing}>
				<Typography>Phone: {props.phone}</Typography>
				<Typography>Email: {props.email}</Typography>
				<Typography>Address: {props.address}</Typography>
			</SectionCard>

			<SectionCard title={"Education"} className={classes.spacing}>
				<div className={classes.spacing}>
					<Typography
						variant={"body2"}
						className={classes.preformatted}
					>{`${props.education}`}</Typography>
				</div>
			</SectionCard>

			<SectionCard title={"Experience"} className={classes.spacing}>
				<div className={classes.spacing}>
					<Typography
						variant={"body2"}
						className={classes.preformatted}
					>{`${props.experience}`}</Typography>
				</div>
			</SectionCard>

			<SectionCard title={"Skills"} className={classes.spacing}>
				<div className={classes.spacing}>
					<Typography variant={"body1"}>{props.skills}</Typography>
				</div>
			</SectionCard>

			<SectionCard title={"Hobbies and Interests"} className={classes.spacing}>
				<Typography variant={"body1"}>{props.hobbies}</Typography>
			</SectionCard>
		</div>
	);

	const EditeableProfile = () => (
		<div>
			<div className={classes.stickyName}>
				<TextField
					required
					label="Name"
					style={{ width: "500px" }}
					defaultValue={props.name}
				/>
			</div>

			<div style={{ height: "120px" }}></div>

			<SectionCard title={"About Me"} className={classes.spacing}>
				<TextField
					multiline
					rows={7}
					defaultValue={props.aboutMe}
					variant="outlined"
					fullWidth
				/>
			</SectionCard>

			<SectionCard title={"Contact"} className={classes.spacing}>
				<div className={classes.spacing}>
					<TextField
						label="Phone"
						variant="outlined"
						fullWidth
						defaultValue={props.phone}
					/>
				</div>
				<div className={classes.spacing}>
					<TextField
						label="Email"
						variant="outlined"
						fullWidth
						defaultValue={props.email}
					/>
				</div>
				<div className={classes.spacing}>
					<TextField
						label="Address"
						variant="outlined"
						fullWidth
						defaultValue={props.address}
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
						defaultValue={props.education}
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
						defaultValue={props.experience}
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
					defaultValue={props.skills}
				/>
			</SectionCard>

			<SectionCard title={"Hobbies and Interests"} className={classes.spacing}>
				<TextField
					multiline
					rows={3}
					defaultValue={props.hobbies}
					variant="outlined"
					fullWidth
				/>
			</SectionCard>
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
