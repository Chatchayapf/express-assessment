import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#090C12]/95 backdrop-blur-md text-white py-4 px-8 flex justify-between items-center border-b border-[#A6FF00]/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)] sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-[#A6FF00] shadow-[0_0_10px_#A6FF00] animate-pulse"></span>
        <Link to="/" className="text-xl font-black tracking-widest text-[#A6FF00] flex items-center gap-2">
          NCT 127
          <span className="text-white text-xs font-semibold tracking-normal text-gray-400 border border-gray-700 px-2 py-0.5 rounded">
            NEO CITY
          </span>
        </Link>
      </div>
      <div>
        <ul className="flex gap-6 font-bold tracking-wider text-sm">
          <li>
            <Link
              to="/"
              className="text-gray-300 hover:text-[#A6FF00] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#A6FF00]/10"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/owner"
              className="text-gray-300 hover:text-[#A6FF00] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#A6FF00]/10"
            >
              OWNER
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}