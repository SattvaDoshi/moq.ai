"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "./../services/superbaseClient";
import React, { useContext, useEffect, useState } from "react";
import { useUser as useClerkUser } from "@clerk/nextjs";

function Provider({ children }) {
  const [user, setUser] = useState();
  const { user: clerkUser, isLoaded } = useClerkUser(); // Clerk user hook

  useEffect(() => {
    if (isLoaded) {
      createNewUser();
    }
  }, [isLoaded]);

  const createNewUser = async () => {
    try {
      if (!clerkUser) return;

      const email = clerkUser.emailAddresses[0].emailAddress;
      const name = clerkUser.fullName;
      const picture = clerkUser.imageUrl;

      const { data: Users, error: fetchError } = await supabase
        .from("Users")
        .select("*")
        .eq("email", email);

      console.log("Users:", Users);

      if (fetchError) {
        console.error("Error fetching user:", fetchError.message);
        return;
      }

      if (Users?.length === 0) {
        const { data, error } = await supabase
          .from("Users")
          .insert([
            {
              name,
              email,
              picture,
            },
          ])
          .select();

        if (error) {
          console.error("Data insertion error:", error.message);
        } else {
          console.log("New User:", data);
          setUser(data[0]);
        }
      } else {
        setUser(Users[0]);
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUser must be used within a UserDetailContext.Provider");
  }
  return context;
};
