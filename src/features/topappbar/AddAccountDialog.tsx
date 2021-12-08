import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@mui/material";
import * as React from "react";
import Cookies from "universal-cookie";
import { getExistingAccountAsync } from "../../app/accounts/accountsSlice";
import { setAddAccountDialogOpen, setLoginAnonymouslyDialogOpen, setCreateAnonymousDialogOpen } from "../../app/appstate/appSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./AddAccountDialog.scss";

function AddAccountDialog() {
  const dialogOpen = useAppSelector((state) => state.appstate.data.addAccountDialogOpen);
  const accounts = useAppSelector((state) => state.accounts.data.accounts);
  const dispatch = useAppDispatch();

  const signUpAnonymously = () => {
    dispatch(setAddAccountDialogOpen(false));
    dispatch(setCreateAnonymousDialogOpen(true));
  };

  const signInAnonymously = () => {
    // IMPLEMENT MULTIPLE STORED COOKIES FOR ALL ANONYMOUS ACCOUNTS
    /*
    dispatch(setAddAccountDialogOpen(false));
    const cookies = new Cookies();
    if (cookies.get("anonymousAccountExists")) {
      // Proceed to add the account to the list as it already exists
      const data = {
        method: "uuid",
        uuid: cookies.get("anonymousUUID"),
        numAccounts: accounts.length,
      };
      dispatch(getExistingAccountAsync(data));
    } else {
      dispatch(setLoginAnonymouslyDialogOpen(true));
    }
    */
    dispatch(setAddAccountDialogOpen(false));
    dispatch(setLoginAnonymouslyDialogOpen(true));
  };

  return (
    <Dialog open={dialogOpen} onClose={(event) => dispatch(setAddAccountDialogOpen(false))}>
      <DialogTitle>Add a New Account</DialogTitle>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Paper elevation={3} sx={{ padding: 0, margin: 3, marginRight: 1.5, width: "250px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <DialogContent>
              <DialogContentText variant="h5" fontWeight="700">
                Existing Account
              </DialogContentText>
              <br />
              <Button fullWidth={true} variant="contained" color="primary" onClick={signInAnonymously}>
                Anonymous
              </Button>
              <br />
              <br />
              <Button fullWidth={true} variant="contained" color="error">
                Google-WIP
              </Button>
            </DialogContent>
          </div>
        </Paper>
        <Paper elevation={3} sx={{ padding: 0, margin: 3, marginLeft: 1.5, width: "250px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <DialogContent>
              <DialogContentText variant="h5" fontWeight="700">
                New Account
              </DialogContentText>
              <br />
              <Button fullWidth={true} variant="contained" color="primary" onClick={signUpAnonymously}>
                Anonymous
              </Button>
              <br />
              <br />
              <Button fullWidth={true} variant="contained" color="error">
                Google-WIP
              </Button>
            </DialogContent>
          </div>
        </Paper>
      </div>
      <DialogActions>
        <Button
          onClick={() => {
            const cookies = new Cookies();
            cookies.remove("savedAccounts");
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
