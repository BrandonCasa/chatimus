import { AddCircleOutlineRounded, DeleteRounded, LockRounded, NoAccountsRounded } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, ButtonBase, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import { Account, setCurrentAccount, removeAccount } from "../../app/accounts/accountsSlice";
import { setAddAccountDialogOpen } from "../../app/appstate/appSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AvatarTemplate from "../../avatarTemplate.jpg";
import AddAccountDialog from "./AddAccountDialog";
import CreateAnonymousDialog from "./CreateAnonymousDialog";
import LoginAnonymouslyDialog from "./LoginAnonymouslyDialog";
import "./TopAppBar.scss";

interface AccountsButtonProps {
  accounts: Account[];
  currAccount: number;
}

interface AccountAvatarProps {
  account: Account | null;
  isNoneAllowed: boolean;
}

interface AccountDropdownMenuProps {
  accounts: Account[];
  currAccount: number;
  menuOpened: boolean;
  anchorEl: null | HTMLElement;
  handleClose: (() => void) | undefined;
}

function AccountDropdownMenu(props: AccountDropdownMenuProps) {
  const dispatch = useAppDispatch();

  function clickAccount(account: Account) {
    dispatch(setCurrentAccount(props.accounts.indexOf(account)));
  }
  function clickRemove(toRemove: number) {
    dispatch(removeAccount(toRemove));
  }

  return (
    <Menu open={props.menuOpened} anchorEl={props.anchorEl} onClose={props.handleClose}>
      {props.accounts.map((account: Account, index: number) => {
        return (
          <MenuItem key={account.accInfo.uuid} selected={props.currAccount !== -1 && account.accInfo.uuid === props.accounts[props.currAccount].accInfo.uuid} onClick={() => clickAccount(account)}>
            <ListItemIcon>
              <AccountAvatar {...props} account={account} isNoneAllowed={false} />
            </ListItemIcon>
            <ListItemText>{account.accInfo.username}</ListItemText>
            <ListItemIcon>
              <div style={{ flexGrow: 1 }} />
            </ListItemIcon>
          </MenuItem>
        );
      })}
      {props.accounts.length === 0 ? (
        <MenuItem onClick={() => dispatch(setAddAccountDialogOpen(true))}>
          <ListItemIcon>
            <AddCircleOutlineRounded color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Account</ListItemText>
        </MenuItem>
      ) : null}
      {props.accounts.length > 0 ? <Divider /> : null}
      {props.accounts.length > 0 ? (
        <MenuItem onClick={() => dispatch(setAddAccountDialogOpen(true))}>
          <ListItemIcon>
            <AddCircleOutlineRounded color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Account</ListItemText>
        </MenuItem>
      ) : null}
      {props.accounts.length > 0 && props.currAccount !== -1 ? (
        <MenuItem onClick={() => clickRemove(props.currAccount)}>
          <ListItemIcon>
            <DeleteRounded color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Remove Current</ListItemText>
        </MenuItem>
      ) : null}
    </Menu>
  );
}

function AccountAvatar(props: AccountAvatarProps) {
  let inner;
  if (props.account === null && props.isNoneAllowed) {
    inner = "A";
  } else if (props.account !== null && props.account.accInfo.hasPfp) {
    inner = "B";
  } else if (props.account !== null && !props.account.accInfo.hasPfp) {
    inner = "C";
  }

  if (inner === "A") {
    return (
      <Avatar style={{ width: "32px", height: "32px", pointerEvents: "none", backgroundColor: "transparent" }}>
        <NoAccountsRounded color="secondary" style={{ width: "32px", height: "32px" }} />
      </Avatar>
    );
  } else if (inner === "B") {
    return (
      <Avatar style={{ width: "32px", height: "32px", pointerEvents: "none", backgroundColor: "transparent" }}>
        <img src={props.account !== null ? props.account.accInfo.pfpBase64 : ""} alt="err" height="32" width="32" style={{ borderRadius: "50%" }} />
      </Avatar>
    );
  } else if (inner === "C") {
    return (
      <Avatar style={{ width: "32px", height: "32px", pointerEvents: "none", backgroundColor: "transparent" }}>
        <img src={AvatarTemplate} alt="err" height="32" width="32" style={{ borderRadius: "50%" }} />
      </Avatar>
    );
  } else {
    return <div>err</div>;
  }
}

function AccountsButton(props: AccountsButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpened = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton color="secondary" onClick={handleClick} sx={{ paddingRight: 0 }}>
        {props.currAccount === -1 ? <AccountAvatar {...props} account={null} isNoneAllowed={true} /> : <AccountAvatar {...props} account={props.accounts[props.currAccount]} isNoneAllowed={false} />}
      </IconButton>
      <AccountDropdownMenu accounts={props.accounts} currAccount={props.currAccount} menuOpened={menuOpened} anchorEl={anchorEl} handleClose={handleClose} />
    </React.Fragment>
  );
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
          <AddAccountDialog />
          <CreateAnonymousDialog />
          <LoginAnonymouslyDialog />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopAppBar;
