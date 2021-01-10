import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import WithAlert from "../../components/functional/withAlert";
import { APP_BAR_HEIGHT } from "../../constants/theme";
import { fetchMe, updateProfile } from "../../store/me/actions";
import Header from "./components/Header";
import { RecruiterProfile } from "./components/RecruiterProfile";
import { ApplicantProfile } from "./components/ApplicantProfile";

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

function MyProfile(props) {
  const { showAlert } = props;
  const me = useSelector((state) => state.me);
  const classes = useStyles();

  const _update = async (values) => {
    const result = await updateProfile(values);

    if (result) {
      showAlert("general.saveSuccess");
      fetchMe();
    } else {
      showAlert("general.default");
    }
  };

  return (
    <div className={classes.root}>
      <Header me />
      <div className={classes.content}>
        {me.userRole === "RECRUITER" && (
          <RecruiterProfile
            isReadOnly={false}
            profile={me.profile}
            onUpdate={_update}
          />
        )}
        {me.userRole === "STUDENT" && (
          <ApplicantProfile
            isReadOnly={false}
            profile={me.profile}
            onUpdate={_update}
          />
        )}
      </div>
    </div>
  );
}

export default WithAlert(MyProfile);
