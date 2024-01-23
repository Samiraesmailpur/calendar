"use client";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { emailRegex } from "@/utils/regex";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/calendar");
    }
  }, [session, router]);

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

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/calendar",
    });

    if (response?.error) {
      setError("Invalid email or password");
    } else {
      router.replace("/calendar");
    }
    console.log(response);
    return response;
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
          Sign In
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit}>
            <InputTextField
              label="Email Address"
              name="email"
              type="email"
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
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
