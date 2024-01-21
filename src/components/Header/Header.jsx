"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "./Header.css";
import { List, ListItem, Typography } from "@mui/material";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header>
      <Link href="/">
        <Typography mr={2} sx={{ color: "#000", fontSize: "22px" }}>
          Home
        </Typography>
      </Link>
      {session && (
        <Link href="/calendar" className="calendar">
          <Typography sx={{ color: "#000", fontSize: "22px" }}>
            Calendar
          </Typography>
        </Link>
      )}
      <List className="list">
        {!session ? (
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
