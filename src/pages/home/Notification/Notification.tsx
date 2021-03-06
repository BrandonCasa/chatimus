import { Avatar, Button, Checkbox, ListItem, ListItemAvatar, ListItemText, Typography, Divider } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { Notification as NotificationType } from "../../../app/notifications/notificationsSlice";
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

interface NotificationProps {
  info: NotificationType;
  showAccount: boolean;
  notifType: string;
}

function Notification(props: NotificationProps) {
  const accounts = useAppSelector((state) => state.accounts.data);
  const showAccountName = accounts.accounts.find((account) => account.accInfo.uuid === props.info.owner)?.accInfo.username;
  if (props.notifType === "quick") {
    return (
      <ListItem
        secondaryAction={
          <Button variant="outlined" color="secondary">
            <Checkbox sx={{ padding: 0, pointerEvents: "none" }} />
          </Button>
        }
      >
        <ListItemAvatar>
          <Avatar>N</Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.info.messageContent.text[0].text} secondary={"From: " + props.info.senderInfo.senderUserID + (props.showAccount ? ", To: " + showAccountName : "")} />
      </ListItem>
    );
  } else if (props.notifType === "serverViewQuick") {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ width: 32, height: 32 }}>K</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle1" color="text.primary">
              {"From: " + props.info.senderInfo.senderUserID}
            </Typography>
          }
          secondary={props.info.messageContent.text[0].text}
        />
      </ListItem>
    );
  } else {
    return <div />;
  }
}

export default Notification;
