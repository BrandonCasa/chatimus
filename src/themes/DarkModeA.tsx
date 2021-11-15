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
    main: "#00628f",
  },
  secondary: {
    main: "#237d3f",
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

const components = {
  MuiList: {
    styleOverrides: {
      root: {
        "::-webkit-scrollbar": {
          height: 13,
          width: 13,
        },
        "::-webkit-scrollbar-thumb": {
          background: "#b3afb3",
          borderRadius: 9,
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#b3afb3",
        },
        "::-webkit-scrollbar-track": {
          background: "#373737",
          borderRadius: 9,
          boxShadow: "inset 0px 0px 0px 0px #f0f0f0",
          margin: 8,
        },
      },
    },
  },
};

// Create a MUI theme instance.
const themeDarkModeA = createTheme({
  palette,
  components,
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default themeDarkModeA;
