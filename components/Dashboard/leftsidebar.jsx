"use client";
import { useState } from "react";
import {
  Film,
  Music,
  User,
  LifeBuoy,
  Sparkles,
  Download,
  Clock,
} from "lucide-react"; // Import icons

export default function LeftSidebar() {
  const [active, setActive] = useState("movies");

  const menuItems = [
    { name: "Movies", icon: Film, id: "movies" },
    { name: "Musics", icon: Music, id: "musics" },
    { name: "Artist", icon: User, id: "artist" },
    { name: "Downloads", icon: Download, id: "downloads" },
    { name: "Recent", icon: Clock, id: "recent" },
    { name: "Support", icon: LifeBuoy, id: "support" },
    { name: "SawaSmart", icon: Sparkles, id: "sawasmart" },
  ];

  return (
    <aside className="h-screen w-60 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
      {/* Top Logo */}
      <div className="p-4 flex items-center space-x-2">
        <h1 className="text-xl font-bold text-red-700">SawaFlix</h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 mt-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center w-full space-x-3 p-2 rounded-xl transition cursor-pointer ${
                active === item.id ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              <Icon size={22} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-800">
        <p className="font-semibold">John Bless</p>
        <p className="text-xs text-gray-400">@johnbless</p>
      </div>
    </aside>
  );
}
