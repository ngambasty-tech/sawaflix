// import SawaFlix from '../home/page';

import SawaFlix from "../../../components/Dashboard/SawaFlix";

export const metadata = {
  title: 'Dashboard - SawaFlix',
  description: 'Your entertainment dashboard',
};

export default function DashboardPage() {
  return (
    <div className="min-h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, John!</h1>
        <p className="text-gray-400">Here's what's trending in your entertainment world.</p>
      </div>
      <SawaFlix />
    </div>
  );
}