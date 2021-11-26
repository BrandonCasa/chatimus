import { DeleteRounded } from "@mui/icons-material";
import { AppBar, Button, Checkbox, Chip, FormControlLabel, FormGroup, List, Paper, Stack, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNotification, Notification as NotificationType } from "../../app/notifications/notificationsSlice";
import "./HomePage.scss";
import Notification from "./Notification/Notification";
import QuickChat from "./QuickChat/QuickChat";
import QuickNotifications from "./QuickNotifications/QuickNotifications";

interface HomePageProps {}

function HomePage(props: HomePageProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="HomePage">
      <QuickNotifications />
    </div>
  );
}

export default HomePage;
