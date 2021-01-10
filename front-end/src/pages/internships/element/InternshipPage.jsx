import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./components/Header";
import Content from "./components/Content";
import { useParams } from "react-router-dom";
import { getInternship } from "../../../store/internships/internship/actions";
import { INTERNSHIPS } from "../../../store/types";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
}));

function InternshipPage(props) {
  const { toggle } = props;

  const item = useSelector((state) => state.internships.element);
  const classes = useStyles();
  const id = useParams().id;

  useEffect(() => {
    getInternship(id);
  }, [id]);

  return (
    <div className={classes.root}>
      <Header toggle={toggle} />
      {item?.id && <Content />}
    </div>
  );
}

export default InternshipPage;
