import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useSelector } from 'react-redux';
import DrawerNavigator from './components/navigation/DrawerNavigator';

import moment from 'moment';
import 'moment/locale/hu';
import DrawerToggle from './components/navigation/DrawerToggle';
import NavigationSwitch from './navigation/NavigationSwitch';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        backgroundColor: theme.palette.primary.light,
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
    },
    switch: {

    },
    switchLogged: {
        width: "100%",
        height: "100%",
        paddingLeft: 0,
        backgroundColor: theme.palette.background.default
    },
}));

function App(props) {
    moment.locale('hu')

    const [mobileOpen, setMobileOpen] = useState(false);
    const isLogged = useSelector(state => state.me.userRole);

    const classes = useStyles(mobileOpen);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerToggle = <DrawerToggle handleDrawerToggle={handleDrawerToggle} />

    return (
        <div className={classes.root}>
            <CssBaseline />

            {isLogged &&
                <DrawerNavigator
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                />}

            <div className={isLogged ? classes.switchLogged : classes.switch}>
                <NavigationSwitch drawerToggle={drawerToggle} />
            </div>
        </div >
    )
}

export default App;
