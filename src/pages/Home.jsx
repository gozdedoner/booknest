import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { slugify } from "../utils/slugify";

import yuzSeksenDort from "../assets/1984.jpg";
import simyaci from "../assets/simyaci.jpg";
import hayvanCiftligi from "../assets/hayvan-ciftligi.jpg";
import kucukPrens from "../assets/kucuk-prens.jpg";

import Navbar from "../components/Navbar";
import BookGrid from "../components/BookGrid";

export default function Home() {
  const navigate = useNavigate();

  const handleSelectBook = (book) => {
    navigate(`/book/${slugify(book.title)}`);
  };

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

  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
  const [searchTerm, setSearchTerm] = useState("");

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const toggleFavorite = (title) => {
    const updated = favorites.includes(title)
      ? favorites.filter((f) => f !== title)
      : [...favorites, title];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const booksRef = useRef(null);

  const handleExplore = () => {
    booksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "Hepsi" || book.category === selectedCategory;

    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="
        min-h-screen bg-softWhite
        bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]
        bg-repeat
      "
    >
      {/* NAVBAR */}
      <Navbar variant="home" onSearch={setSearchTerm} />

      {/* DIVIDER */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#919682]/40 to-transparent" />

      {/* HERO */}
      <div
        className="
          relative w-full
          h-60 sm:h-72 md:h-80 lg:h-96
          rounded-2xl sm:rounded-3xl
          overflow-hidden
          mx-auto max-w-7xl
          mt-6 sm:mt-8
          shadow-xl
        "
      >
        <div
          className="
            absolute inset-0
            bg-[url('https://images.unsplash.com/photo-1512820790803-83ca734da794')]
            bg-cover bg-center
            scale-105 opacity-95
            blur-[2px]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
          <h1
            className="
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl
              font-extrabold text-white drop-shadow
            "
          >
            📚 BookNest'e Hoş Geldin
          </h1>

          <p
            className="
              mt-3
              text-sm sm:text-base md:text-lg
              text-white/90
              max-w-xl
            "
          >
            Favori kitaplarını keşfet, koleksiyonunu oluştur ✨
          </p>

          <button
            onClick={handleExplore}
            className="
              mt-5 sm:mt-6
              px-5 sm:px-7
              py-2.5 sm:py-3
              rounded-xl sm:rounded-2xl
              bg-white/25 backdrop-blur-lg
              text-white font-semibold
              border border-white/40
              hover:bg-white/40 hover:scale-105
              transition-all duration-300
            "
          >
            Keşfetmeye Başla 🚀
          </button>
        </div>
      </div>

      {/* CATEGORY */}
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6
          mt-8 sm:mt-10
          flex gap-3 sm:gap-4
          flex-wrap
          justify-center sm:justify-start
        "
      >
        {["Hepsi", "Klasik", "Felsefe", "Fantastik"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 sm:px-6 py-2 rounded-full transition-all text-sm sm:text-base ${
              selectedCategory === cat
                ? "bg-[#919682] text-white scale-105"
                : "bg-white/60 border border-[#919682]/40 text-[#595E48] hover:bg-[#919682] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* BOOK GRID */}
      <div
        ref={booksRef}
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6
          py-8 sm:py-12
          mt-6
          border border-[#919682]/20
          rounded-2xl sm:rounded-3xl
          shadow-inner
          bg-white/30 backdrop-blur-md
        "
      >
        <BookGrid
          books={filteredBooks}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onSelect={handleSelectBook}
        />
      </div>
    </div>
  );
}
