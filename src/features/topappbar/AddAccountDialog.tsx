import * as React from "react";
import "./AddAccountDialog.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setAddAccountDialogOpen, setLoginAnonymouslyDialogOpen } from "../../app/appstate/appSlice";
import { createAccount } from "../../app/accounts/accountsSlice";
import { Dialog, DialogTitle, DialogContent, DialogContentText, ButtonGroup, DialogActions, Button } from "@mui/material";
import TopAppBar from "./TopAppBar";
import GoogleButton from "react-google-button";

function AddAccountDialog() {
  const dialogOpen = useAppSelector((state) => state.appstate.data.addAccountDialogOpen);
  const dispatch = useAppDispatch();

  const loginAnonymously = () => {
    dispatch(setAddAccountDialogOpen(false));
    dispatch(setLoginAnonymouslyDialogOpen(true));
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
        <Button onClick={() => dispatch(setAddAccountDialogOpen(false))}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddAccountDialog;
