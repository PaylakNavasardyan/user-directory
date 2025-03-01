"use client"

import axios from "axios";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { IUser } from "./types/types";

export default function Home() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);
  
  async function fetchUser() {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <div className={styles.page}>
      <h1>Hello, {user ? user.name : "Loading..."}</h1>
    </div>
  );
}
