'use client';
import NavbarTop from "../components/common/NavbarTop";
import NavbarBottom from "../components/common/NavbarBottom";
import MoviesSection from "../components/common/moviesForYou";
import MusicSection from "../components/common/MusicsForYou";
import StreamVerseHeroBanner from "../components/common/Hero"
import TrendingSection from "../components/common/Trending"
import Image from 'next/image';


export default function Home() {
  const backgroundImage = "/bg-image.jpg";
  const overlayOpacity = 0.4;
  
  return (
    <>
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <div className="fixed inset-0 -z-20">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={85}
          />
        </div>
        
        <div className="fixed inset-0 -z-10 bg-black" style={{ opacity: overlayOpacity }}></div>
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
        
        <NavbarTop />
        <StreamVerseHeroBanner/>
        <TrendingSection/>
        <MoviesSection/>
        <MusicSection/>
        <NavbarBottom/>
      </div>
    </>
  );
}