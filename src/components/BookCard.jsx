import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { slugify } from "../utils/slugify";

export default function BookCard({ book, favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const isFav = favorites.includes(book.title);

  return (
    <div
      className="
        group relative
        bg-white/50 backdrop-blur-xl
        rounded-3xl p-4
        shadow-md hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-1
        cursor-pointer
      "
      onClick={() => navigate(`/book/${slugify(book.title)}`)}
    >
      {/* IMAGE */}
      <div className="overflow-hidden rounded-2xl">
        <img
          src={book.img}
          alt={book.title}
          className="w-full h-56 object-cover
                     group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* FAVORITE */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(book.title);
        }}
        className="absolute top-4 right-4 text-2xl"
      >
        {isFav ? (
          <AiFillHeart className="text-pink-500" />
        ) : (
          <AiOutlineHeart className="text-gray-400 hover:text-pink-500" />
        )}
      </button>

      {/* INFO */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg text-[#595E48]">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
      </div>

      {/* HOVER CTA */}
      <div
        className="
          absolute inset-0
          flex items-center justify-center
          bg-black/40 text-white
          opacity-0 group-hover:opacity-100
          transition
          rounded-3xl
        "
      >
        <span className="px-6 py-2 rounded-full bg-white/20 backdrop-blur">
          Detaya Git →
        </span>
      </div>
    </div>
  );
}
