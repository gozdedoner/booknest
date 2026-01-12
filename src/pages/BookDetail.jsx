import { useParams, useNavigate } from "react-router-dom";
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

  // 📚 KİTAPLAR (ÖNCE TANIMLANIR)
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

  // ✅ KİTAP SLUG İLE BULUNUR (TEK KEZ)
  const book = books.find((b) => slugify(b.title) === title);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = () => {
    let updated;
    if (favorites.includes(book.title)) {
      updated = favorites.filter((f) => f !== book.title);
    } else {
      updated = [...favorites, book.title];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // 🛡️ Kitap yoksa güvenli çık
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Kitap bulunamadı.</p>
      </div>
    );
  }

 return (
  <>
    {/* SLIM NAVBAR */}
    <Navbar variant="detail" />

    {/* PAGE */}
    <div
      className="
        min-h-screen px-6 py-10
        bg-softWhite
        bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]
        animate-fadeIn
      "
    >
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="
          mb-8 px-5 py-2
          rounded-xl bg-[#919682]/30
          backdrop-blur-xl border border-[#919682]/40
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
          rounded-3xl
          shadow-xl
          p-10 flex flex-col md:flex-row gap-10
        "
      >
        {/* IMAGE */}
        <div className="w-full md:w-1/3">
          <img
            src={book.img}
            alt={book.title}
            className="w-full rounded-3xl shadow-lg"
          />
        </div>

        {/* INFO */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-[#595E48]">
            {book.title}
          </h1>

          <p className="text-lg text-gray-700 mt-1">✍️ {book.author}</p>
          <p className="text-sm text-gray-600 mt-1">📂 {book.category}</p>

          {/* FAVORI */}
          <button
            onClick={toggleFavorite}
            className="mt-4 text-3xl hover:scale-110 transition"
          >
            {favorites.includes(book.title) ? (
              <AiFillHeart className="text-pink-500" />
            ) : (
              <AiOutlineHeart className="text-[#595E48]" />
            )}
          </button>

          {/* DESC */}
          <p className="mt-6 text-gray-700 italic leading-relaxed">
            {book.desc}
          </p>

          {/* OKUMAYA BAŞLA */}
          <button
            onClick={() => navigate(`/read/${title}`)}
            className="
              mt-8 px-8 py-3 rounded-2xl
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
)};