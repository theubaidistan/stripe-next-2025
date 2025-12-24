// "use client";

// import { supabase } from "@/utils/supabaseClient";
// import toast from "react-hot-toast";

// export default function DownloadButton({ image }: any) {
//   const handleDownload = async () => {
//     const session = await supabase.auth.getSession();
//     const token = session.data.session?.access_token;

//     const res = await fetch("/api/usage-meter", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ image }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       toast.success(
//         `Success! You have downloaded ${data.download_info.total_downloads} images`
//       );
//     } else {
//       toast.error(`Error! ${data.error}`);
//     }
//   };

//   return (
//     <>
//       {/* <button
//         onClick={handleDownload}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Download
//       </button> */}
//       <button
//         onClick={handleDownload}
//         className="
//     px-6 py-3
//     bg-gradient-to-r from-blue-500 to-indigo-600
//     text-white font-semibold
//     rounded-lg
//     shadow-lg
//     hover:from-indigo-600 hover:to-blue-500
//     transition-all duration-300
//     transform hover:scale-105
//     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
//   "
//       >
//         Download
//       </button>
//     </>
//   );
// }
//*---------------------------------------------------------------------------------------------------------------------------------------
"use client";

import { supabase } from "@/utils/supabaseClient";
import toast from "react-hot-toast";

export default function DownloadButton({ image }: { image: string }) {
  const handleDownload = async () => {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    if (!token) {
      toast.error("You must be logged in to download images");
      return;
    }

    const res = await fetch("/api/usage-meter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ image }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(
        `Success! You have downloaded ${data.download_info.total_downloads} images`
      );
    } else {
      toast.error(`Error! ${data.error}`);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="
        px-6 py-3 
        bg-gradient-to-r from-blue-500 to-indigo-600 
        text-white font-semibold 
        rounded-lg 
        shadow-lg 
        hover:from-indigo-600 hover:to-blue-500 
        transition-all duration-300 
        transform hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
      "
    >
      Download
    </button>
  );
}
