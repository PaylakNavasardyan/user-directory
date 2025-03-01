"use client"

import axios from "axios";
import classes from "./page.module.css";
import React, { useEffect, useState } from "react";
import { IUser } from "./types/types";

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetchUser();
  }, []);
  
  async function fetchUser() {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <div className={classes.page}>
      {users ? (
        users.map((user) => (
          <div key={user.id} className={classes.pageFields}>
            <h2>{user.name}</h2>
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
