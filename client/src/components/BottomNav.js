import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import MessageIcon from "@material-ui/icons/QuestionAnswer";
import OpinionsIcon from "@material-ui/icons/RecentActors";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 0px 30px rgba(230, 235, 248, 0.6)",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  selected: {
    color: "#FF5D5D !important",
  },
}));

export default function BottomNav() {
  const classes = useStyles();
  const history = useHistory();
  const [activePage, setActivePage] = React.useState("");
  const { pathname } = history.location;

  React.useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  const handleChange = (_, value) => {
    setActivePage(value);
    history.push(value);
  };

  return (
    <BottomNavigation
      className={classes.root}
      value={activePage}
      onChange={handleChange}
      showLabels
    >
      <BottomNavigationAction
        label="Dashboard"
        value="/dashboard"
        icon={<DashboardIcon />}
        classes={{
          selected: classes.selected,
        }}
      />
      <BottomNavigationAction
        label="Friends"
        value="/friends"
        icon={<GroupIcon />}
        classes={{
          selected: classes.selected,
        }}
      />
      <BottomNavigationAction
        label="Friends Polls"
        value="/friends-polls"
        icon={<MessageIcon />}
        classes={{
          selected: classes.selected,
        }}
      />
      <BottomNavigationAction
        label="Opinions"
        value="/opinions"
        icon={<OpinionsIcon />}
        classes={{
          selected: classes.selected,
        }}
      />
    </BottomNavigation>
  );
}
