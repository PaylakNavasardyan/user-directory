import { IUser } from "@/app/types/types"; 
import { notFound } from "next/navigation";

async function getUser(id: string): Promise<IUser | null> {
  try {
    const predefinedUsers: IUser[] = [
      { id: 11, name: "Jonathan Jonson", email: "JJ-blakc@gmail.com" },
      { id: 12, name: "Ben Potter", email: "Potter_Ben@gmail.com" },
      { id: 13, name: "Andrew Scott Jr", email: "ScottJr@gmail.com" }
    ];

    const localUser = predefinedUsers.find((user) => user.id === Number(id));
    if (localUser) return localUser;

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.log("Error fetching user", error);
    return null;
  }
}

export default async function UserPage({ params }: { params: {id: string} }) {
  const user = await getUser(params.id);

  if(!user) return notFound();

  return (
    <div style={{textAlign: 'center', marginTop: '25px'}}>
      <h1 style={{color: '#EB574AFF'}}>User Profile</h1>
      <p style={{color: '#8AEB79FF'}}><strong>ID:</strong> {user.id}</p>
      <p style={{color: '#EBBD4AFF'}}><strong>Name:</strong> {user.name}</p>
      <p style={{color: '#3A34EBFF'}}><strong>Email:</strong> {user.email}</p>
    </div>
  );
}