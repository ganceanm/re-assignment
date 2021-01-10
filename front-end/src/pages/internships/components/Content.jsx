import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import {
  IconButton,
  ListItemText,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";

import qs from "qs";
import { transformQuery } from "../../../lib/helpers/queryTransformer";
import { useHistory, useLocation } from "react-router-dom";
import { APP_BAR_HEIGHT } from "../../../constants/theme";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
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
    fontSize: 16,
  },

  list: {
    width: "100%",
    padding: 0,
  },

  cardActions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },

  noResultText: {
    fontSize: 20,
    display: "flex",
    textAlignHorizontal: "center",
    textAlign: "center",
    opacity: 0.4,
  },

  viewButton: {
    color: theme.palette.primary.light,
  },
}));

export default (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { page, pageCount, total, values } = useSelector(
    (state) => state.internships.list
  );

  const me = useSelector((state) => state.me);

  const { isLoading } = props;

  const queries = qs.parse(history.location.search, {
    ignoreQueryPrefix: true,
  });

  const limit = queries.limit ? queries.limit : 15;

  const changePage = (num) => {
    history.push({
      pathname: `/internships`,
      search: transformQuery({ ...queries, page: num }),
    });
  };

  return (
    <div
      className={
        values && values.length > 0 ? classes.content : classes.contentCentered
      }
    >
      {values && values.length > 0 ? (
        <Card className={classes.card}>
          <CardContent>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>Title</TableCell>
                  <TableCell className={classes.tableHead}>Company</TableCell>
                  <TableCell className={classes.tableHead}>
                    Created At
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map((item) => {
                  return (
                    <TableRow size="small" key={item.id}>
                      <TableCell>
                        <ListItemText primary={item.title} />
                      </TableCell>
                      <TableCell>
                        <ListItemText secondary={item.createdBy} />
                      </TableCell>
                      <TableCell>
                        <ListItemText
                          secondary={moment(item.createdAt).format(
                            "DD/MM/YYYY"
                          )}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() =>
                            history.push(`/internships/${item.id}`)
                          }
                          size="small"
                          className={classes.viewButton}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        {["RECRUITER", "SYS_ADMIN"].includes(me.userRole) && (
                          <IconButton
                            onClick={() =>
                              history.push(`/internships/edit/${item.id}`)
                            }
                            size="small"
                            className={classes.viewButton}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardActions>
            <div className={classes.cardActions}>
              <Typography color="textSecondary">
                {page * limit + 1}-{page * limit + values.length} / {total}{" "}
                results
              </Typography>

              <IconButton
                onClick={() => changePage(page - 1)}
                size="small"
                disabled={page === 0}
              >
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                onClick={() => changePage(page + 1)}
                size="small"
                disabled={page + 1 === pageCount}
              >
                <NavigateNextIcon />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      ) : isLoading ? (
        <CircularProgress color={"primary"} />
      ) : (
        <Typography className={classes.noResultText}>No results.</Typography>
      )}
    </div>
  );
};
