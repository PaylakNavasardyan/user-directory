import { IUser } from "@/app/types/types"; 
import { notFound } from "next/navigation";

async function getUser(id: number): Promise<IUser | null> {
  try {
    const res = await fetch((`https://jsonplaceholder.typicode.com/users/${id}`));

    if(!res.ok) return null;
    return res.json();
  } catch(error) {
    console.log("Error fetching user", error);
    return null;
  }
}

export default async function UserPage({ params }: { params: {id: number} }) {
  const user = await getUser(params.id);

  if(!user) return notFound();

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}