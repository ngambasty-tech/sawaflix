// app/landing/page.jsx
import MovieCarousel from "../../components/common/landingpagepart2";
import LandingTop from "../../components/common/landingTop";

export const metadata = {
  title: 'Sawaflixx   The Ultimate Music And Movies',
  description: 'Welcome to Sawaflixx   Your ultimate destination for music and movies',
};

export default function Landing() {
  return (
  <>
  <LandingTop/>
  <MovieCarousel/>
  </>
  )
}