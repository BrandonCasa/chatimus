import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, List, Typography } from "@mui/material";
import React, { useState } from "react";
import { MoreVertRounded as MoreVertIcon, FavoriteRounded as FavoriteIcon, ShareRounded as ShareIcon, ExpandMoreRounded as ExpandMoreIcon } from "@mui/icons-material";
import "./ServersPage.scss";
import { styled } from "@mui/material/styles";
import Notification from "../home/Notification/Notification";
import { Notification as NotificationType } from "../../app/notifications/notificationsSlice";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ServersPageProps {}

function HomePage(props: ServersPageProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  return (
    <Card sx={{ maxWidth: 345 }} className="ServerCard">
      <CardHeader
        avatar={
          <Avatar style={{ backgroundColor: "transparent" }}>
            <img src={"/images/cards/getquakedon.gif"} width="32" height="32" alt="err" />
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon style={{ color: "#fff" }} />
          </IconButton>
        }
        title="Get Quaked On"
        subheader="Official Server"
      />
      <CardMedia component="img" height="194" image="/images/cards/getquakedon.jpg" alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Put recent chat history of general here. (WIP)
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon style={{ color: "#fff" }} />
        </IconButton>
        <IconButton>
          <ShareIcon style={{ color: "#fff" }} />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon style={{ color: "#fff" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List
            sx={{
              maxHeight: 450,
              overflow: "auto",
              marginRight: "8px",
            }}
          >
            <Notification key={"test"} info={notifInfo} showAccount={true} notifType={"serverViewQuick"} />
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default HomePage;
