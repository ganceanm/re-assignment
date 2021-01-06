import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header';
import Content from './components/Content';
import { getUser } from '../../../store/users/user/actions';
import { useParams } from 'react-router-dom';
import store from '../../../store/store';
import { USER } from '../../../store/types';


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
}))

function CreateUser(props) {

    const { toggle } = props;

    const classes = useStyles();

    const userId = useParams().id;

    useEffect(() => {
        store.dispatch({
            type: USER.PUT,
        })
        getUser(userId)
    }, [userId])

    return (
        <div className={classes.root}>
            <Header toggle={toggle} />
            <Content />
        </div >
    )
}

export default CreateUser;