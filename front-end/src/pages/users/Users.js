import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useLocation } from 'react-router-dom';
import { getUsers, clearUserList } from '../../store/users/actions';
import Header from './components/Header';
import Content from './components/Content';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
}))

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Users(props) {

    const { toggle } = props;

    const classes = useStyles();
    let query = useQuery();

    const page = query.get("page")
    const limit = query.get("limit")
    const keyword = query.get("keyword")

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function getData() {
            await getUsers({
                page: page ? page : 0,
                limit: limit ? limit : 15,
                keyword: keyword ? keyword : "",
            });

            setLoading(false)
        }

        setLoading(true)
        getData();
        return function cleanup() {
            clearUserList()
        };
    }, [page, limit, keyword])

    return (
        <div className={classes.root}>
            <Header toggle={toggle} />
            <Content isLoading={isLoading} />
        </div >
    )
}

export default Users;
