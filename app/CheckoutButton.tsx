// // "use client";

// // import { loadStripe } from "@stripe/stripe-js";
// // import { supabase } from "../utils/supabaseClient";
// // import toast from "react-hot-toast";

// // export default function CheckoutButton() {
// //   const handleCheckout = async () => {
// //     const { data } = await supabase.auth.getUser();

// //     if (!data?.user) {
// //       toast.error("Please log in to create a new Stripe Checkout session");
// //       return;
// //     }

// //     const stripePromise = loadStripe(
// //       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// //     );

// //     const stripe = await stripePromise;
// //     const response = await fetch("/api/checkout", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         priceId: "price_1Sh1hn2cCUKxlBeGR57kaVLu",
// //         userId: data.user?.id,
// //         email: data.user?.email,
// //       }),
// //     });
// //     const session = await response.json();
// //     await stripe?.redirectToCheckout({ sessionId: session.id });
// //   };

// //   return (
// //     <div>
// //       <h1>Signup for a Plan</h1>
// //       <p>Clicking this button creates a new Stripe Checkout session</p>
// //       <button className="btn btn-accent" onClick={handleCheckout}>
// //         Buy Now
// //       </button>
// //     </div>
// //   );
// // }
// //*--------------------------------------------------------------------------------------------------
// "use client";

// import { supabase } from "../utils/supabaseClient";
// import toast from "react-hot-toast";

// export default function CheckoutButton() {
//   const handleCheckout = async () => {
//     const { data } = await supabase.auth.getUser();

//     if (!data?.user) {
//       toast.error("Please log in to checkout");
//       return;
//     }

//     try {
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           priceId: "price_1Shlbe2cCUKxlBeG70BSoXMf", // subscription
//           // priceId: "price_1ShXmw2cCUKxlBeGyhfyrPYH", // subscription-meter

//           userId: data.user.id,
//           email: data.user.email,
//         }),
//       });

//       const session = await response.json();

//       if (!session.url) {
//         toast.error("Failed to create Stripe session");
//         return;
//       }

//       // Redirect user to Stripe Checkout
//       window.location.href = session.url;
//     } catch (err) {
//       console.error("Checkout error:", err);
//       toast.error("An error occurred during checkout");
//     }
//   };

//   return (
//     // <div>
//     //   <h1>Signup for a Plan</h1>
//     //   <p>Click the button to start your subscription</p>
//     //   <button className="btn btn-accent" onClick={handleCheckout}>
//     //     Buy Now
//     //   </button>
//     // </div>
//     <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg text-center space-y-6">
//       <h1 className="text-2xl font-bold text-gray-800">Signup for a Plan</h1>
//       <p className="text-gray-500">
//         Start your subscription today and enjoy premium features.
//       </p>
//       <button
//         className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
//         onClick={handleCheckout}
//       >
//         Buy Now
//       </button>
//     </div>
//   );
// }
//*--------------------------------------------------------------------------------------------
"use client";

import { supabase } from "@/utils/supabaseClient";
import toast from "react-hot-toast";

export default function CheckoutButton() {
  const handleCheckout = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      toast.error("Please log in to checkout");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          defaultPriceId: "price_1Shlbe2cCUKxlBeG70BSoXMf", // recurring
          meteredPriceId: "price_1ShXmw2cCUKxlBeGyhfyrPYH", // metered
          userId: data.user.id,
          email: data.user.email,
        }),
      });

      const session = await response.json();

      if (!session.url) {
        toast.error("Failed to create Stripe session");
        return;
      }

      window.location.href = session.url; // redirect to Stripe Checkout
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("An error occurred during checkout");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg text-center space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Signup for a Plan</h1>
      <p className="text-gray-500">
        Start your subscription today and enjoy premium features.
      </p>
      <button
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        onClick={handleCheckout}
      >
        Buy Now
      </button>
    </div>
  );
}
