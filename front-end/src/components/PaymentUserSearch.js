import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { TextField, List, ListItem, ListItemText, Popover } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getUsers } from '../store/users/actions';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
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
        marginLeft: theme.spacing(2),
        color: theme.palette.primary.contrastText
    },

    tooltip: {
        position: "fixed",
        zIndex: 500,
        marginTop: theme.spacing(36)
    },

    list: {
        width: "100%",
        padding: 0,
    },

    listItem: {
        display: "flex",
        justifyContent: "space-between",
        width: theme.breakpoints.values.sm - 200,
    },
    listItemContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    avatar: {
        backgroundColor: theme.palette.secondary.light,
        marginRight: theme.spacing(1)
    },
}));

export default function PaymentUserSearch(props) {
    const { setUser } = props;
    const classes = useStyles();

    const [value, setValue] = useState("");
    const [enabled, setEnabled] = useState(true);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const inputRef = useRef(null);

    const userResult = useSelector(state => state.users.list)

    const submit = async (event) => {
        if (enabled) {
            await getUsers({
                page: 0,
                limit: 5,
                keyword: value ? value : "",
            })
            setOpen(true)
        } else {
            setValue("")
            setEnabled(true)
            setUser(null)
        }
        setAnchorEl(inputRef.current)
    }

    const handleClose = () => {
        setAnchorEl(null);
        setEnabled(true)
        setOpen(false)
        setValue("")
    };

    const handleUserPicked = (user) => {
        setUser(user)
        const studYear = user.studentClass ? user.studentClass + " " + user.studentYear : "nem hallgató";
        setValue(user.firstName + " " + user.lastName + ", " + studYear)
        setEnabled(false)
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <TextField
                ref={inputRef}
                // variant="outlined"
                id="text"
                className={classes.input}
                placeholder="Keresés"
                disabled={!enabled}
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton onClick={submit} className={classes.iconButton}>
                {enabled ? <SearchIcon /> : <CloseIcon />}
            </IconButton>
            <Popover
                id={"popover"}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List>
                    {userResult.values && userResult.values.length > 0 ?
                        userResult.values.map((item) => {
                            return (
                                <ListItem
                                    key={item.userId}
                                    className={classes.listItem}
                                    button
                                    onClick={() => handleUserPicked(item)}>
                                    <div className={classes.listItemContent}>
                                        <ListItemText primary={item.lastName + " " + item.firstName} />
                                        <ListItemText className={classes.classText}
                                            secondary={item.studentClass ? item.studentClass + " " + item.studentYear : "Nem hallgató"} />
                                        <ListItemText className={classes.classText}
                                            secondary={item.roomNumber ? item.roomNumber : "Nem bentlakó"} />
                                    </div>
                                </ListItem>)
                        })
                        :
                        userResult.page === 0 ?
                            <ListItem
                                key={0}
                                className={classes.listItem}>
                                <div className={classes.listItemContent}>
                                    <ListItemText primary={"Nincs találat"} />
                                </div>
                            </ListItem>
                            : null
                    }
                </List>
            </Popover>
        </div>
    );
}