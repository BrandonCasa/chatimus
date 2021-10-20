import * as React from "react";
import AvatarTemplate from "../../avatarTemplate.jpg";
import "./TopAppBar.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircleRounded";
import NoAccountsIcon from "@mui/icons-material/NoAccountsRounded";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setCurrentAccount, Account } from "../../app/accounts/accountsSlice";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";

interface AccountsButtonProps {
  accounts: Account[];
  currAccount: number;
}

function AccountsButton(props: AccountsButtonProps) {
  let inner;
  if (props.accounts.length === 0) {
    inner = <NoAccountsIcon />;
  } else {
    if (props.accounts[props.currAccount].accInfo.hasPfp) {
      inner = "pfp";
    } else {
      inner = <AccountCircleIcon />;
    }
  }

  if (typeof inner === "string") {
    return (
      <ButtonBase style={{ borderRadius: "50%" }}>
        <Avatar style={{ width: "32px", height: "32px", padding: "4px", pointerEvents: "none", backgroundColor: "transparent" }}>
          <img src={AvatarTemplate} height="32" width="32" style={{ borderRadius: "50%" }} alt="err" />
        </Avatar>
      </ButtonBase>
    );
  } else {
    return <IconButton color="secondary">{inner}</IconButton>;
  }
}

function TopAppBar() {
  const accounts = useAppSelector((state) => state.accounts.data.accounts);
  const currAccount = useAppSelector((state) => state.accounts.data.currAccount);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chatimus
          </Typography>
          <AccountsButton accounts={accounts} currAccount={currAccount} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopAppBar;
