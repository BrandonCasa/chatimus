import * as React from "react";
import "./AddAccountDialog.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setAddAccountDialogOpen, setLoginAnonymouslyDialogOpen } from "../../app/appstate/appSlice";
import { getExistingAccountAsync } from "../../app/accounts/accountsSlice";
import { Dialog, DialogTitle, DialogContent, DialogContentText, ButtonGroup, DialogActions, Button } from "@mui/material";
import TopAppBar from "./TopAppBar";
import GoogleButton from "react-google-button";
import Cookies from "universal-cookie";

function AddAccountDialog() {
  const dialogOpen = useAppSelector((state) => state.appstate.data.addAccountDialogOpen);
  const serverIp = useAppSelector((state) => state.appstate.data.currentServerIp);
  const dispatch = useAppDispatch();

  const loginAnonymously = () => {
    dispatch(setAddAccountDialogOpen(false));
    const cookies = new Cookies();
    if (cookies.get("anonymousAccountExists")) {
      // Proceed to add the account to the list as it already exists
      const data = {
        serverIp: serverIp,
        uuid: cookies.get("anonymousUUID"),
      };
      dispatch(getExistingAccountAsync(data));
    } else {
      dispatch(setLoginAnonymouslyDialogOpen(true));
    }
  };

  return (
    <Dialog open={dialogOpen} onClose={(event) => dispatch(setAddAccountDialogOpen(false))}>
      <DialogTitle>Add a New Account</DialogTitle>
      <DialogContent>
        <DialogContentText>Login to add a new account.</DialogContentText>
        <ButtonGroup orientation="vertical">
          <Button variant="contained" color="secondary">
            Sign in/up with Email
          </Button>
          <Button variant="contained" color="primary" onClick={loginAnonymously}>
            Sign in Anonymously
          </Button>
        </ButtonGroup>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            const cookies = new Cookies();
            cookies.remove("anonymousAccountExists");
            cookies.remove("anonymousUUID");
          }}
        >
          Remove Stored Anonymous Account
        </Button>
        <Button onClick={() => dispatch(setAddAccountDialogOpen(false))} variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddAccountDialog;
