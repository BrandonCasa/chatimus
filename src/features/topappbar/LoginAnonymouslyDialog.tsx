import * as React from "react";
import "./LoginAnonymouslyDialog.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setAddAccountDialogOpen, setLoginAnonymouslyDialogOpen } from "../../app/appstate/appSlice";
import { createAccountAsync } from "../../app/accounts/accountsSlice";
import { Dialog, DialogTitle, DialogContent, DialogContentText, ButtonGroup, DialogActions, Button, TextField } from "@mui/material";
import TopAppBar from "./TopAppBar";
import GoogleButton from "react-google-button";
import Cookies from "universal-cookie";

function LoginAnonymouslyDialog() {
  const dialogOpen = useAppSelector((state) => state.appstate.data.loginAnonymouslyDialogOpen);
  const serverIp = useAppSelector((state) => state.appstate.data.currentServerIp);
  const accounts = useAppSelector((state) => state.accounts.data.accounts);
  const [username, setUsername] = React.useState("");
  const dispatch = useAppDispatch();

  const loginAnonymously = () => {
    dispatch(createAccountAsync({ accType: "anonymous", username: username, serverIp: serverIp, hasPfp: false, pfpBase64: "", email: "", passSalt: "", passHash: "", numAccounts: accounts.length }));
    dispatch(setLoginAnonymouslyDialogOpen(false));
  };

  const inputChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <Dialog open={dialogOpen} onClose={(event) => dispatch(setLoginAnonymouslyDialogOpen(false))}>
      <DialogTitle>Add a New Account</DialogTitle>
      <DialogContent>
        <DialogContentText>Login to add a new account.</DialogContentText>
        <TextField autoFocus={true} margin="dense" id="name" label="Username" type="text" fullWidth={true} variant="standard" onChange={(event) => inputChanged(event)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={loginAnonymously}>Finish</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginAnonymouslyDialog;
