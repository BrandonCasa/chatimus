import { createTheme } from "@mui/material/styles";

const palette = {
  divider: "#1e1e1e",
  background: {
    default: "#303030",
    paper: "#424242",
  },
  text: {
    primary: "#fff",
    secondary: "#b3b3b3",
  },
  primary: {
    main: "#c62828",
  },
  secondary: {
    main: "#039be5",
  },
  error: {
    main: "#f4511e",
  },
  warning: {
    main: "#ffc107",
  },
  info: {
    main: "#9c27b0",
  },
};

// Create a MUI theme instance.
const themeDarkModeA = createTheme({
  palette,
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default themeDarkModeA;
