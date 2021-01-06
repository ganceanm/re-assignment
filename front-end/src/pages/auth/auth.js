import React, { useState, useEffect } from "react";
import { Paper, CircularProgress } from "@material-ui/core";
import { loggedIn } from "../../store/auth/actions";
import { Redirect } from "react-router-dom";

export default (props) => {

	const [isLogged, setIsLogged] = useState(null);

	const checkIfTokenExists = async () => {
		const token = localStorage.getItem("userToken");
		if (token === null) {
			setIsLogged(false)
		} else {
			const fetchResult = await loggedIn(token);

			setIsLogged(!!fetchResult)
		}

	}

	useEffect(() => { checkIfTokenExists() }, [])

	return (
		<Paper style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
			{isLogged === null ?
				<CircularProgress color={"primary"} />
				:
				isLogged === true ?
					<Redirect to={"/dashboard"} />
					:
					<Redirect to={"/home"} />}
		</Paper >
	)
}
