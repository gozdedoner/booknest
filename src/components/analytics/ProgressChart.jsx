export default function ProgressChart({ data = [] }) {
  if (data.length === 0) {
    return <p className="text-gray-400 text-sm">Henüz okuma verisi yok</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((value, index) => (
        <div key={index}>
          {/* LABEL */}
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Kitap {index + 1}</span>
            <span>%{value}</span>
          </div>

          {/* BAR */}
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="
                h-full
                bg-gradient-to-r
                from-[#919682]
                to-[#595E48]
                rounded-full
                transition-all duration-700
              "
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
