import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import WithAlert from "../../components/functional/withAlert";
import { APP_BAR_HEIGHT } from "../../constants/theme";
import { fetchMe, updateProfile } from "../../store/me/actions";
import Header from "./components/Header";
import { RecruiterProfile } from "./components/RecruiterProfile";
import { ApplicantProfile } from "./components/ApplicantProfile";
import { getUser } from "../../store/users/user/actions";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    overflowX: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  content: {
    marginTop: APP_BAR_HEIGHT,
    marginBottom: 60,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function Profile(props) {
  const item = useSelector((state) => state.users.element);
  const classes = useStyles();
  const id = useParams().id;

  useEffect(() => {
    getUser(id);
  }, [id]);

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        {item && item.userRole === "RECRUITER" && (
          <RecruiterProfile isReadOnly={true} profile={item.profile} />
        )}
        {item && item.userRole === "STUDENT" && (
          <ApplicantProfile isReadOnly={true} profile={item.profile} />
        )}
      </div>
    </div>
  );
}

export default Profile;
