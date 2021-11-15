import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import * as React from "react";
import { createAccountAsync } from "../../app/accounts/accountsSlice";
import { setLoginAnonymouslyDialogOpen } from "../../app/appstate/appSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./LoginAnonymouslyDialog.scss";

function LoginAnonymouslyDialog() {
  const dialogOpen = useAppSelector((state) => state.appstate.data.loginAnonymouslyDialogOpen);
  const serverIp = useAppSelector((state) => state.appstate.data.currentServerIp);
  const accounts = useAppSelector((state) => state.accounts.data.accounts);
  const currAccount = useAppSelector((state) => state.accounts.data.currAccount);
  const [username, setUsername] = React.useState("");
  const dispatch = useAppDispatch();

  const loginAnonymously = () => {
    let newAccInfo = {
      accType: "anonymous",
      username: username,
      serverIp: serverIp,
      hasPfp: false,
      pfpBase64: "",
      email: "",
      passSalt: "",
      passHash: "",
      numAccounts: accounts.length,
      selectedTheme: "default",
    };
    if (currAccount !== -1) {
      newAccInfo.selectedTheme = accounts[currAccount].accState.selectedTheme;
    }
    dispatch(createAccountAsync(newAccInfo));
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
