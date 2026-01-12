import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function BookCard({
  book,
  favorites,
  toggleFavorite,
  onSelect,
}) {
  const isFav = favorites.includes(book.title);

  return (
    <div
      onClick={onSelect}
      className="
        group relative bg-white/60 backdrop-blur-xl 
        border border-[#919682]/30 rounded-2xl p-4
        shadow-lg hover:shadow-2xl hover:scale-[1.03] 
        transition-all duration-300 cursor-pointer
      "
    >
      {/* FAVORİ KALP */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 💖 Kalbe tıklayınca detay açılmasın
          toggleFavorite(book.title);
        }}
        className="
          absolute top-3 right-3 z-20
          text-2xl text-[#595E48]
          hover:scale-125 transition
        "
      >
        {isFav ? (
          <AiFillHeart className="text-pink-500 drop-shadow" />
        ) : (
          <AiOutlineHeart />
        )}
      </button>

      {/* KİTAP FOTO */}
      <img
        src={book.img}
        alt={book.title}
        className="
          rounded-xl h-56 w-full object-cover
          group-hover:opacity-90 transition
        "
      />

      {/* KİTAP BİLGİLERİ */}
      <div className="mt-3">
        <h3 className="font-bold text-lg text-[#595E48]">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
      </div>
    </div>
  );
}
