<<<<<<< HEAD
// import SawaFlix from '../home/page';
=======
import React from 'react'
import Navbar from '../../../components/Dashboard/navbar'
>>>>>>> 4aceadc062a04ce1ad12cdec115798e1479006c5

import SawaFlix from "../../../components/Dashboard/SawaFlix";

export const metadata = {
  title: 'Dashboard - SawaFlix',
  description: 'Your entertainment dashboard',
};

export default function DashboardPage() {
  return (
<<<<<<< HEAD
    <div className="min-h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, John!</h1>
        <p className="text-gray-400">Here's what's trending in your entertainment world.</p>
      </div>
      <SawaFlix />
=======
    <div>
      <Navbar/>
>>>>>>> 4aceadc062a04ce1ad12cdec115798e1479006c5
    </div>
  );
}