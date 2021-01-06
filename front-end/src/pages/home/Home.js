import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Paper, Box, Button } from '@material-ui/core';
import { APP_BAR_HEIGHT } from '../../constants/theme';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	appBar: {
		height: APP_BAR_HEIGHT,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	content: {
		width: "70%",
		marginLeft: "auto",
		marginRight: "auto",
		padding: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "center"
	},
	btnBox: {
		width: "90%",
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: 40,
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between"
	}
}))

function Home(props) {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Paper className={classes.content}>
			<Typography variant="h4">
				Welcome!
				</Typography>
			<Typography variant="h6">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas, quam et pellentesque volutpat, risus magna rhoncus lectus, ut efficitur leo turpis ut nulla. Nunc quis lobortis dolor. Proin feugiat ipsum nec volutpat vehicula. Curabitur sodales sed eros sit amet ultrices. Curabitur blandit id leo et aliquam. In ullamcorper egestas purus, commodo convallis tortor. Proin non dignissim libero. Etiam ultricies velit urna, eu aliquam eros sollicitudin id. Maecenas hendrerit mi aliquam, rutrum felis sed, laoreet nisi. In pharetra euismod dui, non ullamcorper arcu laoreet ac. Proin non lorem vel quam dignissim sagittis non nec leo. Donec rutrum nisi vitae risus mattis porta. Duis maximus, augue eu ultricies dictum, lacus sem aliquam elit, rutrum pharetra justo orci id eros. Cras ut mi dui.
			</Typography>
			<Box className={classes.btnBox}>
				<Button variant="contained" color="primary"
					onClick={() => history.push('/login')}>
					Sign in
        </Button>
				<Button variant="contained" color="primary"
					onClick={() => history.push('/reg-stud')}>
					Sign up (student)
        </Button>
				<Button variant="contained" color="primary"
					onClick={() => history.push('/reg-rec')}>
					Sign up (recruiter)
        </Button>
			</Box>
		</Paper>
	)
}



export default Home
