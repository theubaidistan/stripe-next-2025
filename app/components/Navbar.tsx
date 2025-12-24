// "use client";

// import Link from "next/link";
// import { useState } from "react";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const menuItems = ["Home", " Photos", " User Auth"];

//   return (
//     <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 px-6 py-3 flex justify-between items-center">
//       {/* Logo */}
//       <Link
//         href="/"
//         className="flex items-center gap-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
//       >
//         🔥 Stripe for SaaS
//       </Link>

//       {/* Desktop Menu */}
//       <ul className="hidden md:flex items-center gap-6">
//         {menuItems.map((item) => (
//           <li key={item}>
//             <Link
//               href="/"
//               className="text-gray-700 font-medium hover:text-white hover:bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-2 rounded-lg transition"
//             >
//               {item}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {/* Desktop Buttons */}

//       {/* Mobile Hamburger */}
//       <button
//         className="md:hidden text-gray-600"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-16 left-0 w-full bg-white/90 backdrop-blur-md flex flex-col items-center gap-4 py-4 md:hidden shadow-lg">
//           {menuItems.map((item) => (
//             <Link
//               key={item}
//               href="#"
//               className="text-gray-700 font-medium hover:text-white hover:bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-2 rounded-lg transition"
//             >
//               {item}
//             </Link>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// };
// export default Navbar;
//*----------------------------------------------------------------------
"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Photos", href: "/photos" },
    { name: "User Auth", href: "/user" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
      >
        🔥 Stripe for SaaS
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-gray-700 font-medium hover:text-white hover:bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-2 rounded-lg transition"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-600"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white/90 backdrop-blur-md flex flex-col items-center gap-4 py-4 md:hidden shadow-lg">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 font-medium hover:text-white hover:bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-2 rounded-lg transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
