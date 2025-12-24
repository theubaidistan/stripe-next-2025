"use client";

import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    const randomEmail = `${Math.random().toString(36).substring(7)}@gmail.com`;
    // const randomEmail = `debugdominator+${Math.random().toString(36).substring(7)}@gmail.com`;

    const password = "Password69420";

    const { data, error } = await supabase.auth.signUp({
      email: randomEmail,
      password,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("User created and logged in:", data);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleSignUp}
      disabled={loading}
      className={`px-6 py-3 font-semibold text-white rounded-lg shadow-md transition-all duration-300 
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 transform hover:scale-105"
    }
  `}
    >
      {loading ? "Signing up..." : "Sign up with random email and password"}
    </button>
  );
}
