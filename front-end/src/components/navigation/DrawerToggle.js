import React from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Hidden, IconButton } from '@material-ui/core';
import { DRAWER_WIDTH } from '../../constants/theme';

const useStyles = makeStyles((theme) => ({
    mobile: {
        // width: "100%",
        // height: "100%",
        marginRight: theme.spacing(1) / 2
    },
    desktop: {
        width: DRAWER_WIDTH
    },
}))

function DrawerToggle(props) {
    const { handleDrawerToggle } = props;

    const classes = useStyles();

    return (
        <div>
            <Hidden smUp implementation="js">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.mobile}
                >
                    <MenuIcon />
                </IconButton>
            </Hidden>
            <Hidden xsDown implementation="js">
                <div className={classes.desktop} />
            </Hidden>
        </div>
    )
}



export default DrawerToggle
