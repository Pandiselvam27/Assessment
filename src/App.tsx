import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
} from "@material-ui/core";
import Home from "./components/Home";
import Products from "./components/Products";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit">
              <Link to="/" className={classes.link}>
                Home
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/product" className={classes.link}>
                Products
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/services" className={classes.link}>
                Services
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/gallery" className={classes.link}>
                Gallery
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/contact" className={classes.link}>
                Contact Us
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/gallery" element={<div>Gallery Page</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
