import React from "react";
import HotelIcon from '@material-ui/icons/Hotel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import AssessmentIcon from '@material-ui/icons/Assessment';

import clearence from "../constants/clearence";

const menuItems = [
	{
		path: "/dashboard",
		text: "Kezdőlap",
		clearence: clearence.Zero,
		icon: (<DashboardIcon />)
	},
	{
		path: "/users",
		text: "Felhasználók",
		clearence: clearence.Two,
		icon: (<AccountCircleIcon />)
	},
]

export default menuItems;