"use client";
import { UserDetailContext } from '@/conext/UserDetailContext';
import { supabase } from '@/services/SupabaseClient';
import React, { useEffect, useState } from 'react';

const Provider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const createNewUser = async () => {
      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !currentUser) {
        console.error("Failed to get user:", userError?.message);
        return;
      }


      const { data: users, error: selectError } = await supabase
        .from("users")
        .select("*")
        .eq("email", currentUser.email);

      if (selectError) {
        console.error("Error selecting user:", selectError.message);
        return;
      }

      if (!users || users.length === 0) {
        const { data: insertData, error: insertError } = await supabase
          .from("users")
          .insert([
            {
              email: currentUser.user_metadata?.email,
              name: currentUser.user_metadata?.name,
              profile: currentUser.user_metadata?.picture,
            },
          ]);

        if (insertError) {
          console.error("Error inserting user:", insertError.message);
        } else {
          console.log("New user created:", insertData);
        }
      }
      setUser(users[0])
    };

    createNewUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export default Provider;

// Custom hook to use user context
export const useUser = () => {
  const context = React.useContext(UserDetailContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserDetailProvider");
  }
  return context;
};
