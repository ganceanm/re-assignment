import React, { useEffect, useState } from "react";
import qs from "qs";
import { makeStyles } from "@material-ui/core";
import Header from "./components/Header";
import Content from "./components/Content";
import { useHistory } from "react-router-dom";
import { getMyInternships } from "../../../store/internships/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
}));

export default (props) => {
  const { toggle } = props;
  const history = useHistory();

  const classes = useStyles();
  const queries = qs.parse(history.location.search, {
    ignoreQueryPrefix: true,
  });

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      await getMyInternships({
        page: queries.page ? queries.page : 0,
        limit: queries.limit ? queries.limit : 15,
      });

      setLoading(false);
    }

    setLoading(true);
    getData();
    return function cleanup() {
      // clearUserList();
    };
  }, [queries.page, queries.limit]);

  return (
    <div className={classes.root}>
      <Header toggle={toggle} />
      <Content isLoading={isLoading} />
    </div>
  );
};
