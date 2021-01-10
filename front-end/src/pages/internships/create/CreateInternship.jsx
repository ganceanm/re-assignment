import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./components/Header";
import Content from "./components/Content";

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

function CreateInternship(props) {
  const { toggle } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header toggle={toggle} />
      <Content />
    </div>
  );
}

export default CreateInternship;
