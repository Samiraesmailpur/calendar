"use client";
import axios from "axios";
import InputTextField from "@/components/InputTextField/InputTextField";
import {
  Alert,
  CssBaseline,
  Button,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { emailRegex } from "@/utils/regex";

const Register = () => {
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email");
      return;
    }

    if (!password || password.length < 6) {
      setPasswordError("Password must be longer than 6 characters");
      return;
    }

    try {
      // const response = await axios.post("/api/register", {
      //   email,
      //   password,
      // });
      // console.log(response.data);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 201) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setEmailError("User is already registered");
        return;
      }
      setError("Oops, something went wrong. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit}>
            <InputTextField
              label="Email Address"
              name="email"
              error={emailError}
            />
            <InputTextField
              label="Password"
              name="password"
              type="password"
              error={passwordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
