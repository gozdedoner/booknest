import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bookIcon from "../assets/book-icon.png";

import { searchBooks } from "../services/booksApi";
import { slugify } from "../utils/slugify";

export default function Navbar({ variant = "home", onSearch }) {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleLogout = () => navigate("/");

  // 🔍 GERÇEK API SEARCH
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value); // home filter için (varsa)

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const books = await searchBooks(value);
    setResults(books.slice(0, 5));
  };

  return (
    <nav className="relative w-full bg-[#919682]/30 backdrop-blur-lg shadow-md py-4 px-8 flex justify-between items-center">
      {/* 📚 LOGO */}
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
      <div className="flex items-center gap-4 relative">
        {/* 🔍 SEARCH (SADECE HOME) */}
        {variant === "home" && (
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Kitap ara..."
              className="
                px-4 py-2 rounded-xl
                border border-[#919682]/40
                focus:border-[#595E48]
                outline-none
                bg-white/60
                transition
                w-56
              "
            />

            {/* 🔽 SEARCH DROPDOWN */}
            {results.length > 0 && (
              <div
                className="
                  absolute top-12 right-0
                  w-80 bg-white
                  rounded-2xl shadow-2xl
                  border z-50 overflow-hidden
                "
              >
                {results.map((book, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      navigate(`/book/${slugify(book.title)}`, {
                        state: { book },
                      });
                      setQuery("");
                      setResults([]);
                    }}
                    className="
                      flex gap-3 p-3 cursor-pointer
                      hover:bg-[#919682]/10 transition
                    "
                  >
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm line-clamp-1">
                        {book.title}
                      </p>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 📊 ANALYTICS */}
        <button
          onClick={() => navigate("/analytics")}
          className="px-4 py-2 rounded-xl bg-white/40 hover:bg-white/60 transition"
        >
          📊 Analiz
        </button>

        {/* ⭐ FAVORITES */}
        <button
          onClick={() => navigate("/favorites")}
          className="px-4 py-2 rounded-xl bg-white/40 hover:bg-white/60 transition"
        >
          ⭐ Favoriler
        </button>

        {/* 🚪 ÇIKIŞ */}
        {variant !== "read" && (
          <button
            onClick={handleLogout}
            className="
              px-5 py-2 bg-[#919682]
              text-white rounded-xl font-medium
              hover:bg-[#595E48]
              transition shadow-sm hover:shadow
            "
          >
            Çıkış
          </button>
        )}
      </div>
    </nav>
  );
}
