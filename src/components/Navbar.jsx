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

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const books = await searchBooks(value);
    setResults(books.slice(0, 5));
  };

  return (
    <nav className="w-full bg-[#919682]/30 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={bookIcon} alt="BookNest" className="w-8 h-8" />
          <span className="text-2xl font-bold text-[#595E48]">BookNest</span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 relative">
          {/* 🔍 SEARCH – ARTIK ANALİZ YANINDA */}
          {variant === "home" && (
            <div className="relative hidden md:block">
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Kitap ara..."
                className="
                  w-56 px-4 py-2 rounded-xl
                  border border-[#919682]/40
                  bg-white/70
                  outline-none
                  focus:border-[#595E48]
                "
              />

              {results.length > 0 && (
                <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
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
                      className="flex gap-3 p-3 hover:bg-[#919682]/10 cursor-pointer"
                    >
                      <img
                        src={book.img}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium line-clamp-1">
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

          {/* BUTTONS */}
          <button
            onClick={() => navigate("/analytics")}
            className="px-4 py-2 rounded-xl bg-white/40 hover:bg-white/60"
          >
            📊 Analiz
          </button>

          <button
            onClick={() => navigate("/favorites")}
            className="px-4 py-2 rounded-xl bg-white/40 hover:bg-white/60"
          >
            ⭐ Favoriler
          </button>

          {variant !== "read" && (
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-[#919682] text-white rounded-xl hover:bg-[#595E48]"
            >
              Çıkış
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
