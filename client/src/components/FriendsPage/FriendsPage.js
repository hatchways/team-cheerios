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
// TODO: get id from context, remove userIds from apis
const userId = "5faf39b3c8460de1ebdf3e42";
const apis = [
  `/friends/${userId}`,
  `/friends/followers/${userId}`,
  `/friends/followings/${userId}`,
];

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
  const [fetchedFriends, setFetchedFriends] = React.useState(
    new Array(categories.length).fill([])
  );
  const [keywords, setKeywords] = React.useState(
    new Array(categories.length).fill("")
  );

  const fetchData = React.useCallback((index) => {
    let url = apis[index];
    if (keywords[index] && keywords[index] !== "")
      url += `/?search=${keywords[index]}`;

    try {
      axios
        .get(url)
        .then((res) => res.data?.friends)
        .then((list) => {
          let newList = [...fetchedFriends];
          newList[index] = list;

          setFetchedFriends(newList);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  React.useEffect(() => {
    fetchData(0);
  }, [fetchData]);

  const handleChange = (newTab) => {
    setLoading(true);
    fetchData(newTab);
    setSelectedTab(newTab);
  };

  const handleClick = (id, type) => {
    switch (type) {
      case "follow":
        axios
          .post(`friends/follow/${userId}/${id}`)
          .then(() => fetchData(selectedTab));
        break;
      case "unfollow":
      case "ignore":
      case "cancel":
        axios
          .post(`friends/unfollow/${userId}/${id}`)
          .then(() => fetchData(selectedTab));
        break;
      case "accept":
        axios
          .post(`friends/accept/${userId}/${id}`)
          .then(() => fetchData(selectedTab));
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
              friends={fetchedFriends[i]}
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
