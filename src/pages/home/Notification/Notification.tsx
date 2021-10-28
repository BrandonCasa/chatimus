import { Avatar, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";

interface NotificationProps {}

function Notification(props: NotificationProps) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>N</Avatar>
      </ListItemAvatar>
      <ListItemText primary="Notification" />
    </ListItem>
  );
}

export default Notification;
