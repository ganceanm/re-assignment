import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";

import { useHistory, useLocation } from "react-router-dom";
import { APP_BAR_HEIGHT } from "../../../../constants/theme";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: APP_BAR_HEIGHT,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconButton: {
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(3),
    },
  },
}));

function Header(props) {
  const { toggle } = props;

  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {toggle}
        <Typography variant="h5">My internships</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
