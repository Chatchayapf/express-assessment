import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#080B10] text-gray-100 selection:bg-[#A6FF00] selection:text-black">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
