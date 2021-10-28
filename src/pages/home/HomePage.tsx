import React from "react";
import { DeleteRounded, FolderRounded } from "@mui/icons-material";
import { Stack, Chip, Paper, Avatar, Typography, IconButton, List, ListItem, ListItemAvatar, ListItemText, AppBar, Toolbar, Theme, makeStyles, createStyles } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./HomePage.scss";
import AppTheme from "../../AppTheme";
import Notification from "./Notification/Notification";

interface HomePageProps {}

function HomePage(props: HomePageProps) {
  return (
    <div className="HomePage">
      <Paper sx={{ overflow: "hidden", maxWidth: 600 }}>
        {/* A toolbar with a title saying "Notifications" and a delete icon button */}
        <AppBar color="secondary" position="static" elevation={0}>
          <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Notifications</Typography>
            <Stack direction="row" spacing={1}>
              <Chip label="@Everyone" variant="outlined" />
              <Chip label="@Roles" variant="outlined" />
              <Chip label="@Me" variant="outlined" />
            </Stack>
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
            marginRight: "8px",
          }}
        >
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </List>
      </Paper>
    </div>
  );
}

export default HomePage;
