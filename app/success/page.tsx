// export default function Success() {
//   return (
//     <>
//       <h1>Payment Successful!</h1>
//     </>
//   );
// }
//*----------------------------------------------------------------------------------------
"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-emerald-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful 🎉
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-6" />

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/user"
            className="w-full rounded-xl bg-emerald-500 px-5 py-3 text-white font-medium hover:bg-emerald-600 transition"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/"
            className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
