export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        py-3
        rounded-xl
        bg-[#919682]/70
        text-white
        font-semibold
        backdrop-blur-md
        shadow-md
        border border-[#919682]/50
        transition-all
        duration-300
        hover:bg-[#595E48]
        hover:shadow-lg
        active:scale-95
      "
    >
      {text}
    </button>
  );
}
