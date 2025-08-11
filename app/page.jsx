'use client';
import NavbarTop from "../components/common/NavbarTop";
import NavbarBottom from "../components/common/NavbarBottom";
import MoviesSection from "../components/common/moviesForYou";
import MusicSection from "../components/common/MusicsForYou";
import SawaFlxHeroBanner from "../components/common/Hero"
import TrendingSection from "../components/common/Trending"

export default function Home() {
  return (
    <>
      <div className="w-full overflow-x-hidden bg-black">
        <NavbarTop />
        <SawaFlxHeroBanner/>
        <div className="relative z-10">
          <TrendingSection/>
          <MoviesSection/>
          <MusicSection/>
        </div>
        <NavbarBottom/>
      </div>
    </>
  );
}