// "use client";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from "@stripe/react-stripe-js";
// import { useCallback, useRef, useState } from "react";

// export default function EmbeddedCheckoutButton() {
//   const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
//   );
//   const [showCheckout, setShowCheckout] = useState(false);
//   const modalRef = useRef<HTMLDialogElement>(null);

//   const fetchClientSecret = useCallback(() => {
//     // Create a Checkout Session
//     return fetch("/api/embedded-checkout", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // body: JSON.stringify({ priceId: "price_1Sh1hn2cCUKxlBeGR57kaVLu" }),
//       body: JSON.stringify({ priceId: "price_1Shlbe2cCUKxlBeG70BSoXMf" }),
//     })
//       .then((res) => res.json())
//       .then((data) => data.client_secret);
//   }, []);

//   const options = { fetchClientSecret };

//   const handleCheckoutClick = () => {
//     setShowCheckout(true);
//     modalRef.current?.showModal();
//   };

//   const handleCloseModal = () => {
//     setShowCheckout(false);
//     modalRef.current?.close();
//   };

//   return (
//     // <div id="checkout" className="my-4">
//     //   <button className="btn" onClick={handleCheckoutClick}>
//     //     Open Modal with Embedded Checkout
//     //   </button>
//     //   <dialog ref={modalRef} className="modal">
//     //     <div className="modal-box w-100 max-w-screen-2xl">
//     //       <h3 className="font-bold text-lg">Embedded Checkout</h3>
//     //       <div className="py-4">
//     //         {showCheckout && (
//     //           <EmbeddedCheckoutProvider
//     //             stripe={stripePromise}
//     //             options={options}
//     //           >
//     //             <EmbeddedCheckout />
//     //           </EmbeddedCheckoutProvider>
//     //         )}
//     //       </div>
//     //       <div className="modal-action">
//     //         <form method="dialog">
//     //           <button className="btn" onClick={handleCloseModal}>
//     //             Close
//     //           </button>
//     //         </form>
//     //       </div>
//     //     </div>
//     //   </dialog>
//     // </div>

//     <div id="checkout" className="my-6 flex justify-center">
//       <button
//         className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
//         onClick={handleCheckoutClick}
//       >
//         Open Embedded Checkout
//       </button>

//       <dialog
//         ref={modalRef}
//         className="modal fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300"
//       >
//         <div className="modal-box relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden transform scale-95 transition-all duration-300">
//           {/* Header */}
//           <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
//             <h3 className="text-2xl font-bold text-gray-800">
//               Embedded Checkout
//             </h3>
//             <button
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//               onClick={handleCloseModal}
//             >
//               ✕
//             </button>
//           </div>

//           {/* Body */}
//           <div className="px-6 py-6">
//             {showCheckout && (
//               <EmbeddedCheckoutProvider
//                 stripe={stripePromise}
//                 options={options}
//               >
//                 <EmbeddedCheckout />
//               </EmbeddedCheckoutProvider>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
//             <button
//               className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//               onClick={handleCloseModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// }
//*-----------------------------------------------------------------------------------------------------------------

// "use client";

// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from "@stripe/react-stripe-js";
// import { useCallback, useRef, useState } from "react";

// export default function EmbeddedCheckoutButton() {
//   const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
//   );
//   const [showCheckout, setShowCheckout] = useState(false);
//   const modalRef = useRef<HTMLDialogElement>(null);

//   const fetchClientSecret = useCallback(() => {
//     // Create a Checkout Session
//     return fetch("/api/embedded-checkout", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ priceId: "price_1Shlbe2cCUKxlBeG70BSoXMf" }),
//     })
//       .then((res) => res.json())
//       .then((data) => data.client_secret);
//   }, []);

//   const options = { fetchClientSecret };

//   const handleCheckoutClick = () => {
//     setShowCheckout(true);
//     modalRef.current?.showModal();
//   };

//   const handleCloseModal = () => {
//     setShowCheckout(false);
//     modalRef.current?.close();
//   };

//   return (
//     // <div id="checkout" className="my-4">
//     //   <button className="btn" onClick={handleCheckoutClick}>
//     //     Open Modal with Embedded Checkout
//     //   </button>
//     //   <dialog ref={modalRef} className="modal">
//     //     <div className="modal-box w-100 max-w-screen-2xl">
//     //       <h3 className="font-bold text-lg">Embedded Checkout</h3>
//     //       <div className="py-4">
//     //         {showCheckout && (
//     //           <EmbeddedCheckoutProvider
//     //             stripe={stripePromise}
//     //             options={options}
//     //           >
//     //             <EmbeddedCheckout />
//     //           </EmbeddedCheckoutProvider>
//     //         )}
//     //       </div>
//     //       <div className="modal-action">
//     //         <form method="dialog">
//     //           <button className="btn" onClick={handleCloseModal}>
//     //             Close
//     //           </button>
//     //         </form>
//     //       </div>
//     //     </div>
//     //   </dialog>
//     // </div>
//     // <div id="checkout" className="my-6 flex justify-center">
//     //   <button
//     //     className="btn btn-primary btn-lg shadow-lg"
//     //     onClick={handleCheckoutClick}
//     //   >
//     //     🚀 Open Secure Checkout
//     //   </button>

//     //   <dialog
//     //     ref={modalRef}
//     //     className="modal modal-bottom sm:modal-middle  backdrop-blur-sm bg-black/40 overflow-"
//     //   >
//     //     <div className="modal-box w-full max-w-6xl p-0 overflow-hidden shadow-2xl">
//     //       {/* Header */}
//     //       <div className="flex items-center justify-between px-6 py-4 border-b bg-base-200">
//     //         <h3 className="text-xl font-bold">🔐 Secure Payment</h3>
//     //         <button
//     //           onClick={handleCloseModal}
//     //           className="btn btn-sm btn-circle btn-ghost"
//     //         >
//     //           ✕
//     //         </button>
//     //       </div>

//     //       {/* Body */}
//     //       <div className="p-6 bg-base-100 min-h-[60vh]">
//     //         {showCheckout ? (
//     //           <EmbeddedCheckoutProvider
//     //             stripe={stripePromise}
//     //             options={options}
//     //           >
//     //             <div className="rounded-xl border bg-white p-4 shadow-inner">
//     //               <EmbeddedCheckout />
//     //             </div>
//     //           </EmbeddedCheckoutProvider>
//     //         ) : (
//     //           <div className="flex items-center justify-center h-full">
//     //             <span className="loading loading-spinner loading-lg"></span>
//     //           </div>
//     //         )}
//     //       </div>

//     //       {/* Footer */}
//     //       <div className="flex justify-end gap-3 px-6 py-4 border-t bg-base-200">
//     //         <button onClick={handleCloseModal} className="btn btn-outline">
//     //           Cancel
//     //         </button>
//     //       </div>
//     //     </div>
//     //   </dialog>
//     // </div>

//     <div id="checkout" className="my-6 flex justify-center">
//       <button
//         className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
//         onClick={handleCheckoutClick}
//       >
//         Open Embedded Checkout
//       </button>

//       {/* <dialog
//         ref={modalRef}
//         className="modal modal-bottom sm:modal-middle backdrop-blur-sm bg-white/40"
//         onCancel={(e) => e.preventDefault()}
//       >
//         <div className="modal-box w-full max-w-6xl p-0 overflow-hidden shadow-2xl">

//           <div className="flex items-center justify-between px-6 py-4 border-b bg-base-200">
//             <h3 className="text-xl font-bold flex items-center gap-2">
//               🔐 Secure Payment
//             </h3>
//             <button
//               onClick={handleCloseModal}
//               className="btn btn-sm btn-circle btn-ghost"
//             >
//               ✕
//             </button>
//           </div>

//           <div className="min-h-[70vh] bg-base-100 flex items-center justify-center p-6">
//             {showCheckout ? (
//               <EmbeddedCheckoutProvider
//                 stripe={stripePromise}
//                 options={options}
//               >

//                 <div className="flex justify-center w-full">
//                   <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4">
//                     <EmbeddedCheckout />
//                   </div>
//                 </div>
//               </EmbeddedCheckoutProvider>
//             ) : (
//               <span className="loading loading-spinner loading-lg"></span>
//             )}
//           </div>

//           <div className="flex justify-end px-6 py-4 border-t bg-base-200">
//             <button
//               onClick={handleCloseModal}
//               className=" bg-red-50
//     px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700
//     hover:bg-gray-100 hover:text-gray-900
//     transition-colors duration-300 shadow-sm
//     focus:outline-none focus:ring-2 focus:ring-blue-400
//   "
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </dialog> */}
//       <dialog
//         ref={modalRef}
//         className="modal modal-middle backdrop-blur-sm bg-white/40"
//         onCancel={(e) => e.preventDefault()}
//       >
//         <div className="modal-box w-full max-w-6xl p-0 overflow-hidden shadow-2xl">
//           {/* Header */}
//           <div className="flex items-center justify-between px-6 py-4 border-b bg-base-200">
//             <h3 className="text-xl font-bold flex items-center gap-2">
//               🔐 Secure Payment
//             </h3>
//             <button
//               onClick={handleCloseModal}
//               className="btn btn-sm btn-circle btn-ghost"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Body */}
//           <div className="min-h-[70vh] bg-base-100 flex items-center justify-center p-6">
//             {showCheckout ? (
//               <EmbeddedCheckoutProvider
//                 stripe={stripePromise}
//                 options={options}
//               >
//                 <div className="flex justify-center w-full">
//                   <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4">
//                     <EmbeddedCheckout />
//                   </div>
//                 </div>
//               </EmbeddedCheckoutProvider>
//             ) : (
//               <span className="loading loading-spinner loading-lg"></span>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="flex justify-end px-6 py-4 border-t bg-base-200">
//             <button
//               onClick={handleCloseModal}
//               className="bg-red-50 px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700
//                    hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300 shadow-sm
//                    focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// }
//*----------------------------------------------------------------------------------------------
// "use client";

// import { useState, useCallback, useEffect } from "react";
// import Modal from "react-modal";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from "@stripe/react-stripe-js";

// export default function EmbeddedCheckoutButton() {
//   const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
//   );
//   const [isOpen, setIsOpen] = useState(false);
//   const [showCheckout, setShowCheckout] = useState(false);

//   // ✅ Only run on client
//   useEffect(() => {
//     Modal.setAppElement("body");
//   }, []);

//   const fetchClientSecret = useCallback(() => {
//     return fetch("/api/embedded-checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         priceId: "price_1Shlbe2cCUKxlBeG70BSoXMf",
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => data.client_secret);
//   }, []);

//   const options = { fetchClientSecret };

//   const openModal = () => {
//     setShowCheckout(true);
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setShowCheckout(false);
//     setIsOpen(false);
//   };

//   return (
//     <div className="my-6 flex justify-center">
//       <button
//         className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
//         onClick={openModal}
//       >
//         Open Embedded Checkout
//       </button>

//       <Modal
//         isOpen={isOpen}
//         onRequestClose={closeModal}
//         overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
//         className="bg-base-100 rounded-xl shadow-2xl w-full max-w-6xl outline-none"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b bg-base-200">
//           <h3 className="text-xl font-bold flex items-center gap-2">
//             🔐 Secure Payment
//           </h3>
//           <button
//             onClick={closeModal}
//             className="btn btn-sm btn-circle btn-ghost"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         {/* <div className="min-h-[70vh] flex items-center justify-center p-6"> */}
//         <div className="max-h-[70vh] overflow-y-auto p-6">
//           {showCheckout ? (
//             <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//               <div className="flex justify-center w-full">
//                 <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4">
//                   <EmbeddedCheckout />
//                 </div>
//               </div>
//             </EmbeddedCheckoutProvider>
//           ) : (
//             <span className="loading loading-spinner loading-lg"></span>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end px-6 py-4 border-t bg-base-200">
//           <button
//             onClick={closeModal}
//             className="bg-red-50 px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700
//                    hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300 shadow-sm
//                    focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             Cancel
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }
//*---------------------------------------------------------------
// "use client";

// import { useState, useCallback, useEffect } from "react";
// import Modal from "react-modal";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from "@stripe/react-stripe-js";
// import { supabase } from "@/utils/supabaseClient";
// import toast from "react-hot-toast";

// export default function EmbeddedCheckoutButton() {
//   const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
//   );
//   const [isOpen, setIsOpen] = useState(false);
//   const [showCheckout, setShowCheckout] = useState(false);
//   const [email, setEmail] = useState("");

//   // Run only on client for accessibility
//   useEffect(() => {
//     Modal.setAppElement("body");

//     // Get current user email from Supabase
//     supabase.auth.getUser().then(({ data }) => {
//       if (data.user?.email) setEmail(data.user.email);
//     });
//   }, []);

//   const fetchClientSecret = useCallback(async (): Promise<string> => {
//     if (!email) throw new Error("User email not available");

//     const userId = (await supabase.auth.getUser()).data.user?.id;
//     if (!userId) throw new Error("User ID not available");

//     const res = await fetch("/api/embedded-checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         defaultPriceId: "price_1Shlbe2cCUKxlBeG70BSoXMf",
//         meteredPriceId: "price_1ShXmw2cCUKxlBeGyhfyrPYH",
//         email,
//         userId,
//       }),
//     });

//     const data = await res.json();

//     if (!data.client_secret)
//       throw new Error("No client_secret returned from API");

//     return data.client_secret;
//   }, [email]);

//   const options = { fetchClientSecret };

//   const openModal = () => {
//     if (!email) {
//       toast.error("Please log in to checkout");
//       return;
//     }
//     setShowCheckout(true);
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setShowCheckout(false);
//     setIsOpen(false);
//   };

//   return (
//     <div className="my-6 flex justify-center">
//       <button
//         className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
//         onClick={openModal}
//       >
//         Open Embedded Checkout
//       </button>

//       <Modal
//         isOpen={isOpen}
//         onRequestClose={closeModal}
//         overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
//         className="bg-base-100 rounded-xl shadow-2xl w-full max-w-6xl outline-none flex flex-col max-h-[80vh]"
//       >
//         {/* Header */}
//         <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b bg-base-200">
//           <h3 className="text-xl font-bold flex items-center gap-2">
//             🔐 Secure Payment
//           </h3>
//           <button
//             onClick={closeModal}
//             className="btn btn-sm btn-circle btn-ghost"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body (scrollable) */}
//         <div className="flex-1 overflow-y-auto p-6 bg-base-100">
//           {showCheckout ? (
//             <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//               <div className="flex justify-center w-full">
//                 <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4">
//                   <EmbeddedCheckout />
//                 </div>
//               </div>
//             </EmbeddedCheckoutProvider>
//           ) : (
//             <div className="flex justify-center items-center h-full">
//               <span className="loading loading-spinner loading-lg"></span>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex-shrink-0 flex justify-end px-6 py-4 border-t bg-base-200">
//           <button
//             onClick={closeModal}
//             className="bg-red-50 px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700
//                        hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300 shadow-sm
//                        focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             Cancel
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }
//*--------------------------------------------------------------------------------------------------------------------
// "use client";

// import { useState, useCallback, useEffect } from "react";
// import Modal from "react-modal";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from "@stripe/react-stripe-js";
// import { supabase } from "@/utils/supabaseClient";
// import toast from "react-hot-toast";

// export default function EmbeddedCheckoutButton() {
//   const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
//   );

//   const [isOpen, setIsOpen] = useState(false);
//   const [showCheckout, setShowCheckout] = useState(false);
//   const [email, setEmail] = useState("");
//   const [userId, setUserId] = useState("");

//   // Only run on client
//   useEffect(() => {
//     Modal.setAppElement("body");

//     supabase.auth.getUser().then(({ data }) => {
//       if (data.user?.email) setEmail(data.user.email);
//       if (data.user?.id) setUserId(data.user.id);
//     });
//   }, []);

//   const fetchClientSecret = useCallback(async (): Promise<string> => {
//     if (!email || !userId) throw new Error("User info not available");

//     const res = await fetch("/api/embedded-checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         defaultPriceId: "price_1Shlbe2cCUKxlBeG70BSoXMf",
//         meteredPriceId: "price_1ShXmw2cCUKxlBeGyhfyrPYH",
//         email,
//         userId,
//       }),
//     });

//     const data = await res.json();

//     if (!data.client_secret) throw new Error("No client_secret returned");

//     return data.client_secret;
//   }, [email, userId]);

//   const options = { fetchClientSecret };

//   const openModal = () => {
//     if (!email || !userId) {
//       toast.error("Please log in to checkout");
//       return;
//     }
//     setShowCheckout(true);
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setShowCheckout(false);
//     setIsOpen(false);
//   };

//   return (
//     <div className="my-6 flex justify-center">
//       <button
//         className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
//         onClick={openModal}
//       >
//         Open Embedded Checkout
//       </button>

//       <Modal
//         isOpen={isOpen}
//         onRequestClose={closeModal}
//         overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
//         className="bg-base-100 rounded-xl shadow-2xl w-full max-w-6xl outline-none flex flex-col max-h-[80vh]"
//       >
//         {/* Header */}
//         <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b bg-base-200">
//           <h3 className="text-xl font-bold flex items-center gap-2">
//             🔐 Secure Payment
//           </h3>
//           <button
//             onClick={closeModal}
//             className="btn btn-sm btn-circle btn-ghost"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Scrollable Body */}
//         <div className="flex-1 overflow-y-auto p-6 bg-base-100">
//           {showCheckout ? (
//             <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//               <div className="flex justify-center w-full">
//                 <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4">
//                   <EmbeddedCheckout />
//                 </div>
//               </div>
//             </EmbeddedCheckoutProvider>
//           ) : (
//             <div className="flex justify-center items-center h-full">
//               <span className="loading loading-spinner loading-lg"></span>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex-shrink-0 flex justify-end px-6 py-4 border-t bg-base-200">
//           <button
//             onClick={closeModal}
//             className="bg-red-50 px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700
//                        hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300 shadow-sm
//                        focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             Cancel
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }
//*----------------------------------------------------------------------------------------------------------------------------------------------
"use client";

import { useState, useCallback, useEffect } from "react";
import Modal from "react-modal";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { supabase } from "@/utils/supabaseClient";
import toast from "react-hot-toast";

export default function EmbeddedCheckoutButton() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    Modal.setAppElement("body");

    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
      if (data.user?.id) setUserId(data.user.id);
    });
  }, []);

  const fetchClientSecret = useCallback(async (): Promise<string> => {
    if (!email || !userId) throw new Error("User info not available");

    const res = await fetch("/api/embedded-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        defaultPriceId: "price_1Shlbe2cCUKxlBeG70BSoXMf",
        meteredPriceId: "price_1ShXmw2cCUKxlBeGyhfyrPYH",
        email,
        userId,
      }),
    });

    const data = await res.json();

    if (!data.client_secret) throw new Error("No client_secret returned");

    return data.client_secret;
  }, [email, userId]);

  const options = { fetchClientSecret };

  const openModal = () => {
    if (!email || !userId) {
      toast.error("Please log in to checkout");
      return;
    }
    setShowCheckout(true);
    setIsOpen(true);
  };

  const closeModal = () => {
    setShowCheckout(false);
    setIsOpen(false);
  };

  return (
    <div className="my-6 flex justify-center">
      <button
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
        onClick={openModal}
      >
        Open Embedded Checkout
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        className="bg-base-100 rounded-xl shadow-2xl w-[90vw] h-[90vh] lg:w-[80vw] lg:h-[85vh] xl:w-[90vw] xl:h-[100vh] outline-none flex flex-col"
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b bg-base-200">
          <h3 className="text-xl font-bold flex items-center gap-2">
            🔐 Secure Payment
          </h3>
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-base-100 flex justify-center items-center">
          {showCheckout ? (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <div className="w-full h-full bg-black rounded-xl shadow-lg p-6 flex justify-center items-center">
                <EmbeddedCheckout className="w-full h-full" />
              </div>
            </EmbeddedCheckoutProvider>
          ) : (
            <span className="loading loading-spinner loading-lg"></span>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex justify-end px-6 py-4 border-t bg-base-200">
          <button
            onClick={closeModal}
            className="bg-red-50 px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700 
                       hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300 shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
