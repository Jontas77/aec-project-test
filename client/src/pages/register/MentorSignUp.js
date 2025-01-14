import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

const MentorSignUp = ({ setAuth, setPage }) => {
  const [inputs, setInputs] = useState({
    mentor_name: "",
    mentor_email: "",
    mentor_password: "",
  });

  const { mentor_name, mentor_email, mentor_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { mentor_name, mentor_email, mentor_password };

      const response = await fetch("/auth/mentor/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      localStorage.setItem("token", parseRes.token);

      if (parseRes.token) {
        setAuth(true);

        toast.success("Signed Up Successfully");
      } else {
        setAuth(false);

        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const Copyright = (props) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/DouglasVDM/aec">
          The A Team
        </Link>
        {""}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  // const theme = createTheme();

  return (
    <>
      <Container
        sx={{
          backgroundImage: "url('/images/background/bg1.png')",
          maxWidth: "100%",
          minHeight: "90vh",
          paddingBottom: "1rem",
        }}
      >
        {/* <ThemeProvider theme={theme}> */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Mentor Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={onSubmitForm}
              noValidate
              sx={{ mt: 1 }}
            >
              {/* MENTOR NAME */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="mentor_name"
                autoComplete="name"
                value={mentor_name}
                onChange={(e) => onChange(e)}
              />
              {/* MENTOR EMAIL */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="mentor_email"
                autoComplete="email"
                value={mentor_email}
                onChange={(e) => onChange(e)}
              />
              {/* MENTOR PASSWORD */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="mentor_password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={mentor_password}
                onChange={(e) => onChange(e)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onSubmitForm}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item xs>
                  <FormLink href="#" variant="body2">
                    Forgot password?
                  </FormLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        {/* </ThemeProvider> */}
      </Container>
    </>
  );
};

export default MentorSignUp;
