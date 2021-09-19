import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

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
        <BottomNavigationAction label="About me" icon={<PersonIcon />} />
        <BottomNavigationAction label="Projects" icon={<FolderIcon />} />
        <BottomNavigationAction label="Experience" icon={<LightbulbIcon />} />
        <BottomNavigationAction label="Education" icon={<MenuBookIcon />} />
        <BottomNavigationAction label="Skills" icon={<FormatListBulletedIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNavBar;
