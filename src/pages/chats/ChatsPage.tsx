import React from "react";
import "./ChatsPage.scss";
import { useAppDispatch } from "../../app/hooks";
import { Button, Drawer } from "@mui/material";

function ChatsPage() {
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} variant="persistent">
        xd
      </Drawer>
      <Button variant="contained" onClick={() => setDrawerOpen(true)}>
        open
      </Button>
    </div>
  );
}

export default ChatsPage;
