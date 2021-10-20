import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CottageIcon from "@mui/icons-material/CottageRounded";
import CallSplitIcon from "@mui/icons-material/CallSplitRounded";
import ChatIcon from "@mui/icons-material/ChatRounded";
import PeopleIcon from "@mui/icons-material/PeopleRounded";
import DashboardIcon from "@mui/icons-material/DashboardRounded";
import RssFeedIcon from "@mui/icons-material/RssFeedRounded";

function BottomNavBar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "auto" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Hub" icon={<CottageIcon />} />
        <BottomNavigationAction label="Breakouts" icon={<CallSplitIcon />} />
        <BottomNavigationAction label="Chats" icon={<ChatIcon />} />
        <BottomNavigationAction label="Friends" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Activity" icon={<DashboardIcon />} />
        <BottomNavigationAction label="News" icon={<RssFeedIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNavBar;
