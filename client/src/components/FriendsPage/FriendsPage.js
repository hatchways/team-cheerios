import axios from "axios";
import React from "react";

import { withStyles } from "@material-ui/core/styles";
import MuiPaper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { theme } from "../../themes/theme";
import FriendsListSkeleton from "../Skeletons/FriendsListSkeleton";
import TabPanel from "./TabPanel";
import TabPanelContent from "./TabPanelContent";

const categories = ["suggestions", "followers", "followings"];
const apis = ["/friends", "/friends/followers", "/friends/followings"];

const Paper = withStyles({
  root: {
    width: "100%",
    maxWidth: 500,
    height: "100%",
  },
})(MuiPaper);

export default function FriendsPage() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [fetchedFriends, setFetchedFriends] = React.useState([]);
  const [keywords, setKeywords] = React.useState(
    new Array(categories.length).fill("")
  );

  const fetchData = React.useCallback(
    (index) => {
      let url = apis[index];
      if (keywords[index] !== "") {
        url += `/?search=${keywords[index]}`;
      }

      axios
        .get(url)
        .then((res) => res.data?.friends)
        .then((list) => {
          setFetchedFriends(list);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    },
    [keywords]
  );

  React.useEffect(() => {
    fetchData(selectedTab);
  }, [fetchData, selectedTab]);

  const handleChange = (newTab) => {
    setLoading(true);
    setSelectedTab(newTab);
  };

  const handleClick = (id, type) => {
    switch (type) {
      case "follow":
        axios
          .post(`friends/follow/${id}`)
          .then(() => fetchData(selectedTab))
          .catch((error) => console.error(error));
        break;
      case "unfollow":
      case "ignore":
      case "cancel":
        axios
          .post(`friends/unfollow/${id}`)
          .then(() => fetchData(selectedTab))
          .catch((error) => console.error(error));
        break;
      case "accept":
        axios
          .post(`friends/accept/${id}`)
          .then(() => fetchData(selectedTab))
          .catch((error) => console.error(error));
        break;
      default:
        return null;
    }
    fetchData(selectedTab);
  };

  return (
    <Paper>
      <Tabs
        value={selectedTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={(_, newTab) => handleChange(newTab)}
        aria-label="friends tabs"
        centered
      >
        {categories.map((category, i) => (
          <Tab
            label={category}
            id={`tab-${i}`}
            aria-controls={`tabpanel-${i}`}
            key={`tab-${i}`}
          />
        ))}
      </Tabs>

      {categories.map((_, i) => (
        <TabPanel
          index={i}
          value={selectedTab}
          dir={theme.direction}
          key={`panel-${i}`}
        >
          {loading ? (
            <FriendsListSkeleton />
          ) : (
            <TabPanelContent
              friends={fetchedFriends}
              index={i}
              keywords={keywords}
              setKeywords={setKeywords}
              handleClick={handleClick}
            />
          )}
        </TabPanel>
      ))}
    </Paper>
  );
}
