import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Avatar, Typography, IconButton, makeStyles, Hidden } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { userLoggedOut } from '../../store/auth/actions';
import { DRAWER_WIDTH } from '../../constants/theme';
import menuItems from "../../navigation/navMenuItems";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },

    drawerPaper: {
        width: DRAWER_WIDTH,
    },
    drawerPaperMobile: {
        justifyContent: "space-between",
        width: DRAWER_WIDTH,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    activeLink: {
        fontWeight: "bold",
        color: "blue"
    },
    profile: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: theme.spacing(1)
    },
    profileMobile: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        padding: theme.spacing(1)
    },
    avatar: {
        width: 70,
        height: 70,
        fontSize: 27,
        backgroundColor: theme.palette.primary.light,
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2)
    },
    avatarMobile: {
        width: 32,
        height: 32,
        fontSize: 16,
        backgroundColor: theme.palette.primary.light,
        marginRight: theme.spacing(1),
    },
    logoutIconButton: {
        top: 10,
        right: 10,
        zIndex: 100,
        position: "absolute"
    },
}))

function DrawerNavigator(props) {
    const me = useSelector(state => state.me);
    const classes = useStyles();

    const logOut = () => {
        localStorage.clear();
        userLoggedOut();
    }

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="js">
                <Drawer
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaperMobile,
                    }}
                    variant="temporary"
                    anchor="left"
                    {...props}
                >
                    <List>
                        {menuItems.map((item) => {
                            return item.clearence.includes(me.userRole) ?
                                <ListItem
                                    button
                                    key={item.path}
                                    activeClassName="Mui-selected"
                                    component={NavLink}
                                    to={item.path}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                                : null;
                        })}

                        <ListItem
                            button
                            key={"logout"}
                            activeClassName="Mui-selected"
                            onClick={() => logOut()}
                        >
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary={"Kijelentkezés"} />
                        </ListItem>
                        <Divider />
                    </List>

                    <div>
                        <Divider />
                        <div className={classes.profileMobile} >

                            <Avatar className={classes.avatarMobile}>{me.lastName[0] + me.firstName[0]}</Avatar>
                            <div>
                                <Typography style={{ fontWeight: "bold" }}>
                                    {me.lastName + " " + me.firstName}
                                </Typography>
                                <Typography style={{ fontSize: 12, fontStyle: "italic" }}>
                                    {me.userRole}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="js">
                <Drawer
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                    variant="permanent"
                    open
                >
                    <div className={classes.profile} >
                        <IconButton onClick={() => logOut()}
                            className={classes.logoutIconButton}>
                            <ExitToAppIcon />
                        </IconButton>
                        <Avatar className={classes.avatar}>{me.lastName[0] + me.firstName[0]}</Avatar>
                        <Typography style={{ fontWeight: "bold" }}>
                            {me.lastName + " " + me.firstName}
                        </Typography>
                        <Typography style={{ fontSize: 12, fontStyle: "italic" }}>
                            {me.userRole}
                        </Typography>
                    </div>

                    <Divider />
                    <List>
                        {menuItems.map((item) => {
                            return item.clearence.includes(me.userRole) ?
                                <ListItem
                                    button
                                    key={item.path}
                                    activeClassName="Mui-selected"
                                    component={NavLink}
                                    to={item.path}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                                : null;
                        })}
                    </List>
                    <Divider />
                </Drawer>
            </Hidden>
        </nav>
    )
}

export default DrawerNavigator;

