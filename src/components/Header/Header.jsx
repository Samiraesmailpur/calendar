"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "./Header.css";
import { List, ListItem, Typography } from "@mui/material";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header>
      <Link href="/">
        <Typography mr={2} sx={{ color: "#000", fontSize: "22px" }}>
          Home
        </Typography>
      </Link>
      {status === "authenticated" && (
        <Link href="/calendar" className="calendar">
          <Typography sx={{ color: "#000", fontSize: "22px" }}>
            Calendar
          </Typography>
        </Link>
      )}
      <List className="list">
        {status !== "authenticated" ? (
          <>
            <Link href="/login">
              <ListItem className="item">Sign in</ListItem>
            </Link>
            <Link href="/register">
              <ListItem className="item register">Sign up</ListItem>
            </Link>
          </>
        ) : (
          <>
            <p className="item">{session?.user?.email}</p>
            <Link href="/">
              <ListItem
                className="item"
                onClick={() => signOut({ redirect: false })}
              >
                Sign out
              </ListItem>
            </Link>
          </>
        )}
      </List>
    </header>
  );
};

export default Header;
