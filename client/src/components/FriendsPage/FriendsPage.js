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
    // TODO: fetch suggestions
    setFetchedFriends(initData);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    // TODO: search user
    console.log({ keywords });
  }, [keywords]);

  const handleChange = (newTab) => {
    setLoading(true);

    switch (newTab) {
      case 1:
        // TODO: fetch followers
        break;
      case 2:
        // TODO: fetch followings
        break;
      default:
        // TODO: fetch suggestions
        break;
    }
    setFetchedFriends(initData);
    setLoading(false);
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

// temp data
const initData = [
  { name: "Emma K", status: "following", friendId: "1" },
  { name: "Mary P", status: "", friendId: "2" },
  { name: "Brandon W", status: "sent", friendId: "3" },
  { name: "Mark J", status: "following", friendId: "4" },
  { name: "Sal K", status: "", friendId: "5" },
  { name: "Sarah K", status: "following", friendId: "6" },
  { name: "Stan L", status: "", friendId: "7" },
  { name: "Brittany P", status: "sent", friendId: "8" },
];
