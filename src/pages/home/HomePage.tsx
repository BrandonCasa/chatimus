import React from "react";
import { DeleteRounded, FolderRounded } from "@mui/icons-material";
import { Paper, Avatar, Typography, IconButton, List, ListItem, ListItemAvatar, ListItemText, AppBar, Toolbar, Theme, makeStyles, createStyles } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./HomePage.scss";
import AppTheme from "../../AppTheme";

// Make a React component that renders a <Paper> with an <Avatar> and a <Typography>
function Notification() {
  return (
    <Paper>
      <Avatar sx={{ width: 56, height: 56, margin: 1 }}>N</Avatar>
      <Typography>Notification</Typography>
    </Paper>
  );
}

interface HomePageProps {}

function HomePage(props: HomePageProps) {
  return (
    <div className="HomePage">
      <Paper sx={{ overflow: "hidden" }}>
        {/* A toolbar with a title saying "Notifications" and a delete icon button */}
        <AppBar color="secondary" position="static" elevation={0}>
          <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Notifications</Typography>
            <IconButton>
              <DeleteRounded />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* A list of notifications */}
        <List
          sx={{
            maxHeight: 450,
            overflow: "auto",
          }}
        >
          {/* A list item with an avatar and text */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>N</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Notification" />
          </ListItem>
          {/* A list item with an avatar and text */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>N</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Notification" />
          </ListItem>
          {/* A list item with an avatar and text */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>N</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Notification" />
          </ListItem>
          {/* A list item with an avatar and text */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>N</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Notification" />
          </ListItem>
          {/* A list item with an avatar and text */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>N</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Notification" />
          </ListItem>
          {/* A list item with an avatar and text */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>N</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Notification" />
          </ListItem>
          {/* A list item with an avatar and text */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>N</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Notification" />
          </ListItem>
          {/* A list item with an avatar and text */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>N</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Notification" />
          </ListItem>
          {/* A list item with an avatar and text */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>N</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Notification" />
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}

export default HomePage;
