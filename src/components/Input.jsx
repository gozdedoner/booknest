export default function Input({ placeholder, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full
        mt-1
        px-4
        py-3
        rounded-xl
        bg-white/60
        border border-white/80
        text-gray-800
        shadow-sm
        focus:outline-none
        focus:border-[#919682]
        focus:bg-white
        transition-all
        duration-300
      "
    />
  );
}
