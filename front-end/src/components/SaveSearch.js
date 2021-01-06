import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        backgroundColor: "rgba(55, 55, 55, 0.1)"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color: theme.palette.grey
    },
    iconButton: {
        padding: 10,
        color: theme.palette.primary.main
    },
    divider: {
        height: 28,
        margin: 4,
        color: theme.palette.primary.contrastText
    },
}));

export default function SaveSearch(props) {
    const classes = useStyles();

    const [value, setValue] = useState("");

    const submit = () => {
        props.onSubmit(value)
    }

    const close = () => {
        setValue("");
        props.onClose()
    }
    return (
        <Paper className={classes.root}>
            <InputBase
                id="text"
                className={classes.input}
                placeholder="Keresés"
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton onClick={submit} className={classes.iconButton}>
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} onClick={close}>
                <CloseIcon />
            </IconButton>
        </Paper>
    );
}