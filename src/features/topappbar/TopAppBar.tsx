import * as React from "react";
import AvatarTemplate from "../../avatarTemplate.jpg";
import "./TopAppBar.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setCurrentAccount, Account, setLoggedIn } from "../../app/accounts/accountsSlice";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AccountCircleRounded, NoAccountsRounded, AddCircleOutlineRounded, PersonOffRounded, LockRounded, LockOpenRounded } from "@mui/icons-material";
import { ListItemText, Divider, AppBar, Avatar, Box, ButtonBase, IconButton, MenuItem, Toolbar, Typography, Menu } from "@mui/material";

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
    if (account.accState.loggedIn) {
      dispatch(setCurrentAccount(props.accounts.indexOf(account)));
    }
  }
  function clickLogOut(accountA: Account) {
    if (accountA.accState.loggedIn) {
      dispatch(setLoggedIn(false));
      let shouldGoAnon = true;
      props.accounts.forEach((accountB: Account, index: number) => {
        if (accountB.accState.loggedIn && accountB.accInfo.uniqueId !== accountA.accInfo.uniqueId) {
          shouldGoAnon = false;
          dispatch(setCurrentAccount(index));
        }
      });
      console.log(shouldGoAnon);
      if (shouldGoAnon) {
        dispatch(setCurrentAccount(-1));
      }
    }
  }

  return (
    <Menu open={props.menuOpened} anchorEl={props.anchorEl} onClose={props.handleClose}>
      {props.accounts.map((account: Account, index: number) => {
        return (
          <MenuItem
            key={account.accInfo.uniqueId}
            selected={props.currAccount !== -1 && account.accInfo.uniqueId === props.accounts[props.currAccount].accInfo.uniqueId}
            onClick={() => clickAccount(account)}
          >
            <ListItemIcon>
              <AccountAvatar {...props} account={account} isNoneAllowed={false} />
            </ListItemIcon>
            <ListItemText>{account.accInfo.username}</ListItemText>
            <ListItemIcon>
              <div style={{ flexGrow: 1 }} />
              {account.accState.loggedIn ? <LockOpenRounded color="secondary" style={{ width: "20px", height: "20px" }} /> : <LockRounded color="warning" style={{ width: "20px", height: "20px" }} />}
            </ListItemIcon>
          </MenuItem>
        );
      })}
      {props.accounts.length === 0 ? (
        <MenuItem>
          <ListItemIcon>
            <AddCircleOutlineRounded color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Account</ListItemText>
        </MenuItem>
      ) : null}
      {props.accounts.length > 0 ? <Divider /> : null}
      {props.accounts.length > 0 ? (
        <MenuItem>
          <ListItemIcon>
            <AddCircleOutlineRounded color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Account</ListItemText>
        </MenuItem>
      ) : null}
      {props.accounts.length > 0 && props.currAccount !== -1 ? (
        <MenuItem onClick={() => clickLogOut(props.accounts[props.currAccount])}>
          <ListItemIcon>
            <LockRounded color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Lock Current</ListItemText>
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
      <ButtonBase style={{ borderRadius: "50%" }} onClick={handleClick}>
        <IconButton color="secondary" onClick={handleClick}>
          {props.currAccount === -1 ? <AccountAvatar {...props} account={null} isNoneAllowed={true} /> : <AccountAvatar {...props} account={props.accounts[props.currAccount]} isNoneAllowed={false} />}
        </IconButton>
      </ButtonBase>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopAppBar;
