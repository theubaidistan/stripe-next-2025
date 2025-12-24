// // import { stripe } from "@/utils/stripe";

// // async function getSession(sessionId: string) {
// //   const session = await stripe.checkout.sessions.retrieve(sessionId!);
// //   return session;
// // }

// // export default async function CheckoutReturn({ searchParams }: any) {
// //   const sessionId = searchParams.session_id;
// //   const session = await getSession(sessionId);

// //   console.log(session);

// //   if (session?.status === "open") {
// //     return <p>Payment did not work.</p>;
// //   }

// //   if (session?.status === "complete") {
// //     return (
// //       <h3>
// //         We appreciate your business! Your Stripe customer ID is:
// //         {session.customer as string}.
// //       </h3>
// //     );
// //   }

// //   return null;
// // }
// //*------------------------------------------------------------------------------------
// import { stripe } from "@/utils/stripe";

// async function getSession(sessionId: string) {
//   if (!sessionId) throw new Error("No session ID provided");
//   const session = await stripe.checkout.sessions.retrieve(sessionId);
//   return session;
// }

// export default async function CheckoutReturn({ searchParams }: any) {
//   const sessionId = searchParams?.session_id;

//   if (!sessionId) {
//     return <p>Error: No session ID found in URL.</p>;
//   }

//   let session;
//   try {
//     session = await getSession(sessionId);
//   } catch (err: any) {
//     console.error("Error fetching Stripe session:", err);
//     return <p>Error retrieving session: {err.message}</p>;
//   }

//   console.log(session);

//   if (session.status === "open") {
//     return <p>Payment did not complete.</p>;
//   }

//   if (session.status === "complete") {
//     const customerId =
//       typeof session.customer === "string"
//         ? session.customer
//         : session.customer?.id ?? "Unknown";

//     return (
//       <h3>
//         We appreciate your business! Your Stripe customer ID is: {customerId}.
//       </h3>
//     );
//   }

//   return <p>Unknown session status.</p>;
// }
//*---------------------------------------------------------------------------------------------
import { stripe } from "@/utils/stripe";

import {
  CheckCircleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { JSX } from "react";

async function getSession(sessionId: string) {
  if (!sessionId) throw new Error("No session ID provided");
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}

// export default async function CheckoutReturn({ searchParams }: any) {
//   // unwrap the Promise
//   const params = await searchParams;
//   const sessionId = params?.session_id;

//   if (!sessionId) {
//     return <p>Error: No session ID found in URL.</p>;
//   }

//   let session;
//   try {
//     session = await getSession(sessionId);
//   } catch (err: any) {
//     console.error("Error fetching Stripe session:", err);
//     return <p>Error retrieving session: {err.message}</p>;
//   }

//   console.log(session);

//   if (session.status === "open") {
//     return <p>Payment did not complete.</p>;
//   }

//   if (session.status === "complete") {
//     const customerId =
//       typeof session.customer === "string"
//         ? session.customer
//         : session.customer?.id ?? "Unknown";

//     return (
//       <h3>
//         We appreciate your business! Your Stripe customer ID is: {customerId}.
//       </h3>
//     );
//   }

//   return <p>Unknown session status.</p>;
// }

export default async function CheckoutReturn({ searchParams }: any) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  const messageCard = (
    icon: JSX.Element,
    title: string,
    description?: string,
    bgColor = "bg-white"
  ) => (
    <div
      className={`max-w-xl mx-auto mt-20 p-6 rounded-2xl shadow-lg ${bgColor} flex flex-col items-center gap-4`}
    >
      {icon}
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      {description && (
        <p className="text-gray-600 text-center">{description}</p>
      )}
    </div>
  );

  if (!sessionId) {
    return messageCard(
      <XCircleIcon className="w-16 h-16 text-red-500" />,
      "Error",
      "No session ID found in URL.",
      "bg-red-50"
    );
  }

  let session;
  try {
    session = await getSession(sessionId);
  } catch (err: any) {
    console.error("Error fetching Stripe session:", err);
    return messageCard(
      <XCircleIcon className="w-16 h-16 text-red-500" />,
      "Error retrieving session",
      err.message,
      "bg-red-50"
    );
  }

  console.log(session);

  if (session.status === "open") {
    return messageCard(
      <QuestionMarkCircleIcon className="w-16 h-16 text-yellow-500" />,
      "Payment Pending",
      "Your payment did not complete.",
      "bg-yellow-50"
    );
  }

  if (session.status === "complete") {
    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id ?? "Unknown";

    return messageCard(
      <CheckCircleIcon className="w-16 h-16 text-green-500" />,
      "Payment Successful",
      `We appreciate your business! Your Stripe customer ID is: ${customerId}.`,
      "bg-green-50"
    );
  }

  return messageCard(
    <QuestionMarkCircleIcon className="w-16 h-16 text-gray-500" />,
    "Unknown Status",
    "We could not determine the status of this session.",
    "bg-gray-50"
  );
}
