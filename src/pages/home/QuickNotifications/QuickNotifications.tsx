import { DeleteRounded } from "@mui/icons-material";
import { AppBar, Avatar, Button, Checkbox, Chip, Divider, FormControlLabel, FormGroup, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addNotification, Notification as NotificationType } from "../../../app/notifications/notificationsSlice";
import Notification from "../Notification/Notification";
import "./QuickNotifications.scss";

interface QuickNotificationsProps {}

function QuickNotifications(props: QuickNotificationsProps) {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector((state) => state.notifications.data.notifications);
  const currentAccount = useAppSelector((state) => state.accounts.data.currAccount);
  const accountsList = useAppSelector((state) => state.accounts.data.accounts);
  const [showAllBool, setShowAllBool] = useState(false);

  function addNotificationTEST() {
    if (currentAccount !== -1) {
      const notif = {
        senderInfo: {
          senderUserID: "1",
          senderChatID: "-1",
          senderChatChannelID: "-1",
          senderTime: "1636388607",
        },
        messageContent: {
          media: [],
          text: [
            {
              textPosition: 0,
              text: "Hello there!",
              isHyperlink: false,
              hyperlinkUrl: "",
              hyperlinkText: "",
              hyperlinkColorCode: "",
            },
          ],
          codeBlocks: [],
        },
        owner: accountsList[currentAccount].accInfo.uuid,
      };
      dispatch(addNotification(notif));
    }
  }

  function showAllToggle(event: any) {
    setShowAllBool(event.target.checked);
  }

  return (
    <Paper sx={{ overflow: "hidden", maxWidth: 800 }}>
      {/* A toolbar with a title saying "Notifications" and a delete icon button */}
      <AppBar color="secondary" position="static" elevation={0}>
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Notifications</Typography>
          <Stack direction="row" spacing={1}>
            <Chip label="@Everyone" variant="outlined" />
            <Chip label="@Roles" variant="outlined" />
            <Chip label="@Me" variant="outlined" />
          </Stack>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={showAllToggle}></Checkbox>} label="Show All" />
          </FormGroup>
          <Button variant="contained" style={{ marginRight: 12 }} onClick={addNotificationTEST}>
            <DeleteRounded color="action" />
          </Button>
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
        {notifications.map((notif: NotificationType, index: number) => {
          if (showAllBool || (currentAccount !== -1 && notif.owner === accountsList[currentAccount].accInfo.uuid)) {
            return <Notification key={index} info={notif} showAccount={showAllBool} notifType={"quick"} />;
          } else {
            return <div key={index} />;
          }
        })}
        {showAllBool ? (
          notifications.length === 0 ? (
            <Typography variant="subtitle1" sx={{ paddingLeft: "24px" }}>
              No New Notifications for Any Account
            </Typography>
          ) : null
        ) : notifications.length === 0 ? (
          <Typography variant="subtitle1" sx={{ paddingLeft: "24px" }}>
            No New Notifications for Any Account
          </Typography>
        ) : currentAccount !== -1 && notifications.filter((e) => e.owner === accountsList[currentAccount].accInfo.uuid).length === 0 ? (
          <Typography variant="subtitle1" sx={{ paddingLeft: "24px" }}>
            No New Notifications for Current Account
          </Typography>
        ) : null}
      </List>
    </Paper>
  );
}

export default QuickNotifications;
