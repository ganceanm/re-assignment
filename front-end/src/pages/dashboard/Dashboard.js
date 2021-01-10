import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { APP_BAR_HEIGHT } from '../../constants/theme';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	appBar: {
		height: APP_BAR_HEIGHT,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	content: {
		marginTop: APP_BAR_HEIGHT,
		width: "100%",
		height: "100%",
		padding: theme.spacing(8),
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center"
	},
}))

function Dashboard(props) {
	const { toggle } = props;

	const classes = useStyles();
	const me = useSelector(state => state.me)

	return (
		<div>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					{toggle}
					<Typography variant="h5">
						Dashboard
                    </Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.content}>
				<Typography variant="h4">
					Hello {me.lastName + " " + me.firstName}!
				</Typography>
			</div>
		</div>
	)
}



export default Dashboard
