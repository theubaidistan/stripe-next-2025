import DownloadButton from "./DownloadButton";

export default function PhotosPage() {
  // const images = ["img1.jpg", "img2.jpg", "img3.jpg"];

  const images = [
    "https://images.pexels.com/photos/20065715/pexels-photo-20065715/free-photo-of-the-dune-and-sea.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/20160457/pexels-photo-20160457/free-photo-of-three-people-riding-horses-on-a-bridge-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/48785/horse-portrait-head-halter-48785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1743165/pexels-photo-1743165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/808465/pexels-photo-808465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/818261/pexels-photo-818261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  return (
    // <div className="grid grid-cols-3 gap-4">
    //   {images.map((image, index) => (
    //     <div key={index} className="flex flex-col items-center">
    //       <div className="w-full h-48 mb-2 overflow-hidden">
    //         <img
    //           src={image}
    //           alt={`Image ${index + 1}`}
    //           className="w-full h-full object-cover"
    //         />
    //       </div>
    //       <DownloadButton image={image} />
    //     </div>
    //   ))}
    // </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {images.map((image, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-black rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <div className="w-full h-56 overflow-hidden">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full p-4 flex justify-center">
            <DownloadButton image={image} />
          </div>
        </div>
      ))}
    </div>
  );
}
