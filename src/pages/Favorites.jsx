import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";

import yuzSeksenDort from "../assets/1984.jpg";
import simyaci from "../assets/simyaci.jpg";
import hayvanCiftligi from "../assets/hayvan-ciftligi.jpg";
import kucukPrens from "../assets/kucuk-prens.jpg";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const books = [
    {
      title: "1984",
      author: "George Orwell",
      img: yuzSeksenDort,
      category: "Klasik",
    },
    {
      title: "Simyacı",
      author: "Paulo Coelho",
      img: simyaci,
      category: "Felsefe",
    },
    {
      title: "Hayvan Çiftliği",
      author: "George Orwell",
      img: hayvanCiftligi,
      category: "Klasik",
    },
    {
      title: "Küçük Prens",
      author: "Antoine de Saint-Exupéry",
      img: kucukPrens,
      category: "Fantastik",
    },
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = (title) => {
    const updated = favorites.filter((f) => f !== title);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const favoriteBooks = books.filter((b) => favorites.includes(b.title));

  return (
    <div className="min-h-screen bg-softWhite">
      <Navbar variant="detail" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#595E48]">
              ⭐ Favori Koleksiyonum
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Kaydettiğin kitaplar ({favoriteBooks.length})
            </p>
          </div>

          <button
            onClick={() => navigate("/home")}
            className="
              w-full sm:w-auto
              px-5 py-2.5
              rounded-xl
              bg-[#919682]/20 hover:bg-[#919682]/40
              text-[#595E48]
              transition
            "
          >
            + Yeni Kitap Ekle
          </button>
        </div>

        {/* EMPTY STATE */}
        {favoriteBooks.length === 0 && (
          <div
            className="
              mt-16 sm:mt-24
              text-center
              bg-white/50 backdrop-blur-xl
              border border-[#919682]/30
              rounded-2xl sm:rounded-3xl
              p-8 sm:p-16
              shadow-lg
            "
          >
            <div className="text-4xl sm:text-5xl mb-4">⭐</div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#595E48] mb-2">
              Henüz favorin yok
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Beğendiğin kitapları ekleyerek kendi koleksiyonunu
              oluşturabilirsin.
            </p>

            <button
              onClick={() => navigate("/home")}
              className="
                px-6 py-3 rounded-2xl
                bg-[#919682] text-white
                font-medium hover:bg-[#595E48]
                transition
              "
            >
              Kitap Keşfet 📚
            </button>
          </div>
        )}

        {/* FAVORITE GRID */}
        {favoriteBooks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {favoriteBooks.map((book) => (
              <div key={book.title} className="relative group">
                <BookCard
                  book={book}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onSelect={() => navigate(`/book/${book.title}`)}
                />

                {/* QUICK ACTION */}
                <button
                  onClick={() => toggleFavorite(book.title)}
                  className="
                    absolute bottom-4 right-4
                    opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                    px-3 py-1
                    rounded-full
                    bg-black/70 text-white
                    text-xs
                    transition
                  "
                >
                  Favoriden Çıkar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
