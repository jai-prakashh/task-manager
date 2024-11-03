import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions";

const useStyles = makeStyles({
  header: {
    padding: "20px",
    backgroundColor: "#f0f0f0",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  link: {
    padding: "10px 15px",
    textDecoration: "none",
    color: "#333",
    "&:hover": {
      color: "#007bff",
    },
  },
  activeLink: {
    fontWeight: "bold",
    color: "#007bff",
    borderBottom: "2px solid #007bff",
  },
});

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("token")); // Check if token exists

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link
          to="/"
          className={`${classes.link} ${
            location.pathname === "/" ? classes.activeLink : ""
          }`}
        >
          Home
        </Link>

        {/* Conditionally render Login/Logout links based on login status */}
        {!isLoggedIn ? (
          <Link
            to="/login"
            className={`${classes.link} ${
              location.pathname === "/login" ? classes.activeLink : ""
            }`}
          >
            Login
          </Link>
        ) : (
          <Link className={classes.link} onClick={handleLogout}>
            Logout
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
