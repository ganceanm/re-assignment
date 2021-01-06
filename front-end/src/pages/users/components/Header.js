import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import SearchInput from '../../../components/SearchInput';
import AddIcon from '@material-ui/icons/Add';

import { useHistory, useLocation } from 'react-router-dom';
import { APP_BAR_HEIGHT } from '../../../constants/theme';

const useStyles = makeStyles(theme => ({
    appBar: {
        height: APP_BAR_HEIGHT,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    iconButton: {
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(1)
        },
        [theme.breakpoints.up('sm')]: {
            marginRight: theme.spacing(3)
        },

    },
}))

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Header(props) {

    const { toggle } = props;

    const classes = useStyles();
    const history = useHistory();

    const query = useQuery();

    const handleSubmit = (keyword) => {

        if (keyword === "") {
            history.push({
                pathname: `/users`
            })
        } else {
            history.push({
                pathname: `/users`,
                search: `?page=${0}&limit=${query.get("limit") ? query.get("limit") : 15}&keyword=${keyword}`
            })
        }

    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                {toggle}
                <Typography variant="h5">
                    Felhasználók
                    </Typography>
            </Toolbar>
            <Toolbar>
                <IconButton type="button" className={classes.iconButton}
                    onClick={() => history.push(`users/create`)}>
                    <AddIcon />
                </IconButton>
                <SearchInput onSubmit={handleSubmit} />
            </Toolbar>
        </AppBar>

    )
}

export default Header;
