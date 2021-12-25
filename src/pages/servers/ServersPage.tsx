import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, List, Typography, Stack, Chip, Button } from "@mui/material";
import React, { useState } from "react";
import { MoreVertRounded as MoreVertIcon, FavoriteRounded as FavoriteIcon, ShareRounded as ShareIcon, ExpandMoreRounded as ExpandMoreIcon } from "@mui/icons-material";
import "./ServersPage.scss";
import { styled } from "@mui/material/styles";
import Notification from "../home/Notification/Notification";
import { Notification as NotificationType } from "../../app/notifications/notificationsSlice";
import Server from "./Server/Server";

interface ServersPageProps {}

function ServersPage(props: ServersPageProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
      <Server />
      <Server />
      <Server />
      <Server />
      <Server />
      <Server />
    </div>
  );
}

export default ServersPage;
