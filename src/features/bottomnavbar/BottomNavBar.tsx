import ChatIcon from "@mui/icons-material/ChatRounded";
import CottageIcon from "@mui/icons-material/CottageRounded";
import DashboardIcon from "@mui/icons-material/DashboardRounded";
import DnsIcon from "@mui/icons-material/DnsRounded";
import PeopleIcon from "@mui/icons-material/PeopleRounded";
import RssFeedIcon from "@mui/icons-material/RssFeedRounded";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import * as React from "react";
import { useHistory } from "react-router-dom";

function BottomNavBar() {
  let history = useHistory();
  let initialHistoryVal = -1;
  if (history.location.pathname === "/hub") initialHistoryVal = 0;
  if (history.location.pathname === "/servers") initialHistoryVal = 1;
  const [value, setValue] = React.useState(initialHistoryVal);

  return (
    <Box sx={{ width: "auto" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          switch (newValue) {
            case 0:
              history.push("/hub");
              break;
            case 1:
              history.push("/servers");
          }
        }}
      >
        <BottomNavigationAction label="Hub" icon={<CottageIcon />} />
        <BottomNavigationAction label="Servers" icon={<DnsIcon />} />
        <BottomNavigationAction label="Chats" icon={<ChatIcon />} />
        <BottomNavigationAction label="Friends" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Activity" icon={<DashboardIcon />} />
        <BottomNavigationAction label="News" icon={<RssFeedIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNavBar;
