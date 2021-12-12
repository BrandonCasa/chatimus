import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, List, Typography, Stack, Chip, Button, AppBar, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { MoreVertRounded as MoreVertIcon, FavoriteRounded as FavoriteIcon, ShareRounded as ShareIcon, ExpandMoreRounded as ExpandMoreIcon } from "@mui/icons-material";
import "./Server.scss";
import { styled } from "@mui/material/styles";
import Notification from "../../home/Notification/Notification";
import { Notification as NotificationType } from "../../../app/notifications/notificationsSlice";

interface ServerProps {}

function Server(props: ServerProps) {
  const notifInfo: NotificationType = {
    senderInfo: {
      senderUserID: "Kannatron",
      senderChatID: "",
      senderChatChannelID: "",
      senderTime: "1638941374440",
    },
    messageContent: {
      media: [],
      text: [
        {
          textPosition: 0,
          text: "Test message in GQO server.",
          isHyperlink: false,
          hyperlinkUrl: "",
          hyperlinkText: "",
          hyperlinkColorCode: "",
        },
      ],
      codeBlocks: [],
    },
    owner: "1c634601-1f98-4f09-b60b-f5a4813e1481",
  };

  let numElements = 5;

  return (
    <Card style={{ margin: 4 }} sx={{ flexGrow: 0.5, minWidth: "200px", display: "initial" }} className="ServerCard">
      <AppBar color="secondary" position="static" elevation={0}>
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          <Avatar style={{ backgroundColor: "transparent" }}>
            <img src={"/images/cards/getquakedon.gif"} width="32" height="32" alt="err" />
          </Avatar>
          Get Quaked On
          <IconButton>
            <MoreVertIcon style={{ color: "#fff" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Chip label={<Typography variant="subtitle1">Streamer</Typography>} variant="outlined" className="twitchChip" />
          <Chip label={<Typography variant="subtitle1">Overwatch</Typography>} variant="outlined" />
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon style={{ color: "#fff" }} />
        </IconButton>
        <IconButton>
          <ShareIcon style={{ color: "#fff" }} />
        </IconButton>
        <Button variant="contained" style={{ marginLeft: "auto" }}>
          Open
        </Button>
      </CardActions>
    </Card>
  );
}

export default Server;
