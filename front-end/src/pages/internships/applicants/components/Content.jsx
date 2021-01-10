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
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import qs from "qs";
import { transformQuery } from "../../../../lib/helpers/queryTransformer";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { APP_BAR_HEIGHT } from "../../../../constants/theme";
import moment from "moment";
import {
  getApplicants,
  promoteApplication,
  rejectApplication,
} from "../../../../store/applicants/actions";
import WithAlert from "../../../../components/functional/withAlert";

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

function Content(props) {
  const { showAlert } = props;
  const classes = useStyles();
  const history = useHistory();

  const { page, pageCount, total, values } = useSelector(
    (state) => state.applicants.list
  );

  const { isLoading } = props;
  const internshipId = useParams().id;
  const queries = qs.parse(history.location.search, {
    ignoreQueryPrefix: true,
  });

  const limit = queries.limit ? queries.limit : 15;

  const changePage = (num) => {
    history.push({
      pathname: `/internships/applicants/${internshipId}`,
      search: transformQuery({ ...queries, page: num }),
    });
  };

  const _promoteStage = async (id) => {
    const result = await promoteApplication(id);

    if (result) {
      showAlert("general.saveSuccess");
      getApplicants(internshipId, { page: 0, limit: 15 });
    } else {
      showAlert("general.default");
    }
  };

  const _reject = async (id) => {
    const result = await rejectApplication(id);

    if (result) {
      showAlert("general.saveSuccess");
      getApplicants(internshipId, { page: 0, limit: 15 });
    } else {
      showAlert("general.default");
    }
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
                  <TableCell className={classes.tableHead}>
                    Name of applicant
                  </TableCell>

                  <TableCell className={classes.tableHead}>
                    Created At
                  </TableCell>

                  <TableCell className={classes.tableHead}>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map((item) => {
                  return (
                    <TableRow
                      size="small"
                      key={item.id}
                      hover
                      onClick={() => history.push(`/users/${item.applicantId}`)}
                    >
                      <TableCell>
                        <ListItemText primary={item.applicantName} />
                      </TableCell>

                      <TableCell>
                        <ListItemText
                          secondary={moment(item.createdAt).format(
                            "DD/MM/YYYY"
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <ListItemText secondary={item.status} />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={(evt) => {
                            evt.stopPropagation();
                            _reject(item.id);
                          }}
                          size="small"
                          className={classes.viewButton}
                        >
                          <ThumbDownIcon />
                        </IconButton>

                        <IconButton
                          onClick={(evt) => {
                            evt.stopPropagation();
                            _promoteStage(item.id);
                          }}
                          size="small"
                          className={classes.viewButton}
                        >
                          <ThumbUpIcon />
                        </IconButton>
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
}

export default WithAlert(Content);
