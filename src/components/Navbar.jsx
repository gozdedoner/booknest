import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bookIcon from "../assets/book-icon.png";

export default function Navbar({ variant = "home", onSearch }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = () => navigate("/");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value); // 🛡️ güvenli çağrı
  };

  return (
    <nav className="w-full bg-[#919682]/30 backdrop-blur-lg shadow-md py-4 px-8 flex justify-between items-center">
      {/* LOGO */}
      <div
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img
          src={bookIcon}
          alt="Book Icon"
          className="w-8 h-8 drop-shadow-sm"
        />
        <h2 className="text-2xl font-bold text-[#595E48]">BookNest</h2>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* 🔍 SEARCH (SADECE HOME) */}
        {variant === "home" && (
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Ara..."
            className="
              px-4 py-2 rounded-xl
              border border-[#919682]/40
              focus:border-[#595E48]
              outline-none
              bg-white/50
              transition
            "
          />
        )}

        {/* 🚪 ÇIKIŞ (HOME + DETAIL) */}
        {variant !== "read" && (
          <button
            onClick={handleLogout}
            className="
              px-5 py-2
              bg-[#919682]
              text-white
              rounded-xl
              font-medium
              hover:bg-[#595E48]
              transition
              shadow-sm hover:shadow
            "
          >
            Çıkış
          </button>
        )}
      </div>
    </nav>
  );
}
