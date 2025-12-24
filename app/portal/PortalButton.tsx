"use client";

import { createPortalSession } from "./portalAction";
import { supabase } from "@/utils/supabaseClient";
import toast from "react-hot-toast";

export default function PortalButton() {
  const handleClick = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw "Please log in to manage your billing.";
      }

      const { data: customer, error: fetchError } = await supabase
        .from("stripe_customers")
        .select("stripe_customer_id")
        .eq("user_id", user.id)
        .single();

      const { url } = await createPortalSession(customer?.stripe_customer_id);

      window.location.href = url;
    } catch (error) {
      console.error(error);
      toast.error("Failed to create billing portal session:");
    }
  };

  return (
    <>
      {/* <button
        className="btn btn-primary btn-outline my-3"
        onClick={handleClick}
      >
        Manage Billing
      </button> */}
      <button
        className="
    px-6 py-3 
    bg-gradient-to-r from-blue-500 to-indigo-600 
    text-white font-semibold 
    rounded-xl shadow-md 
    hover:from-blue-600 hover:to-indigo-700 
    hover:shadow-lg 
    transition-all duration-300 
    transform hover:-translate-y-1 
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
    my-3
  "
        onClick={handleClick}
      >
        Manage Billing
      </button>
    </>
  );
}
