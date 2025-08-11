'use client';
// app/landing/page.jsx
import LandingTop from "../../components/common/landingTop";
import MovieCarousel from '../../components/common/landingpagepart2';


export default function Landing() {
  return (
    <>
      <LandingTop/>
      <MovieCarousel />
    </>
  );
}