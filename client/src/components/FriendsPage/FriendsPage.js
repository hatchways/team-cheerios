import axios from "axios";
import React from "react";

import { withStyles } from "@material-ui/core/styles";
import MuiPaper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { theme } from "../../themes/theme";
import UserSkeleton from "../Skeletons/UserSkeleton";
import TabPanel from "./TabPanel";
import TabPanelContent from "./TabPanelContent";

const categories = ["suggestions", "followers", "followings"];
const userId = "5faf39b3c8460de1ebdf3e42";

const Paper = withStyles({
  root: {
    width: "100%",
    maxWidth: 500,
    height: "100%",
  },
})(MuiPaper);

export default function FriendsPage() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [keywords, setKeywords] = React.useState(
    new Array(categories.length).fill("")
  );
  const [loading, setLoading] = React.useState(true);
  const [fetchedFriends, setFetchedFriends] = React.useState([]);

  React.useEffect(() => {
    let url = `/friends/${userId}`;

    if (keywords[0] !== "") url += `/?search=${keywords[0]}`;

    try {
      axios
        .get(url)
        .then((res) => res.data?.suggestions)
        .then((list) => {
          setFetchedFriends(list);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [keywords]);

  const handleChange = (newTab) => {
    setLoading(true);
    let query = "";

    switch (newTab) {
      case 1:
        if (keywords[1] !== "") query = `?search=${keywords[1]}`;

        try {
          axios
            .get(`/friends/followers/${userId}/${query}`)
            .then((res) => res.data?.followers)
            .then((list) => {
              setFetchedFriends(list);
              setLoading(false);
            });
        } catch (error) {
          console.error(error);
        }
        break;
      case 2:
        if (keywords[2] !== "") query = `?search=${keywords[2]}`;

        try {
          axios
            .get(`/friends/followings/${userId}/${query}`)
            .then((res) => res.data?.followings)
            .then((list) => {
              setFetchedFriends(list);
              setLoading(false);
            });
        } catch (error) {
          console.error(error);
        }
        break;
      default:
        if (keywords[0] !== "") query = `?search=${keywords[0]}`;

        try {
          axios
            .get(`/friends/${userId}/${query}`)
            .then((res) => res.data?.suggestions)
            .then((list) => {
              setFetchedFriends(list);
              setLoading(false);
            });
        } catch (error) {
          console.error(error);
        }
        break;
    }
    setSelectedTab(newTab);
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
            <>
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
            </>
          ) : (
            <TabPanelContent
              friends={fetchedFriends}
              index={i}
              keywords={keywords}
              setKeywords={setKeywords}
            />
          )}
        </TabPanel>
      ))}
    </Paper>
  );
}
