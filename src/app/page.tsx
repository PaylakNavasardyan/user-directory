import  Link  from "next/link";
import classes from "./page.module.css";
import { IUser } from "./types/types";

async function fetchUsers(): Promise<IUser[] | null> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const apiUsers: IUser[] = await res.json();

    const predefinedUsers: IUser[] = [
      { id: 11, name: "Jonathan Jonson", email: "JJ-blakc@gmail.com" },
      { id: 12, name: "Ben Potter", email: "Potter_Ben@gmail.com" },
      { id: 13, name: "Andrew Scott Jr", email: "ScottJr@gmail.com" }
    ];

    return [...apiUsers, ...predefinedUsers];
  } catch(error) {
    console.error("Error fetching users:", error); 
    return null;
  }
}

export default async function Home() {
  const users = await fetchUsers(); 

  return (
    <div className={classes.page}>
      {users ?
      users.map((user) => (
        <Link key={user.id} href={`/user/${user.id}`} className={classes.pageFields}> 
          <div>
            <h2>{user.name}</h2>
          </div>
        </Link>
      )) : 
      <p>Loading ...</p>
      }
    </div>
  );
}