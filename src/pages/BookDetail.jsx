import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Navbar from "../components/Navbar";

import { slugify } from "../utils/slugify";

import yuzSeksenDort from "../assets/1984.jpg";
import simyaci from "../assets/simyaci.jpg";
import hayvanCiftligi from "../assets/hayvan-ciftligi.jpg";
import kucukPrens from "../assets/kucuk-prens.jpg";

export default function Detail() {
  const { title } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stateBook = location.state?.book;

  const books = [
    {
      title: "1984",
      author: "George Orwell",
      img: yuzSeksenDort,
      category: "Klasik",
      desc: "Distopik bir dünyada özgürlük, baskı ve bireysellik üzerine güçlü bir roman.",
    },
    {
      title: "Simyacı",
      author: "Paulo Coelho",
      img: simyaci,
      category: "Felsefe",
      desc: "Kişisel yolculuk, kader ve ruhsal keşif üzerine ilham verici bir hikâye.",
    },
    {
      title: "Hayvan Çiftliği",
      author: "George Orwell",
      img: hayvanCiftligi,
      category: "Klasik",
      desc: "Siyasi bir alegori — güç yozlaşması ve devrim sonrası düzen eleştirisi.",
    },
    {
      title: "Küçük Prens",
      author: "Antoine de Saint-Exupéry",
      img: kucukPrens,
      category: "Fantastik",
      desc: "Sevgi, dostluk ve insan doğası üzerine zamansız ve sıcak bir klasik.",
    },
  ];

  const book = stateBook || books.find((b) => slugify(b.title) === title);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = () => {
    const updated = favorites.includes(book.title)
      ? favorites.filter((f) => f !== book.title)
      : [...favorites, book.title];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Kitap bulunamadı.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar variant="detail" />

      <div
        className="
          min-h-screen
          px-4 sm:px-6
          py-6 sm:py-10
          bg-softWhite
          bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]
          animate-fadeIn
        "
      >
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="
            mb-6 sm:mb-8
            px-4 sm:px-5 py-2
            rounded-xl
            bg-[#919682]/30
            backdrop-blur-xl
            border border-[#919682]/40
            text-[#595E48]
            hover:bg-[#919682] hover:text-white
            transition
          "
        >
          ← Geri Dön
        </button>

        {/* CARD */}
        <div
          className="
            max-w-5xl mx-auto
            bg-white/60 backdrop-blur-2xl
            border border-[#919682]/30
            rounded-2xl sm:rounded-3xl
            shadow-xl
            p-5 sm:p-8 md:p-10
            flex flex-col md:flex-row
            gap-6 sm:gap-8 md:gap-10
          "
        >
          {/* IMAGE */}
          <div className="w-full md:w-1/3">
            <img
              src={book.img}
              alt={book.title}
              className="
                w-full
                rounded-2xl sm:rounded-3xl
                shadow-lg
              "
            />
          </div>

          {/* INFO */}
          <div className="flex-1">
            <h1
              className="
                text-2xl sm:text-3xl md:text-4xl
                font-extrabold
                text-[#595E48]
              "
            >
              {book.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-700 mt-1">
              ✍️ {book.author}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              📂 {book.category}
            </p>

            {/* FAVORI */}
            <button
              onClick={toggleFavorite}
              className="
                mt-4
                text-2xl sm:text-3xl
                hover:scale-110
                transition
              "
            >
              {favorites.includes(book.title) ? (
                <AiFillHeart className="text-pink-500" />
              ) : (
                <AiOutlineHeart className="text-[#595E48]" />
              )}
            </button>

            {/* DESC */}
            <p className="mt-5 sm:mt-6 text-sm sm:text-base text-gray-700 italic leading-relaxed">
              {book.desc}
            </p>

            {/* READ */}
            <button
              onClick={() => navigate(`/read/${title}`)}
              className="
                mt-6 sm:mt-8
                w-full sm:w-auto
                px-6 sm:px-8 py-3
                rounded-xl sm:rounded-2xl
                bg-gradient-to-r from-[#919682] to-[#595E48]
                text-white font-semibold
                hover:scale-105 hover:shadow-2xl
                transition-all duration-300
              "
            >
              Okumaya Başla 📖
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
