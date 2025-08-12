import Image from "next/image";
// import MovieCarousel from "../components/common/landingpagepart2";


export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/bg-image.jpg" // Replace with your image path
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={75}
        />
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content */}
      {/* Adjusted the container to use flexbox for side-by-side layout and set a height suitable for desktop */}
      <div className="relative z-10 flex flex-col lg:flex-row-reverse justify-center items-center h-screen p-4"> {/* Added flex, flex-col, lg:flex-row-reverse, justify-center, items-center, h-screen, and p-4 */}
        <div className="w-full lg:w-1/2 flex justify-center items-center h-full"> {/* Container for LandingTop */}
        
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center h-full"> {/* Container for MovieCarousel */}
          {/* <MovieCarousel/> */}
        </div>
   
      </div>
    </div>
  );
}