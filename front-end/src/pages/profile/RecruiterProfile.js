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
		borderRadius: 16,
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

	companyName: "",
	recruiterName: "",
	description: "",
	phone: "",
	email: "",
	address: ""
};

*/
export const RecruiterProfile = (props) => {
	const classes = useStyles();

	const ReadOnlyProfile = () => (
		<div>
			<div className={classes.stickyName}>
				<Typography variant={"h3"}>{props.companyName}</Typography>
			</div>

			<div style={{ height: "120px" }}></div>

			<SectionCard title={"Contact"} className={classes.spacing}>
				<Typography>Recruiter: {props.recruiterName}</Typography>
				<Typography>Phone: {props.phone}</Typography>
				<Typography>Email: {props.email}</Typography>
				<Typography>Company Address: {props.address}</Typography>
			</SectionCard>

			<SectionCard
				title={"Company Description"}
				className={[classes.spacing, classes.preformatted]}
			>
				<Typography variant={"body1"}>{props.description}</Typography>
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
					defaultValue={props.companyName}
				/>
			</div>

			<div style={{ height: "120px" }}></div>

			<SectionCard title={"Contact"} className={classes.spacing}>
				<div className={classes.spacing}>
					<TextField
						label="Recruiter Name"
						variant="outlined"
						fullWidth
						defaultValue={props.recruiterName}
					/>
				</div>
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
						label="Company Address"
						variant="outlined"
						fullWidth
						defaultValue={props.address}
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
					defaultValue={props.description}
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
