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
        maxWidth: 400,
        minWidth: 150,
        backgroundColor: "rgba(255, 255, 255, 0.12)"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color: theme.palette.primary.contrastText
    },
    iconButton: {
        padding: 10,
        color: theme.palette.primary.contrastText
    },
    divider: {
        height: 28,
        margin: 4,
        color: theme.palette.primary.contrastText
    },
}));

export default function SearchInput(props) {
    const classes = useStyles();

    const [value, setValue] = useState("");

    return (
        <Paper component="form" onSubmit={() => props.onSubmit(value)} className={classes.root}>
            <InputBase
                id="text"
                className={classes.input}
                placeholder="Keresés"
                onChange={(event) => setValue(event.target.value)}
                value={value}
                onSubmit={() => props.onSubmit(value)}
            />
            {value &&
                <IconButton className={classes.iconButton} onClick={() => {
                    setValue("");
                    props.onSubmit("")
                }}>
                    <CloseIcon />
                </IconButton>}
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton className={classes.iconButton} onClick={() => props.onSubmit(value)} type="submit">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}