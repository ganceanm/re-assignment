import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { IconButton, ListItemText, Typography, CircularProgress, Card, CardContent, CardActions, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import VisibilityIcon from '@material-ui/icons/Visibility';


import { useHistory, useLocation } from 'react-router-dom';
import { APP_BAR_HEIGHT } from '../../../constants/theme';

const useStyles = makeStyles(theme => ({
    content: {
        marginTop: APP_BAR_HEIGHT,
        marginBottom: 60,
        width: "100%",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },

    contentCentered: {
        display: "flex",
        marginTop: APP_BAR_HEIGHT,
        width: "100%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
    },

    card: {
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: theme.breakpoints.values.lg,
    },

    tableHead: {
        fontWeight: "bold",
        fontSize: 16
    },

    list: {
        width: "100%",
        padding: 0
    },

    cardActions: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "flex-end"
    },

    noResultText: {
        fontSize: 20,
        display: "flex",
        textAlignHorizontal: "center",
        textAlign: "center",
        opacity: 0.4
    },

    viewButton: {
        color: theme.palette.primary.light
    },

}))

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Content(props) {

    const classes = useStyles();
    const history = useHistory();

    const { page, pageCount, total, values } = useSelector(state => state.users.list)

    const { isLoading } = props;

    const query = useQuery();
    const limit = query.get("limit") ? query.get("limit") : 15;

    const changePage = (num) => {
        history.push({
            pathname: `/users`,
            search: `?page=${num}&limit=${query.get("limit") ? query.get("limit") : 15}&keyword=${query.get("keyword") ? query.get("keyword") : ""}`
        })
    }

    return (
        <div className={values && values.length > 0 ? classes.content : classes.contentCentered}>
            {values && values.length > 0 ?
                <Card className={classes.card}>
                    <CardContent>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHead}>Név</TableCell>
                                    <TableCell className={classes.tableHead}>Szobaszám</TableCell>
                                    <TableCell className={classes.tableHead}>Szak</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {values.map((item) => {
                                    return (
                                        <TableRow size="small" key={item.userId}>
                                            <TableCell>
                                                <ListItemText primary={item.lastName + " " + item.firstName} />
                                            </TableCell>
                                            <TableCell>
                                                <ListItemText
                                                    secondary={item.roomNumber ? item.roomNumber : "Nem bentlakó"} />
                                            </TableCell>
                                            <TableCell>
                                                <ListItemText
                                                    secondary={item.studentClass ? item.studentClass + " " + item.studentYear : "Nem hallgató"} />
                                            </TableCell>
                                            <TableCell align="right">
                                                {item.status === "Active" ?
                                                    <IconButton onClick={() => history.push(`/users/${item.userId}`)}
                                                        size="small"
                                                        className={classes.viewButton}
                                                    >
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                    :
                                                    <ListItemText
                                                        secondary={"A felhasználó nem aktív"} />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardActions>
                        <div className={classes.cardActions}>
                            <Typography color="textSecondary">
                                {page * limit + 1}-{page * limit + values.length} / {total} felhasználó
                                </Typography>

                            <IconButton onClick={() => changePage(page - 1)}
                                size="small"
                                disabled={page === 0}>
                                <NavigateBeforeIcon />
                            </IconButton>
                            <IconButton onClick={() => changePage(page + 1)}
                                size="small"
                                disabled={page + 1 === pageCount}>
                                <NavigateNextIcon />
                            </IconButton>
                        </div>
                    </CardActions>

                </Card>
                :
                isLoading ?
                    <CircularProgress color={"primary"} />
                    :
                    <Typography className={classes.noResultText}>Nem található a keresési feltételeknek megfelelő felhasználó.</Typography>
            }

        </div >
    )
}

export default Content;
