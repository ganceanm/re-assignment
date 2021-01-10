import React, { useEffect, useState } from "react";
import { clearUserList, getUsers } from "../../store/users/actions";
import qs from "qs";
import { makeStyles } from "@material-ui/core";
import Header from "./components/Header";
import Content from "./components/Content";
import { useHistory } from "react-router-dom";
import { getInternships } from "../../store/internships/actions";

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
  console.log(queries);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      await getInternships({
        page: queries.page ? queries.page : 0,
        limit: queries.limit ? queries.limit : 15,
        keyword: queries.keyword ? queries.keyword : "",
      });

      setLoading(false);
    }

    setLoading(true);
    getData();
    return function cleanup() {
      // clearUserList();
    };
  }, [queries.page, queries.limit, queries.keyword]);

  return (
    <div className={classes.root}>
      <Header toggle={toggle} />
      <Content isLoading={isLoading} />
    </div>
  );
};
