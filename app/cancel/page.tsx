// export default function Cancel() {
//     return <h1>Payment Canceled!</h1>;
//   }
export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-300 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full">
        <svg
          className="w-16 h-16 mx-auto text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Payment Canceled!
        </h1>
        <p className="text-gray-600 mb-6">
          You have canceled your payment. No charges were made.
        </p>
        <a
          href="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition-colors"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
