// export default function About() {
//   return (
//     <main>
//       <h1>About!</h1>
//     </main>
//   );
// }
export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          About Us
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Welcome to our platform! We strive to deliver the best experience for
          our users. Our team is passionate about creating modern, responsive,
          and intuitive web applications.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors">
          Learn More
        </button>
      </div>
    </main>
  );
}
