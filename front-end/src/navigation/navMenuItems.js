import React from "react";
import HotelIcon from '@material-ui/icons/Hotel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import AssessmentIcon from '@material-ui/icons/Assessment';

import clearence from "../constants/clearence";

const menuItems = (userRole) => {
	if (userRole === "STUDENT") {
		return [{
			path: "/dashboard",
			text: "Dashboard",
			clearence: clearence.Zero,
			icon: (<AccountCircleIcon />)
		},
		{
			path: "/internships/mine",
			text: "My Internships",
			clearence: clearence.Zero,
			icon: (<DashboardIcon />)
		},
		{
			path: "/internships",
			text: "Internship List",
			clearence: clearence.Zero,
			icon: (<DashboardIcon />)
		},]
	} else if (userRole === "RECRUITER") {
		return [
			{
				path: "/dashboard",
				text: "Dashboard",
				clearence: clearence.One,
				icon: (<AccountCircleIcon />)
			},

			{
				path: "/internships/mine",
				text: "My Internships",
				clearence: clearence.One,
				icon: (<DashboardIcon />)
			},
			{
				path: "/internships/create",
				text: "Create Internship",
				clearence: clearence.One,
				icon: (<DashboardIcon />)
			},
			{
				path: "/internships",
				text: "Internship List",
				clearence: clearence.One,
				icon: (<DashboardIcon />)
			},
		]
	} else return [{
		path: "/dashboard",
		text: "Dashboard",
		clearence: clearence.Zero,
		icon: (<AccountCircleIcon />)
	},
	{
		path: "/internships/mine",
		text: "My Internships",
		clearence: clearence.Zero,
		icon: (<DashboardIcon />)
	},
	{
		path: "/internships",
		text: "Internship List",
		clearence: clearence.Zero,
		icon: (<DashboardIcon />)
	},
	{
		path: "/internships/create",
		text: "Create Internship",
		clearence: clearence.One,
		icon: (<DashboardIcon />)
	},
	]
}

export default menuItems;