import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import * as React from "react";
import Cookies from "universal-cookie";
import { getExistingAccountAsync } from "../../app/accounts/accountsSlice";
import { setAddAccountDialogOpen, setLoginAnonymouslyDialogOpen } from "../../app/appstate/appSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./AddAccountDialog.scss";

function AddAccountDialog() {
  const dialogOpen = useAppSelector((state) => state.appstate.data.addAccountDialogOpen);
  const serverIp = useAppSelector((state) => state.appstate.data.currentServerIp);
  const accounts = useAppSelector((state) => state.accounts.data.accounts);
  const dispatch = useAppDispatch();

  const loginAnonymously = () => {
    dispatch(setAddAccountDialogOpen(false));
    const cookies = new Cookies();
    if (cookies.get("anonymousAccountExists")) {
      // Proceed to add the account to the list as it already exists
      const data = {
        serverIp: serverIp,
        uuid: cookies.get("anonymousUUID"),
        numAccounts: accounts.length,
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
        <DialogContentText>Select a way to login</DialogContentText>
        <ButtonGroup orientation="vertical">
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
