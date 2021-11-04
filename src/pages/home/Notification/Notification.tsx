import { DeleteRounded, WatchLaterRounded } from "@mui/icons-material";
import { Avatar, Badge, Button, ButtonGroup, Checkbox, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";
import "./Notification.scss";

function DeleteCheckbox() {
  return <Checkbox sx={{ padding: 0 }} />;
}
// Chunk text into pieces based on color, hyperlink, etc.
const messageStructure = [
  {
    senderUserID: "",
    senderChatID: "",
    senderChatChannelID: "",
    senderTime: "",
    messageContent: {
      media: [],
      text: [
        {
          textPosition: 0,
          isHyperlink: false,
          url: "",
          urlText: "",
          color: "",
        },
      ],
      code: [
        {
          textPosition: 0,
          language: "",
        },
      ],
    },
    messageNotifType: "",
    keywords: [],
  },
];

interface NotificationProps {}

function Notification(props: NotificationProps) {
  return (
    <ListItem
      secondaryAction={
        <ButtonGroup variant="outlined" color="secondary">
          <Button>
            <Checkbox sx={{ padding: 0, pointerEvents: "none" }} />
          </Button>
          <Button>
            <Checkbox sx={{ padding: 0, pointerEvents: "none" }} />
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
