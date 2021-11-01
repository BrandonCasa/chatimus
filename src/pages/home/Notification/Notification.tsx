import { DeleteRounded, WatchLaterRounded } from "@mui/icons-material";
import { Avatar, Badge, Button, ButtonGroup, Checkbox, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";
import "./Notification.scss";

function DeleteCheckbox() {
  return <Checkbox sx={{ padding: 0 }} />;
}

interface NotificationProps {}

function Notification(props: NotificationProps) {
  return (
    <ListItem
      secondaryAction={
        <ButtonGroup variant="contained" color="secondary">
          <Button>
            <Badge badgeContent={<DeleteRounded color="action" />} className="TheBadge">
              <Checkbox sx={{ padding: 0 }} />
            </Badge>
          </Button>
          <Button>
            <Badge badgeContent={<WatchLaterRounded color="action" />} className="TheBadge">
              <Checkbox sx={{ padding: 0 }} />
            </Badge>
          </Button>
        </ButtonGroup>
      }
    >
      <ListItemAvatar>
        <Avatar>N</Avatar>
      </ListItemAvatar>
      <ListItemText primary="Notification" />
    </ListItem>
  );
}

export default Notification;
