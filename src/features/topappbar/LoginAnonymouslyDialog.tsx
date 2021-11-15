import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
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
  const [secretQuestion, setSecretQuestion] = React.useState("What is your favorite color?");
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
      secretQuestion: "",
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

  const handleChange = (event: SelectChangeEvent) => {
    setSecretQuestion(event.target.value as string);
  };

  return (
    <Dialog open={dialogOpen} onClose={(event) => dispatch(setLoginAnonymouslyDialogOpen(false))}>
      <DialogTitle>Add a New Anonymous Account</DialogTitle>
      <DialogContent>
        <DialogContentText>Secret Question's allow you to login to an anonymous account once again.</DialogContentText>
        <br />
        <FormControl fullWidth={true}>
          <InputLabel id="demo-simple-select-label">Secret Question</InputLabel>
          <Select labelId="demo-simple-select-label" value={secretQuestion} label="Secret Question" onChange={handleChange}>
            <MenuItem value={"What is your favorite color?"}>What is your favorite color?</MenuItem>
            <MenuItem value={"What is your favorite ice cream flavor?"}>What is your favorite ice cream flavor?</MenuItem>
            <MenuItem value={"Which phone brand do you like the most?"}>Which phone brand do you like the most?</MenuItem>
          </Select>
        </FormControl>
        <TextField autoFocus={true} margin="dense" id="name" label="Username" type="text" fullWidth={true} variant="standard" onChange={(event) => inputChanged(event)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={loginAnonymously}>Finish</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginAnonymouslyDialog;
