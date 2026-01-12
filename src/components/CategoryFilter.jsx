const categories = ["Tümü", "Roman", "Kişisel Gelişim", "Fantastik", "Tarih", "Bilim"];

export default function CategoryFilter() {
  return (
    <div className="max-w-6xl mx-auto flex gap-3 flex-wrap px-6 py-4">
      {categories.map((cat) => (
        <button
          key={cat}
          className="
            px-4 py-2 rounded-full 
            border border-[#919682] 
            text-[#595E48]
            hover:bg-[#919682] hover:text-white
            transition
          "
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
