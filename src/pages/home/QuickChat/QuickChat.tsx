import { Avatar, Button, Checkbox, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../app/hooks";
import "./QuickChat.scss";

interface QuickChatProps {}

function QuickChat(props: QuickChatProps) {
  const accounts = useAppSelector((state) => state.accounts.data);
  return <h1>xd</h1>;
}

export default QuickChat;
