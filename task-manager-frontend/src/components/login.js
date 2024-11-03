import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container, Box } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("Login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (title === "Login") {
      dispatch(login(userName, password, navigate));
    } else {
      dispatch(register(userName, password, navigate));
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={handleLogin} style={{ width: "100%", marginTop: "20px" }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          onChange={(e) => {
            e.preventDefault();
            setUserName(e.target.value);
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          {title}
        </Button>
      </form>
      <Box mt={2}>
        {title !== "Register" && (
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link
              onClick={() => {
                setTitle("Register");
              }}
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Register
            </Link>
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Login;
