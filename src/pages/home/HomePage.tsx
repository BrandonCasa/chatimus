import React, { useState } from "react";
import { DeleteRounded, DoneAllRounded, WatchLaterRounded } from "@mui/icons-material";
import {
  ButtonGroup,
  Button,
  Stack,
  Chip,
  Paper,
  Avatar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  AppBar,
  Toolbar,
  Theme,
  makeStyles,
  createStyles,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./HomePage.scss";
import AppTheme from "../../AppTheme";
import Notification from "./Notification/Notification";
import { createAction } from "@reduxjs/toolkit";
import { addNotification, Notification as NotificationType } from "../../app/notifications/notificationsSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import { refreshServerIp } from "../../app/appstate/appSlice";
import axios from "axios";

interface HomePageProps {}

function HomePage(props: HomePageProps) {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    axios
      .get("http://ec2-54-226-61-67.compute-1.amazonaws.com:3000/ip")
      .then(function (response) {
        dispatch(refreshServerIp(response.data));
        console.log(response.data);
      })
      .catch(function (error) {
        dispatch(refreshServerIp(""));
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const notifications = useAppSelector((state) => state.notifications.data.notifications);
  const currentAccount = useAppSelector((state) => state.accounts.data.currAccount);
  const accountsList = useAppSelector((state) => state.accounts.data.accounts);
  const [showAllBool, setShowAllBool] = useState(false);

  function addNotificationTEST() {
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

  function showAllToggle(event: any) {
    setShowAllBool(event.target.checked);
  }

  return (
    <div className="HomePage">
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
            if (showAllBool || notif.owner === accountsList[currentAccount].accInfo.uuid) {
              return <Notification key={index} info={notif} showAccount={showAllBool} />;
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
          ) : notifications.filter((e) => e.owner === accountsList[currentAccount].accInfo.uuid).length === 0 ? (
            <Typography variant="subtitle1" sx={{ paddingLeft: "24px" }}>
              No New Notifications for Current Account
            </Typography>
          ) : null}
        </List>
      </Paper>
    </div>
  );
}

export default HomePage;
