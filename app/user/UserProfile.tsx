// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "../../utils/supabaseClient";
// import { User } from "@supabase/supabase-js";
// import LoginForm from "./LoginForm";
// import PortalButton from "../portal/PortalButton";

// export default function UserProfile() {
//   const [user, setUser] = useState<User | null>(null);
//   const [stripeCustomer, setStripeCustomer] = useState<any>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       setUser(user);

//       if (user) {
//         const { data: stripeCustomerData, error } = await supabase
//           .from("stripe_customers")
//           .select("*")
//           .eq("user_id", user.id)
//           .single();

//         if (error) {
//           console.log("No stripe customer data found");
//         } else {
//           setStripeCustomer(stripeCustomerData);
//         }
//       }
//     };

//     fetchUser();

//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (event, session) => {
//         if (event === "SIGNED_IN") {
//           if (session) {
//             setUser(session.user);
//           }
//         } else if (event === "SIGNED_OUT") {
//           setUser(null);
//           setStripeCustomer(null);
//         }
//       }
//     );

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//   };

//   return (
//     <div>
//       <h1>User Data</h1>
//       {user ? (
//         <>
//           <p>
//             Signed in with email: <strong>{user.email}</strong>
//           </p>
//           <p>
//             Supabase User ID: <strong>{user.id}</strong>
//           </p>
//           <div>
//             <button
//               className="btn btn-secondary my-3 btn-sm"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>

//           <h2>Stripe Customer Data</h2>
//           {stripeCustomer ? (
//             <>
//               <p>This data lives in the stripe_customers table in Supabase</p>
//               <div className="mockup-code">
//                 <pre>
//                   <code>{JSON.stringify(stripeCustomer, null, 2)}</code>
//                 </pre>
//               </div>
//               <PortalButton />
//             </>
//           ) : (
//             <div>
//               <p className="text-yellow-500">
//                 Stripe customer data not created yet. Buy a plan!
//               </p>
//             </div>
//           )}
//         </>
//       ) : (
//         <>
//           <p>No user logged in.</p>
//           <LoginForm />
//         </>
//       )}
//     </div>
//   );
// }
//*-----------------------------------------------------------------------------------------
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import LoginForm from "./LoginForm";
import PortalButton from "../portal/PortalButton";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [stripeCustomer, setStripeCustomer] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data: stripeCustomerData, error } = await supabase
          .from("stripe_customers")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (!error) {
          setStripeCustomer(stripeCustomerData);
        }
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) setUser(session.user);
        if (event === "SIGNED_OUT") {
          setUser(null);
          setStripeCustomer(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 transition-all duration-300">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          User Profile
        </h1>

        {user ? (
          <>
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                Signed in with email:{" "}
                <span className="font-semibold">{user.email}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Supabase User ID:{" "}
                <span className="font-mono text-sm">{user.id}</span>
              </p>
            </div>

            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Stripe Customer Data
              </h2>

              {stripeCustomer ? (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-inner">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    This data lives in the <code>stripe_customers</code> table
                    in Supabase
                  </p>
                  <pre className="overflow-x-auto bg-gray-200 dark:bg-gray-800 p-3 rounded-md text-sm text-gray-800 dark:text-gray-100">
                    <code>{JSON.stringify(stripeCustomer, null, 2)}</code>
                  </pre>
                  <div className="mt-4">
                    <PortalButton />
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-md text-yellow-800 dark:text-yellow-200">
                  Stripe customer data not created yet. Buy a plan!
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              No user logged in.
            </p>
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
}
