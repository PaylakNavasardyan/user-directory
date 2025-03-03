"use client";

import axios from "axios";
import classes from "./page.module.css";
import React, { useEffect, useState, useCallback, FC } from "react";
import { IUser, HomeProps } from "./types/types";

export default function Home<T>(props: HomeProps<T>) {
  const [users, setUsers] = useState<IUser[]>([
    { id: 11, name: "Jonathan Jonson", email: "JJ-blakc@gmail.com" },
    { id: 12, name: "Ben Potter", email: "Potter_Ben@gmail.com" },
    { id: 13, name: "Andrew Scott Jr.", email: "ScottJr@gmail.com" }
  ]); 
  
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
      console.log("Fetched users:", res.data);
      
      setUsers((prevUsers) => [...res.data, ...prevUsers]);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className={classes.page}>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className={classes.pageFields}>
            <h2>{user.name}</h2>
          </div>
        ))
      )}
    </div>
  );
}
