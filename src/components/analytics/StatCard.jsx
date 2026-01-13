export default function StatCard({ title, value, icon }) {
  return (
    <div
      className="
        relative overflow-hidden
        bg-white/60 backdrop-blur-xl
        border border-[#919682]/30
        rounded-3xl p-6
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* soft glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#919682]/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="text-4xl">{icon}</div>

        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-extrabold text-[#595E48]">{value}</p>
        </div>
      </div>
    </div>
  );
}
