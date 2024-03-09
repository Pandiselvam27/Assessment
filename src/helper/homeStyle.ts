import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const homeStyle = makeStyles((theme: Theme) => ({
  paper: {
    padding: 10,
    textAlign: "center",
    color: theme.palette?.text?.secondary,
    background: theme.palette?.text?.primary,
    margin: "auto",
    maxWidth: 1200,
    marginTop: 10,
  },
  card: {
    width: 210,
    height: 130,
    margin: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow:'none'
  },
  media: {
    height: 75,
    width: 100,
    objectFit: "contain",
  },
  formControl: {
    padding: 5,
  },
}));

export default homeStyle;
